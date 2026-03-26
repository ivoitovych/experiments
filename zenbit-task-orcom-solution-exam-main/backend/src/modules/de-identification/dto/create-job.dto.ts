import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @ApiPropertyOptional({
    description: 'Compliance framework to use',
    example: 'hipaa',
  })
  @IsOptional()
  @IsString()
  framework?: string;
}
