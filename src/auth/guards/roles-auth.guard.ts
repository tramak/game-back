import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException, UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let email;
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new Error();
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      if (!requiredRoles) {
        return true;
      }
      email = user.email;
    } catch (e) {
      throw new UnauthorizedException({
        errors: [
          {
            message: 'Токен просрочен',
          },
        ],
      });
    }

    try {
      const userModel = await this.usersService.findByEmail(email);
      userModel.roles.map((role) => console.log(role.value));
      return userModel.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      throw new NotAcceptableException({
        errors: [
          {
            message: 'Нет прав доступа',
          },
        ],
      });
    }

    return true;
  }
}
