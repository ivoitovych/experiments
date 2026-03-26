/**
 * JobsController
 *
 * REST endpoints for the de-identification wizard job lifecycle:
 *
 *   POST  /de-identification/jobs          → create a new draft job
 *   GET   /de-identification/jobs          → list user's jobs (newest first)
 *   GET   /de-identification/jobs/:id      → get job details + wizardState
 *   PATCH /de-identification/jobs/:id      → update wizardState (auto-save)
 *   POST  /de-identification/jobs/:id/run  → run the Presidio pipeline
 *
 * Job status flow: DRAFT → CONFIGURED → QUEUED → PROCESSING → SUCCEEDED / FAILED
 */
import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import type { JwtPayload } from '@/modules/auth/strategies/jwt.strategy';

@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('de-identification/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiOperation({ summary: 'Create a new de-identification job (draft)' })
  @ApiResponse({ status: 201, description: 'Job created' })
  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateJobDto,
  ) {
    return this.jobsService.createJob(user.sub, dto);
  }

  @ApiOperation({ summary: 'List jobs for the current user' })
  @ApiResponse({ status: 200, description: 'Array of jobs sorted by updatedAt desc' })
  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.jobsService.getJobs(user.sub);
  }

  @ApiOperation({ summary: 'Get a single job by ID' })
  @ApiResponse({ status: 200, description: 'Job with wizard state' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.jobsService.getJob(id, user.sub);
  }

  @ApiOperation({ summary: 'Update job wizard state (auto-save)' })
  @ApiResponse({ status: 200, description: 'Updated job' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateJobDto,
  ) {
    return this.jobsService.updateJob(id, user.sub, dto);
  }

  @ApiOperation({ summary: 'Run the de-identification job' })
  @ApiResponse({ status: 200, description: 'Job completed (succeeded or failed)' })
  @ApiResponse({ status: 400, description: 'Job not in configured status' })
  @Post(':id/run')
  run(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.jobsService.runJob(id, user.sub);
  }
}
