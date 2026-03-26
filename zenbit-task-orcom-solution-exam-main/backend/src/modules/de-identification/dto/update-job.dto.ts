import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsObject, IsOptional, Min, Max } from 'class-validator';
import { JobStatus } from '../entities/job.entity';

const ALLOWED_STATUS_TRANSITIONS: Partial<Record<JobStatus, JobStatus[]>> = {
  [JobStatus.DRAFT]: [JobStatus.CONFIGURED],
  [JobStatus.CONFIGURED]: [JobStatus.DRAFT],
};

export const ALLOWED_MANUAL_STATUSES = [JobStatus.DRAFT, JobStatus.CONFIGURED];

export class UpdateJobDto {
  @ApiPropertyOptional({
    description: 'Current wizard step (1-4)',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  currentStep?: number;

  @ApiPropertyOptional({
    description: 'Wizard state snapshot for auto-save',
    example: { framework: 'hipaa', inputText: '...' },
  })
  @IsOptional()
  @IsObject()
  wizardState?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Status update (only draft ↔ configured allowed manually)',
    enum: ALLOWED_MANUAL_STATUSES,
  })
  @IsOptional()
  @IsIn(ALLOWED_MANUAL_STATUSES)
  status?: JobStatus.DRAFT | JobStatus.CONFIGURED;
}

export { ALLOWED_STATUS_TRANSITIONS };
