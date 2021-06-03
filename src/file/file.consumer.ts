import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as path from 'path';
import * as xlsx from 'xlsx';
import { FileService } from './file.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { validate } from 'class-validator';

@Processor('usersXslt')
export class FileConsumer {
  constructor(
    private fileService: FileService,
    private usersService: UsersService,
  ) {}

  @Process()
  async transcode(job: Job<unknown>) {
    // let progress = 0;
    // console.log({ job });
    // for (let i = 0; i < 100; i++) {
    //   // await doSomething(job.data);
    //   progress += 10;
    //   await job.progress(progress);
    // }
    // return {};

    try {
      const filePath = path.resolve(__dirname, '..', '..', 'xsl');
      const file = await this.fileService.findById(Number(job.id));
      const userOwner = await this.usersService.findById(file.userId);
      console.log({ userId: file.userId });

      const result = [];
      const xlsxData = await xlsx.readFile(path.join(filePath, file.file));
      Object.values(xlsxData.Sheets).map((data) => {
        Object.entries(data).map(([key, value]) => {
          const number = Number(key.replace(/[^0-9]+/g, ''));
          if (!result[number]) result[number] = {};
          switch (key[0]) {
            case 'A':
              result[number]['fio'] = value.v;
              return;
            case 'B':
              result[number]['email'] = value.v;
              return;
            case 'C':
              result[number]['group'] = value.v;
              return;
          }
        });
      });

      for (const item of result) {
        try {
          const userDto = new CreateUserDto();
          userDto.fio = item.fio;
          userDto.email = item.email;
          userDto.group = item.group;
          userDto.companyId = userOwner?.companyId;

          const errors = await validate(userDto);
          if (!errors.length) {
            const user = await this.usersService.createUser(userDto);
            await this.usersService.sendUserInvite(user);
          }
        } catch (e) {
          console.log({ e });
        }
      }
    } catch (e) {
      console.log({ e });
    }
  }
}
