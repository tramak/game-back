import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModel } from './company.model';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([CompanyModel]),
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
