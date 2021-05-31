import { Controller, Get, NotAcceptableException, Query } from '@nestjs/common';
import jwt_decode from 'jwt-decode';
import { handler } from './hsegames';

const getH = (userId) => {
  return new Promise((resolve, reject) => {
    handler(userId, (p, data) => {
      console.log(data);
      resolve(data);
    });
  });
}

@Controller('api/game')
export class GameController {
  @Get()
  async goToGame(@Query('token') token) {
    try {
      const { userId } = jwt_decode<{ userId: string }>(token);

      const res = await getH(userId);
      console.log({ res });
    } catch (e) {
      throw new NotAcceptableException('Нет доступа');
    }
  }
}
