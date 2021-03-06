module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  logging: false,
  // /entities: ['src/entity/**/*.ts'],
  migrations: ['migration/**/*.ts'],
  // subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    // entitiesDir: 'src/entity',
    migrationsDir: 'migration',
    // subscribersDir: 'src/subscriber',
  },
};
