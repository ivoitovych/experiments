/**
 * SyntheticDataController
 *
 * Endpoint for generating fake PHI records:
 *
 *   POST /synthetic-data/generate → create N synthetic records with realistic fake PII
 *
 * Uses Faker.js to generate names, SSNs, dates, addresses, etc.
 * Records are saved to the SyntheticRecords table for audit.
 */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SyntheticDataService } from './synthetic-data.service';
import { GenerateSyntheticDto } from './dto/generate-synthetic.dto';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import type { JwtPayload } from '@/modules/auth/strategies/jwt.strategy';

@ApiTags('Synthetic Data')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('synthetic-data')
export class SyntheticDataController {
  constructor(private readonly service: SyntheticDataService) {}

  @ApiOperation({
    summary: 'Generate synthetic patient data',
    description:
      'Generates realistic fake values for the requested entity types and count. ' +
      'Results are saved to the database for audit purposes.',
  })
  @Post('generate')
  generate(
    @Body() dto: GenerateSyntheticDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.service.generate(dto, user.sub);
  }
}
