import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from './auth/guards/roles-auth.guard';
import { Roles } from './auth/decorators/roles-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>test
      <script>
      
</script>
`;
    return this.appService.getHello();
  }

  @Roles('USER')
  @UseGuards(RolesAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
