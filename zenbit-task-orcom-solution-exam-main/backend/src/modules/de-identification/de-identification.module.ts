import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Document } from './entities/document.entity';
import { Job } from './entities/job.entity';
import { DeIdentificationService } from './de-identification.service';
import { DeIdentificationController } from './de-identification.controller';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PresidioService } from './presidio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, Job]),
    // HttpModule provides the HttpService (Axios wrapper) used by PresidioService
    // timeout and maxRedirects apply to all requests made via this module's HttpService
    HttpModule.register({
      timeout: 30_000,
      maxRedirects: 3,
    }),
  ],
  controllers: [DeIdentificationController, JobsController],
  providers: [DeIdentificationService, JobsService, PresidioService],
  exports: [PresidioService], // DashboardModule may need it
})
export class DeIdentificationModule {}
