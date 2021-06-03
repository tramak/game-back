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
              company: user.company?.name,
            },
          },
        ],
        subject: `Обязательное обучение сотрудников «${user.company?.name}» безопасному поведению в офисе.`,
        from_email: 'support@tactise.com',
        from_name: 'tactise.com',
        reply_to: 'support@tactise.com',
        body: {
          html: `
            <p>Здравствуйте, {{to_name}}! Это приглашение пройти обучающую игру «Безопасный офис».</p> 
            <p>
              Игра поможет Вам повысить безопасность в офисе для себя и окружающих.
            </p>
            <p>
              Для прохождения игры перейдите по <a href="{{url}}">ссылке…</a>
            </p>
            <p>
              Внимание! Прохождение игры обязательно для всех сотрудников, получивших приглашение.
            </p>
            <p>
              Ссылка будет действовать 3 рабочих дня. Прохождение займет 10-15 минут.
            </p>
            <p>
              Удачи и безопасного дня!
            </p>
          `,
          plaintext: `
            Здравствуйте {{to_name}}! Это приглашение пройти обучающую игру «Безопасный офис».
            Для прохождения игры перейдите по ссылке {{url}}
          `,
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
