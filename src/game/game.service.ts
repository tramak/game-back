import { Injectable } from '@nestjs/common';
import { handler } from './hsegames';

@Injectable()
export class GameService {
  getHseGames(userId: number | string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      handler(userId, token, (p, data) => {
        resolve(data);
      });
    });
  }
}
