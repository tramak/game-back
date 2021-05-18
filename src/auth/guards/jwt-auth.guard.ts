import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// export class JwtAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}
//
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const req = context.switchToHttp().getRequest();
//
//     console.log(this.jwtService);
//     try {
//       const authHeader = req.headers.authorization;
//       const [bearer, token] = authHeader.split(' ');
//
//       if (bearer !== 'Bearer' || !token) {
//         throw new Error();
//       }
//
//       const secret = 'jwtConstants.secret';
//       console.log({ token, secret });
//       const user = this.jwtService.verify(token);
//       console.log({ user });
//       req.user = user;
//     } catch (e) {
//       throw new UnauthorizedException({
//         message: 'Пользователь не авторизован',
//       });
//     }
//
//     return true;
//   }
// }
