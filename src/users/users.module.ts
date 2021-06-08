import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { RolesModel } from '../roles/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersRolesModel } from '../roles/users-roles.model';
import { RolesModule } from '../roles/roles.module';
import { FileModule } from '../file/file.module';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';
import { CompanyModel } from '../company/company.model';
import { CompanyModule } from '../company/company.module';
import { EmailUnique } from './validators/EmailUnique';

@Module({
  controllers: [UsersController],
  providers: [UsersService, EmailUnique],
  imports: [
    SequelizeModule.forFeature([
      UsersModel,
      RolesModel,
      UsersRolesModel,
      CompanyModel,
    ]),
    RolesModule,
    MailModule,
    CompanyModule,
    forwardRef(() => FileModule),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
