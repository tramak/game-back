import { Module } from '@nestjs/common';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModel } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { RolesModel } from './roles/roles.model';
import { UsersRolesModel } from './roles/users-roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './company/company.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { CompanyModel } from './company/company.model';
import { FileModule } from './file/file.module';
import { FileModel } from './file/file.model';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve('static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [
        UsersModel,
        RolesModel,
        UsersRolesModel,
        CompanyModel,
        FileModel,
      ],
      synchronize: true,
      // autoLoadEntities: true,
    }),
    UsersModule,
    RolesModule,
    CompanyModule,
    AuthModule,
    FileModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
