import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Виктор', description: 'Имя' })
  readonly firstName: string;

  @ApiProperty({
    example: 'Владимирович',
    description: 'Отчество',
    required: false,
  })
  readonly middleName?: string;

  @ApiProperty({ example: 'Калаев', description: 'Фамилия', required: false })
  readonly lastName?: string;

  @ApiProperty({
    example: 'kalaev-viktor@mail.ru',
    description: 'Электронная почтм',
  })
  readonly email: string;

  @ApiProperty({ example: '1234', description: 'Пароль' })
  readonly password: string;

  @ApiProperty({ example: '2', description: 'Id компании' })
  readonly companyId?: string;
}
