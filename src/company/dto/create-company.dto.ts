import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Моя компания', description: 'Название компании' })
  readonly name: string;

  @ApiProperty({
    example: 'Это супер компания!!!',
    description: 'Описание компании',
  })
  readonly description?: string;

  @IsEmail()
  @ApiProperty({
    example: 'kalaev-viktor@mail.ru',
    description: 'Электронная почта',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: 'https://tactise.com',
    description: 'url для компании',
  })
  readonly url: string;

  @ApiProperty({
    example: 'Fleettedfvf456df',
    description: 'fleet для aws',
  })
  readonly fleet: string;

  @ApiProperty({
    example: 'Stack345dsf',
    description: 'stack для aws',
  })
  readonly stack: string;
}
