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
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersModel } from './users.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileService } from '../file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../roles/interfaces';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private fileService: FileService,
  ) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UsersModel })
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.usersService.createUser(userDto);

    if ((user?.roles || []).find((role) => role.value === 'USER')) {
      await this.usersService.sendUserInvite(user);
    }

    return this.usersService.normalizeUser(user);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200 })
  @Get('all')
  async getAll(
    @Query('count') count = 50,
    @Query('offset') offset = 0,
    @Request() req,
  ) {
    const userAuth = await this.usersService.findByEmail(req.user.email);
    let where = undefined;
    if (!userAuth.roles.map((role) => role.value).includes(Roles.ADMIN)) {
      where = { companyId: userAuth.companyId };
    }

    const users = await this.usersService.getAll(
      Number(count),
      Number(offset),
      where,
    );

    return users.map((user) => this.usersService.normalizeUser(user));
  }

  @ApiOperation({ summary: 'Возвращаем пользователя по id' })
  @ApiResponse({ status: 200 })
  @Get(':id')
  async findOne(@Param() params) {
    const user = await this.usersService.findById(Number(params.id));
    user.password = undefined;

    return this.usersService.normalizeUser(user);
  }

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: UsersModel })
  // @UsePipes(new ValidationPipe({ skip }))
  @Put(':id')
  async edit(@Param() params, @Body() userDto: CreateUserDto) {
    const id = Number(params.id);
    const user = await this.usersService.editUser(id, userDto);

    return this.usersService.normalizeUser(user);
  }

  @ApiOperation({ summary: 'Удаляем пользователя по id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param() params) {
    return this.usersService.deleteById(Number(params.id));
  }

  @ApiOperation({ summary: 'Импортируем xsl с пользователями' })
  @ApiResponse({ status: 200 })
  @Post('import/xsl')
  @UseInterceptors(FileInterceptor('file'))
  async importXsl(@UploadedFile() file, @Request() req) {
    const userAuth = await this.usersService.findByEmail(req.user.email);
    const fileModel = await this.fileService.createFile(file, userAuth);
    return {
      id: fileModel,
    };
  }
}
