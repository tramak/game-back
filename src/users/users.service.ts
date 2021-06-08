import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { RolesModel } from '../roles/roles.model';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { CompanyModel } from '../company/company.model';
import { MailService } from '../mail/mail.service';
import { AuthService } from '../auth/auth.service';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel)
    private usersRepository: typeof UsersModel,
    private roleService: RolesService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private mailService: MailService,
    private companyService: CompanyService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UsersModel> {
    const password = dto.password ? await bcrypt.hash(dto.password, 5) : '';
    const user = await this.usersRepository.create({
      ...dto,
      companyId: dto.companyId ? Number(dto.companyId) : undefined,
      password,
    });

    const token = await this.authService.generateTokenAccess(user);
    await user.update({ token });

    const role = await this.roleService.getRoleByValue(dto.role || 'USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    if (user.companyId) {
      const company = await this.companyService.findById(user.companyId);
      user.company = company;
    }

    return user;
  }

  async sendUserInvite(user: UsersModel) {
    const result = await this.mailService.sendUserGame(user);
    if (result.status === 200) {
      await user.update({
        invitationAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
  }

  async editUser(id, dto: CreateUserDto): Promise<UsersModel> {
    const user = await this.findById(id);

    let password;
    if (dto.password) {
      password = await bcrypt.hash(dto.password, 5);
    } else {
      password = user.password;
    }

    await user.update({
      ...dto,
      password,
    });

    if (dto.role) {
      const role = await this.roleService.getRoleByValue(dto.role);
      await user.$set('roles', [role.id]);
    }
    // await company.save();
    return user;
  }

  async getAll(
    limit: number,
    offset: number,
    where?: any,
  ): Promise<Array<UsersModel>> {
    const users = await this.usersRepository.findAll({
      limit,
      offset,
      include: [RolesModel, CompanyModel],
      where,
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
      include: { all: true },
    });

    return user;
  }

  async deleteById(id: number) {
    await this.usersRepository.destroy({ where: { id } });
  }

  async isUniqueEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    return !user;
  }
}
