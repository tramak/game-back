// cross-env MYSQL_DB=game MYSQL_USER=root MYSQL_PASSWORD=1234 MYSQL_PORT=3306 JWT_SECRET=sdgdhffdre4 ts-node ./cli/createUser.ts
import { Sequelize, QueryTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';

async function connect() {
  const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST || 'localhost',
      dialect: 'mysql',
    },
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const password = await bcrypt.hash('1234', 5);
  const [userId] = await sequelize.query(
    `INSERT users(fio, email, password) VALUES("Калаев Виктор", "kalaev-viktor@mail.ru", "${password}")`,
    { type: QueryTypes.INSERT },
  );
  await sequelize.query(
    `INSERT users_roles(userId, roleId) VALUES("${userId}", 3)`,
  );
  sequelize.close();
}

connect();
