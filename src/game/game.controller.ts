import {
  Controller,
  Get,
  NotAcceptableException,
  Query,
  Res,
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
      const { userId } = jwt_decode<{ userId: string }>(token);

      const res = await this.gameService.getHseGames(userId);

      const body = JSON.parse(res.body);
      return response.redirect(body.Message);
    } catch (e) {
      throw new NotAcceptableException('Нет доступа');
    }
  }
}
