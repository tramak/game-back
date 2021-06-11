import { Injectable } from '@nestjs/common';
import { handler } from './hsegames';
import { UsersModel } from '../users/users.model';

@Injectable()
export class GameService {
  getHseGames(user: UsersModel, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return handler(user, token, (p, data) => {
        resolve(data);
      });
    });
  }
}
