import { Injectable } from '@nestjs/common';
import { join } from 'path';
import axios from 'axios';
import { UsersModel } from '../users/users.model';
import fetch from 'node-fetch';

@Injectable()
export class MailService {
  constructor() {}

  async sendUserGame(user: UsersModel) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': '65tm6ip7eeztbqskom7fnbq5efhex1i34xpe8miy',
    };

    const inputBody = {
      message: {
        recipients: [
          {
            email: user.email, // 'v.kalaev@tactise.com'
            substitutions: {
              CustomerId: user.id,
              to_name: user.fio,
              url: user.getInviteUrl(),
            },
          },
        ],
        subject: 'Начни играть',
        from_email: 'support@tactise.com',
        from_name: 'tactise.com',
        reply_to: 'support@tactise.com',
        body: {
          html: `
              <b>Привет, {{to_name}}</b>
              <br />
              <a href="{{url}}">В бой</a>
          `,
          plaintext: 'Привет, {{to_name}}, В бой: {{url}}',
        },
      },
    };

    try {
      // const result = await axios.post(
      //   'https://eu1.unione.io/ru/transactional/api/v1/email/send.json',
      //   inputBody,
      //   {
      //     headers,
      //   },
      // );

      const result = await fetch(
        'https://eu1.unione.io/ru/transactional/api/v1/email/send.json',
        {
          method: 'POST',
          body: JSON.stringify(inputBody),
          headers: headers,
        },
      );

      return result;
    } catch (e) {
      console.log({ e });
      return e;
    }
  }
}
