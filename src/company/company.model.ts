import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CompanyCreationAttrs {
  name: string;
  description?: string;
  email?: string;
  url?: string;
}

@Table({ tableName: 'company' })
export class CompanyModel extends Model<CompanyModel, CompanyCreationAttrs> {
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

  @ApiProperty({
    example: 'https://tactise.com',
    description: 'url для компании',
  })
  @Column({ type: DataType.STRING })
  url: string;
}
