import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UsersRolesModel } from './users-roles.model';
import { UsersModel } from '../users/users.model';

interface UserCreationAttrs {
  value: string;
  description?: string;
}

@Table({ tableName: 'roles' })
export class RolesModel extends Model<RolesModel, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли' })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Описание роли',
    required: false,
  })
  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => UsersModel, () => UsersRolesModel)
  users: UsersModel[];
}
