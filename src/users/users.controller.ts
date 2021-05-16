import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersModel } from './users.model';

@ApiTags('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UsersModel })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    console.log({ userDto });
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: [UsersModel] })
  @Get()
  getAll() {
    return this.usersService.getAllUser();
  }
}
