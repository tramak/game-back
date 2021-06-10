import { UsersModel } from '../../users/users.model';
import config from '../config';
import axios from 'axios';

export default async function userGame(user: UsersModel) {
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
      from_email: config.from_email,
      from_name: config.from_name,
      reply_to: config.from_email,
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
    const result = await axios.post(
      'https://eu1.unione.io/ru/transactional/api/v1/email/send.json',
      inputBody,
      {
        headers: config.headers,
      },
    );

    return result;
  } catch (e) {
    console.log({ e });
    return e;
  }
}
