import { Injectable } from '@nestjs/common';
import { UsersModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { RolesModel } from '../roles/roles.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel)
    private usersRepository: typeof UsersModel,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UsersModel> {
    console.log({ dto });
    const password = await bcrypt.hash(dto.password, 5);
    const user = await this.usersRepository.create({
      ...dto,
      password,
    });
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAll(limit: number, offset: number): Promise<Array<UsersModel>> {
    const users = await this.usersRepository.findAll({
      limit,
      offset,
      include: [RolesModel],
    });

    return users;
  }

  async findByEmail(email: string): Promise<UsersModel> {
    const user = await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
