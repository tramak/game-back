import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import jwt_decode from 'jwt-decode';
import { GameService } from './game.service';
import { UsersService } from '../users/users.service';

@Controller('api/game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async goToGame(@Query('token') token, @Res() response: Response) {
    try {
      const { userId } = jwt_decode<{ userId: string | number }>(token);
      const user = await this.usersService.findById(Number(userId));

      if (!user) {
        throw new Error();
      }

      const res = await this.gameService.getHseGames(user, token);

      return response.send(res).end();
    } catch (e) {
      throw new NotAcceptableException('Нет доступа');
    }
  }

  @Post('result')
  async setResult(@Body() params) {
    const { token, id, result } = params;
    const userId = token ? jwt_decode<{ userId: string }>(token).userId : id;
    const res = await this.usersService.setResult(
      Number(userId),
      Number(result),
    );

    return {
      status: 'ok',
    };
  }
}
