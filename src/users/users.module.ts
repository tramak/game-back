import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { RolesModel } from '../roles/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersRolesModel } from '../roles/users-roles.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([UsersModel, RolesModel, UsersRolesModel]),
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
