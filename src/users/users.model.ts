import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType, ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { RolesModel } from '../roles/roles.model';
import { UsersRolesModel } from '../roles/users-roles.model';
import { CompanyModel } from '../company/company.model';

interface UserCreationAttrs {
  fio: string;
  companyId?: number;
  role: string;
  email: string;
  group: string;
  password: string;
  invitationAt: string;
  token?: string;
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

  @ApiProperty({ example: 'Калаев Виктор Владимирович', description: 'ФИО' })
  @Column({ type: DataType.STRING, allowNull: false })
  fio: string;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => CompanyModel)
  companyId: number;

  @BelongsTo(() => CompanyModel, 'companyId')
  company: CompanyModel;

  @ApiProperty({
    example: 'kalaev-viktor@mail.ru',
    description: 'Электронная почты',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  group: string;

  @Column({ type: DataType.INTEGER })
  photo: number;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 1, description: 'Статус' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 0 })
  status: number;

  @Column({ type: DataType.DATE })
  invitationAt: string;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: string;

  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt: string;

  @Column({ type: DataType.STRING })
  token: string;

  @BelongsToMany(() => RolesModel, () => UsersRolesModel)
  roles: RolesModel[];
}
