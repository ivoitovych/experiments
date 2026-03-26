/**
 * DashboardController
 *
 * Single endpoint: GET /dashboard
 * Returns aggregated metrics, activity chart data, entity distribution,
 * and recent documents for the authenticated user.
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import type { JwtPayload } from '@/modules/auth/strategies/jwt.strategy';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @ApiOperation({
    summary: 'Get dashboard data',
    description:
      'Returns metrics, activity chart data, entity distribution, and recent documents for the current user.',
  })
  @Get()
  getDashboard(@CurrentUser() user: JwtPayload) {
    return this.service.getDashboardData(user.sub);
  }
}
