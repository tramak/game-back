import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModel } from './file.model';
import { BullModule } from '@nestjs/bull';
import { FileConsumer } from './file.consumer';

@Module({
  providers: [FileService, FileConsumer],
  imports: [
    SequelizeModule.forFeature([FileModel]),
    BullModule.registerQueue({
      name: 'usersXslt',
    }),
  ],
  exports: [FileService],
})
export class FileModule {}
