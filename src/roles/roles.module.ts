import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesModel } from './roles.model';
import { UsersModel } from '../users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersRolesModel } from './users-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([RolesModel, UsersModel, UsersRolesModel]),
  ],
  exports: [RolesService],
})
export class RolesModule {}
