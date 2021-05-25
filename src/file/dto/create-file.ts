import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    example: 'xxxx-xxxx-xxxx.xslx',
    description: 'Название файла которое хранится на сервере',
  })
  file: string;

  @ApiProperty({
    example: 'name.xslx',
    description: 'Название оригинального файла',
  })
  name: string;

  @ApiProperty({ example: 'О файле...', description: 'Описание файла' })
  description?: string;

  @ApiProperty({
    example: 'XSLX',
    description: 'Тип файла',
  })
  type: number;

  @ApiProperty({ example: 12, description: 'id пользователя' })
  userId: number;
}
