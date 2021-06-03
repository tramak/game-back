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

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([UsersModel, RolesModel, UsersRolesModel]),
    RolesModule,
    MailModule,
    forwardRef(() => FileModule),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
