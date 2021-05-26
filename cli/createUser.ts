// cross-env DATABASE_DB=game DATABASE_USER=root DATABASE_PASSWORD=1234 DATABASE_PORT=3306 JWT_SECRET=sdgdhffdre4 ts-node ./cli/createUser.ts
// cross-env DATABASE_DB=postgres DATABASE_USER=postgres DATABASE_PASSWORD=changeme DATABASE_PORT=5432 DATABASE_DIALECT=postgres JWT_SECRET=sdgdhffdre4 ts-node ./cli/createUser.ts
import { Sequelize, QueryTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Dialect } from 'sequelize/types/lib/sequelize';
import { DataType } from 'sequelize-typescript';

async function connect() {
  const sequelize = new Sequelize(
    process.env.DATABASE_DB,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST || 'localhost',
      dialect: process.env.DATABASE_DIALECT as Dialect,
    },
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const password = await bcrypt.hash('1234', 5);

  const User = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataType.INTEGER,
    },
    fio: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  const user = await User.create({
    fio: 'Калаев Виктор',
    email: 'kalaev-viktor@mail.ru',
    password,
  });

  const userId = user.getDataValue('id');
  await sequelize.query(
    `INSERT INTO users_roles ("userId", "roleId") VALUES (${userId}, 3)`,
  );
  sequelize.close();
}

connect();
