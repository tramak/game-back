import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModel } from './file.model';

@Module({
  providers: [FileService],
  imports: [SequelizeModule.forFeature([FileModel])],
  exports: [FileService],
})
export class FileModule {}
