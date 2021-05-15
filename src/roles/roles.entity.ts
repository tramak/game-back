import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from '../users/users.entity';

@Entity('roles')
export class RolesEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли' })
  @Column({ type: 'varchar', nullable: false })
  value: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Описание роли',
    required: false,
  })
  @Column()
  description: string;

  @ManyToMany(() => UsersEntity)
  @JoinTable()
  users: UsersEntity[];
}
