import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyService } from './company.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyModel } from './company.model';
import { CreateCompanyDto } from './dto/create-company.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Создание компании' })
  @ApiResponse({ status: 200, type: CompanyModel })
  @Post()
  create(@Body() companyDto: CreateCompanyDto) {
    return this.companyService.createCompany(companyDto);
  }

  @ApiOperation({ summary: 'Редактирование компании' })
  @ApiResponse({ status: 200, type: CompanyModel })
  @Put(':id')
  edit(@Param() params, @Body() companyDto: CreateCompanyDto) {
    const id = Number(params.id);
    return this.companyService.editCompany(id, companyDto);
  }

  @ApiOperation({ summary: 'Получение компаний' })
  @ApiResponse({ status: 200, type: [CompanyModel] })
  @Get('all')
  getAll(@Query('count') count = 50, @Query('offset') offset = 0) {
    return this.companyService.getAll(Number(count), Number(offset));
  }

  @ApiOperation({ summary: 'Возвращаем компанию по id' })
  @ApiResponse({ status: 200, type: CompanyModel })
  @Get(':id')
  findOne(@Param() params) {
    return this.companyService.findById(Number(params.id));
  }

  @ApiOperation({ summary: 'Удаляем компанию по id' })
  @ApiResponse({ status: 200, type: CompanyModel })
  @Delete(':id')
  remove(@Param() params) {
    return this.companyService.deleteById(Number(params.id));
  }
}
