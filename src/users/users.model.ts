import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RolesModel } from '../roles/roles.model';
import { UsersRolesModel } from '../roles/users-roles.model';

interface UserCreationAttrs {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IUser extends UserCreationAttrs {
  id: string;
}

@Table({ tableName: 'users' })
export class UsersModel extends Model<UsersModel, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Виктор', description: 'Имя' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({
    example: 'Владимирович',
    description: 'Отчество',
    required: false,
  })
  @Column({ type: DataType.STRING })
  middleName: string;

  @ApiProperty({ example: 'Калаев', description: 'Фамилия', required: false })
  @Column({ type: DataType.STRING })
  lastName: string;

  @ApiProperty({
    example: 'kalaev-viktor@mail.ru',
    description: 'Электронная почты',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.INTEGER })
  companyId: number;

  @ApiProperty({ example: 1, description: 'Статус' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 0 })
  status: number;

  @BelongsToMany(() => RolesModel, () => UsersRolesModel)
  roles: RolesModel[];
}
