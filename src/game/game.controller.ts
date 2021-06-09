import {
  Body,
  Controller,
  Get,
  NotAcceptableException, Post,
  Query,
  Res
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
      const { userId } = jwt_decode<{ userId: string }>(token);

      const res = await this.gameService.getHseGames(userId);

      return response.send(res).end();
      // console.log({ userId, res });
      // const body = JSON.parse(res.body);
      // return response.redirect(body.Message);
    } catch (e) {
      throw new NotAcceptableException('Нет доступа');
    }
  }

  @Post('result')
  async setResult(@Body() params) {
    const res = await this.usersService.setResult(
      Number(params.id),
      Number(params.result),
    );

    return {
      status: 'ok',
    };
  }
}
