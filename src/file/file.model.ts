import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface FileCreationAttrs {
  file: string;
  name: string;
  description?: string;
  type: number;
  userId: number;
}

@Table({ tableName: 'files' })
export class FileModel extends Model<FileModel, FileCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'xxxx-xxxx-xxxx.xslx',
    description: 'Название файла которое хранится на сервере',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  file: string;

  @ApiProperty({
    example: 'name.xslx',
    description: 'Название оригинального файла',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'О файле...', description: 'Описание файла' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({
    example: 'XSLX',
    description: 'Тип файла',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  type: number;

  @ApiProperty({ example: 12, description: 'id пользователя' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
}
