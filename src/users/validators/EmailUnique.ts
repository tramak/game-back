import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@ValidatorConstraint({ name: 'emailUnique', async: false })
@Injectable()
export class EmailUnique implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(email: string, args: ValidationArguments) {
    const id = Number((args.object as CreateUserDto).id);
    return await this.usersService.isUniqueEmail(email, id);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email должен быть уникальным!';
  }
}
