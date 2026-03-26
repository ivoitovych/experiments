import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AnalyzerResultItemDto {
  @IsString()
  entity_type: string;

  @IsNumber()
  start: number;

  @IsNumber()
  end: number;

  @IsNumber()
  score: number;

  @IsOptional()  // Presidio includes this field in its response — allow passthrough
  analysis_explanation: unknown;
}

export class AnonymizeTextDto {
  @ApiProperty({ example: 'Patient John Carter SSN: 523-45-6789' })
  @IsString()
  @MinLength(1)
  text: string;

  @ApiProperty({
    description: 'Output from the /analyze endpoint',
    type: [AnalyzerResultItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnalyzerResultItemDto)
  analyzerResults: AnalyzerResultItemDto[];

  @ApiPropertyOptional({
    description: 'Anonymization strategy',
    enum: ['replace', 'redact', 'hash', 'encrypt', 'synthetic', 'pseudonymize', 'generalize'],
    default: 'replace',
  })
  @IsOptional()
  @IsString()
  @IsIn(['replace', 'redact', 'hash', 'encrypt', 'synthetic', 'pseudonymize', 'generalize'])
  strategy?: string;

  @ApiPropertyOptional({ default: 'en' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({
    description: 'Compliance framework used for this document',
    enum: ['hipaa', 'gdpr', 'uk_dpi', 'swiss_fadp', 'custom'],
    default: 'hipaa',
  })
  @IsOptional()
  @IsString()
  @IsIn(['hipaa', 'gdpr', 'uk_dpi', 'swiss_fadp', 'custom'])
  framework?: string;

  @ApiPropertyOptional({
    description: 'HIPAA de-identification method (only applicable when framework = hipaa)',
    enum: ['safe_harbor', 'expert_determination'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['safe_harbor', 'expert_determination'])
  hipaaMethod?: string;

  @ApiPropertyOptional({
    description: 'Risk level for GDPR / UK_DPI / Swiss FADP frameworks',
    enum: ['low', 'medium', 'high'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['low', 'medium', 'high'])
  riskLevel?: string;
}
