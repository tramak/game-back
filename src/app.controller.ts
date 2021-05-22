import {
  Controller,
  Get,
  NotAcceptableException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from './auth/guards/roles-auth.guard';
import { Roles } from './auth/decorators/roles-auth.decorator';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Roles('USER')
  @UseGuards(RolesAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req): Promise<any> {
    const user = await this.usersService.findByEmail(req.user.email);

    if (!user) {
      throw new NotAcceptableException({
        errors: [
          {
            message: 'Нет прав доступа',
          },
        ],
      });
    }

    const roles = user.roles.map((role) => role.value);
    return {
      fio: user.fio,
      companyId: user.companyId,
      email: user.email,
      status: user.status,
      photo: user.photo,
      roles,
    };
  }
}
