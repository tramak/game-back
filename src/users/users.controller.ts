import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersModel } from './users.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UsersModel })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: [UsersModel] })
  @Get('all')
  async getAll(@Query('count') count = 50, @Query('offset') offset = 0) {
    const users = await this.usersService.getAll(Number(count), Number(offset));

    return users.map((user) => ({
      id: user.id,
      fio: user.fio,
      company: user.company?.name,
      email: user.email,
      group: user.group,
      roles: user.roles.map((role) => role.value),
      invitationAt: user.invitationAt,
      status: user.status,
    }));
  }

  @ApiOperation({ summary: 'Возвращаем пользователя по id' })
  @ApiResponse({ status: 200, type: [UsersModel] })
  @Get(':id')
  async findOne(@Param() params) {
    const user = await this.usersService.findById(Number(params.id));
    user.password = undefined;
    return user;
  }

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: UsersModel })
  @Put(':id')
  edit(@Param() params, @Body() userDto: CreateUserDto) {
    const id = Number(params.id);
    return this.usersService.editUser(id, userDto);
  }

  @ApiOperation({ summary: 'Удаляем пользователя по id' })
  @ApiResponse({ status: 200, type: UsersModel })
  @Delete(':id')
  remove(@Param() params) {
    return this.usersService.deleteById(Number(params.id));
  }
}
