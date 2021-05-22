import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersModel } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    try {
      const passwordEquals = await bcrypt.compare(password, user?.password);
      if (user && passwordEquals) {
        return user;
      }

      throw new Error();
    } catch (e) {
      throw new UnauthorizedException({
        errors: [
          {
            message: 'Некоректный email или пароль',
          },
        ],
      });
    }
  }

  async generateToken(user: UsersModel) {
    const payload = { email: user.email, sub: user.id };

    return {
      jwtToken: this.jwtService.sign(payload),
    };
  }

  async login(user: UsersModel) {
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const userExist = await this.usersService.findByEmail(userDto.email);
    if (userExist) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.createUser(userDto);

    return this.generateToken(user);
  }
}
