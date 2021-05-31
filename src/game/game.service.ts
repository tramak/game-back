import { Injectable } from '@nestjs/common';
import { handler } from './hsegames';

@Injectable()
export class GameService {
  getHseGames(userId: number| string): Promise<any> {
    return new Promise((resolve, reject) => {
      handler(userId, (p, data) => {
        resolve(data);
      });
    });
  }
}
