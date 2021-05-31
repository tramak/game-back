import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Калаев Виктор Владимирович', description: 'ФИО' })
  readonly fio: string;

  @ApiProperty({ example: 2, description: 'Id компании' })
  readonly companyId?: number;

  @ApiProperty({
    example: 'USER',
    description: 'Роль',
  })
  readonly role: string;

  @ApiProperty({
    example: 'kalaev-viktor@mail.ru',
    description: 'Электронная почта',
  })
  readonly email: string;

  @ApiProperty({ example: 'Офисе', description: 'Группа' })
  readonly group: string;

  @ApiProperty({ example: '1234', description: 'Пароль' })
  readonly password: string;

  @ApiProperty({ example: '1234', description: 'Токен пользователя для доступа в игру' })
  readonly token?: string;
}
