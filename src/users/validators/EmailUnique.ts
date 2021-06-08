import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'emailUnique', async: false })
@Injectable()
export class EmailUnique implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(email: string, args: ValidationArguments) {
    return await this.usersService.isUniqueEmail(email);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email должен быть уникальным!';
  }
}
