import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable, OneToMany
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEntity } from '../roles/roles.entity';
import { UserRolesEntity } from '../roles/user-roles.entity';

@Entity('user')
export class UsersEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Виктор', description: 'Имя' })
  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @ApiProperty({
    example: 'Владимирович',
    description: 'Отчество',
    required: false,
  })
  @Column()
  middleName: string;

  @ApiProperty({ example: 'Калаев', description: 'Фамилия', required: false })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'kalaev-viktor@mail.ru',
    description: 'Электронная почтм',
  })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({ example: 1, description: 'Статус' })
  @Column({ default: 0 })
  status: number;

  @OneToMany(() => UserRolesEntity, (userRoles) => userRoles.roleId)
  @JoinTable()
  roles: Promise<RolesEntity[]>;
}
