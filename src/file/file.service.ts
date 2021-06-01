import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { FileModel } from './file.model';
import { CreateFileDto } from './dto/create-file';
import { Express } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileModel) private fileRepository: typeof FileModel,
    @InjectQueue('usersXslt') private usersXsltQueue: Queue,
  ) {}

  async createFile(file: Express.Multer.File): Promise<FileModel> {
    try {
      const filePath = path.resolve(__dirname, '..', '..', 'xsl');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const fileName = uuid.v4() + path.extname(file.originalname);
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      const dto: CreateFileDto = {
        file: fileName,
        name: file.originalname,
        type: 1, // 'XSLT' доработаем позже
        userId: 1,
      };
      const fileModel = await this.fileRepository.create(dto);

      await this.addUsersXsltQueue({
        id: fileModel.id,
      });

      return fileModel;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addUsersXsltQueue(data: { id: number }) {
    console.log('addUsersXsltQueue', { data });
    const job = await this.usersXsltQueue.add(data);
    // console.log({ job });
  }

  async findById(id: number): Promise<FileModel> {
    const file = await this.fileRepository.findOne({
      where: { id },
    });

    return file;
  }
}
