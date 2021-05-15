import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'string', nullable: false })
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column({ type: 'string', nullable: false, unique: true })
  email: string;

  @Column({ type: 'string', nullable: false })
  password: string;

  @Column({ default: 0 })
  status: number;
}
