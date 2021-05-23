import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { RolesModel } from '../roles/roles.model';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { CompanyModel } from '../company/company.model';
import { CreateCompanyDto } from '../company/dto/create-company.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel)
    private usersRepository: typeof UsersModel,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UsersModel> {
    const password = await bcrypt.hash(dto.password, 5);
    const user = await this.usersRepository.create({
      ...dto,
      invitationAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      password,
    });
    const role = await this.roleService.getRoleByValue(dto.role || 'USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async editUser(id, dto: CreateUserDto): Promise<UsersModel> {
    const user = await this.findById(id);
    await user.update(dto);
    if (dto.role) {
      const role = await this.roleService.getRoleByValue(dto.role);
      await user.$set('roles', [role.id]);
    }
    // await company.save();
    return user;
  }

  async getAll(limit: number, offset: number): Promise<Array<UsersModel>> {
    const users = await this.usersRepository.findAll({
      limit,
      offset,
      include: [RolesModel, CompanyModel],
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

  async findById(id: number): Promise<UsersModel> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    return user;
  }

  async deleteById(id: number) {
    await this.usersRepository.destroy({ where: { id } });
  }
}
