import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModel } from './file.model';
import { BullModule } from '@nestjs/bull';
import { FileConsumer } from './file.consumer';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [FileService, FileConsumer],
  imports: [
    SequelizeModule.forFeature([FileModel]),
    BullModule.registerQueue({
      name: 'usersXslt',
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [FileService],
})
export class FileModule {}
