import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  name: string;
  description?: string;
  email?: string;
}

@Table({ tableName: 'company' })
export class UsersModel extends Model<UsersModel, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Tactise', description: 'Название компании' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Ваша безопастность в наших интересах',
    description: 'Описание',
    required: false,
  })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({
    example: 'kalaev-viktor@tactise.com',
    description: 'Электронная почты',
  })
  @Column({ type: DataType.STRING })
  email: string;
}
