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

@Controller('api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async goToGame(@Query('token') token, @Res() response: Response) {
    try {
      console.log({ token });
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
    return {
      test: 'Все норм',
      ...params,
    };
  }
}
