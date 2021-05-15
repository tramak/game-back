import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEntity } from './roles.entity';

@Entity('user_roles')
export class UserRolesEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2', description: 'id роли' })
  @Column({ type: 'integer', nullable: false })
  roleId: number;

  @ApiProperty({ example: '5', description: 'id пользователя' })
  @Column({ type: 'integer', nullable: false })
  userId: number;
}
