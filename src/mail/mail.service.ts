import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsersModel } from '../users/users.model';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UsersModel, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    console.log(
      join(__dirname, '..', '..', 'mail', 'templates', 'confirmation'),
    );
    await this.mailerService.sendMail({
      to: 'kalaev-viktor@mail.ru', // user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Tactise игра',
      // template: join('confirmation'), // `.hbs` extension is appended automatically
      template: join(
        __dirname,
        '..',
        '..',
        'mail',
        'templates',
        'confirmation',
      ), // `.hbs` extension is appended automatically
      context: {
        name: user.fio,
        url,
      },
    });
  }
}
