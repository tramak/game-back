import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { EmailUnique } from '../validators/EmailUnique';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Калаев Виктор Владимирович', description: 'ФИО' })
  fio: string;

  @ApiProperty({ example: 2, description: 'Id компании' })
  companyId?: number;

  @ApiProperty({
    example: 'USER',
    description: 'Роль',
  })
  readonly role: string;

  @Validate(EmailUnique)
  @IsEmail(undefined, {
    message: 'email не верен',
  })
  @ApiProperty({
    example: 'kalaev-viktor@mail.ru',
    description: 'Электронная почта',
  })
  email: string;

  @ApiProperty({ example: 'Офисе', description: 'Группа' })
  group: string;

  @ApiProperty({ example: '1234', description: 'Пароль' })
  readonly password?: string;

  @ApiProperty({
    example: '1234',
    description: 'Токен пользователя для доступа в игру',
  })
  readonly token?: string;
}
