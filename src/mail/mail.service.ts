import { Injectable } from '@nestjs/common';
import { UsersModel } from '../users/users.model';
import userGame from './templates/user-game';
import adminRegistration from './templates/admin-registration';

@Injectable()
export class MailService {
  constructor() {}

  sendUserGame(user: UsersModel) {
    return userGame(user);
  }

  sendAdminRegistration(user: UsersModel, password: string) {
    return adminRegistration(user, password);
  }
}
