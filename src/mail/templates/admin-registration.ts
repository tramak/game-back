import { UsersModel } from '../../users/users.model';
import config from '../config';
import axios from 'axios';

export default async function adminRegistration(
  user: UsersModel,
  password: string,
) {
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
            email: user.email,
            password,
          },
        },
      ],
      subject: `Администратор компании «${user.company?.name}» безопасному поведению в офисе.`,
      from_email: config.from_email,
      from_name: config.from_name,
      reply_to: config.from_email,
      body: {
        html: `
            <p>Здравствуйте, {{to_name}}! Это приглашение для администратора в обучающую игру «Безопасный офис».</p> 
            <p>
              Игра поможет Вам повысить безопасность в офисе для себя и окружающих.
            </p>
            <p>
              Панель администратора <a href="http://games.tactise.com/">http://games.tactise.com/</a>
            </p>
            <p>
              Почта: {{email}}
            </p>
            <p>
              Пароль: {{password}}
            </p>
            <p>
              Для прохождения игры перейдите по <a href="{{url}}">ссылке…</a>
            </p>
          `,
        plaintext: `
            Здравствуйте {{to_name}}! Это приглашение для администратора в обучающую игру «Безопасный офис».
            Почта: {{email}}, Пароль: {{password}}
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
