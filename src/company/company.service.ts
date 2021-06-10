import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyModel } from './company.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from '../users/users.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyModel)
    private companyRepository: typeof CompanyModel,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async createCompany(dto: CreateCompanyDto): Promise<CompanyModel> {
    const company = await this.companyRepository.create(dto);

    return company;
  }

  async editCompany(id, dto: CreateCompanyDto): Promise<CompanyModel> {
    const company = await this.findById(id);
    await company.update(dto);
    // await company.save();
    return company;
  }

  async getAll(limit: number, offset: number): Promise<Array<CompanyModel>> {
    const companies = await this.companyRepository.findAll({
      limit,
      offset,
    });

    return companies;
  }

  async getAddCountUsers(companies: Array<CompanyModel>) {
    const res = [];
    for (const company of companies) {
      const countUsers = await this.usersService.getCountUsersInCompany(
        company.id,
      );

      res.push({
        id: company.id,
        name: company.name,
        email: company.email,
        url: company.url,
        description: company.description,
        countUsers
      });
    }

    return res;
  }

  async findById(id: number): Promise<CompanyModel> {
    const company = await this.companyRepository.findByPk(id);
    return company;
  }

  async deleteById(id: number) {
    await this.companyRepository.destroy({ where: { id } });
  }
}
