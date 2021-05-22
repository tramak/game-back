import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModel } from './company.model';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [SequelizeModule.forFeature([CompanyModel])],
  exports: [CompanyService],
})
export class CompanyModule {}
