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
import { CompanyModel } from './company/company.model';
import { FileModule } from './file/file.module';
import { FileModel } from './file/file.model';
import { MailModule } from './mail/mail.module';
import { Dialect } from 'sequelize/types/lib/sequelize';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve('static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: (process.env.DATABASE_DIALECT as Dialect) || 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || '1111',
      database: process.env.DATABASE_DB || 'postgres',
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
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
