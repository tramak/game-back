import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('usersXslt')
export class FileConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0;
    console.log({ job });
    for (let i = 0; i < 100; i++) {
      // await doSomething(job.data);
      progress += 10;
      await job.progress(progress);
    }
    return {};
  }
}
