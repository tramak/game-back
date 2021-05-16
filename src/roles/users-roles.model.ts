import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RolesModel } from './roles.model';
import { UsersModel } from '../users/users.model';

@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export class UsersRolesModel extends Model<UsersRolesModel> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '2', description: 'id роли' })
  @ForeignKey(() => RolesModel)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ApiProperty({ example: '5', description: 'id пользователя' })
  @ForeignKey(() => UsersModel)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
