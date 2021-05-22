import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Моя компания', description: 'Название компании' })
  readonly name: string;

  @ApiProperty({
    example: 'Это супер компания!!!',
    description: 'Описание компании',
  })
  readonly description?: string;

  @ApiProperty({
    example: 'kalaev-viktor@mail.ru',
    description: 'Электронная почта',
  })
  readonly email: string;

  @ApiProperty({
    example: 'https://tactise.com',
    description: 'url для компании',
  })
  readonly url: string;
}
