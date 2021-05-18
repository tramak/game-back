import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
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
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

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
      const userModel = await this.usersService.findByEmail(user.email);
      userModel.roles.map((role) => console.log(role.value));
      return userModel.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      throw new NotAcceptableException({
        message: 'Нет прав доступа',
      });
    }

    return true;
  }
}
