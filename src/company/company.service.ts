import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyModel } from './company.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from '../users/users.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyModel)
    private companyRepository: typeof CompanyModel,
    // private usersRepository: typeof UsersModel,
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

  async findById(id: number): Promise<CompanyModel> {
    const company = await this.companyRepository.findByPk(id);
    return company;
  }

  async deleteById(id: number) {
    await this.companyRepository.destroy({ where: { id } });
  }
}
