/**
 * AuthController
 *
 * REST endpoints for the magic-link authentication flow:
 *
 *   POST /auth/magic-link   → request a one-time sign-in link (email)
 *   POST /auth/verify        → exchange magic-link token for a JWT
 *   GET  /auth/me            → return the authenticated user's profile
 *
 * Anti-enumeration: magic-link always returns 200 regardless of email existence.
 * Verify returns structured error codes (TOKEN_EXPIRED / TOKEN_INVALID) on failure.
 */
import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RequestMagicLinkDto } from './dto/request-magic-link.dto';
import { VerifyMagicLinkDto } from './dto/verify-magic-link.dto';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import type { JwtPayload } from './strategies/jwt.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Request a magic link',
    description:
      'Sends a one-time sign-in link to the provided email address. ' +
      'In development, the link is logged to the console.',
  })
  @ApiResponse({ status: 200, description: 'Magic link sent (or user does not exist — same response to prevent enumeration)' })
  @Post('magic-link')
  @HttpCode(HttpStatus.OK)
  async requestMagicLink(@Body() dto: RequestMagicLinkDto): Promise<{ message: string }> {
    await this.authService.requestMagicLink(dto.email);
    // Always return the same message regardless of whether the email exists
    // This prevents user enumeration attacks
    return { message: 'If an account exists for this email, a magic link has been sent.' };
  }

  @ApiOperation({
    summary: 'Verify a magic link token',
    description: 'Validates the one-time token and returns a JWT + user object.',
  })
  @ApiResponse({ status: 200, description: 'JWT and user returned' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() dto: VerifyMagicLinkDto) {
    return this.authService.verifyMagicLink(dto.token);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: JwtPayload) {
    return this.authService.getProfile(user.sub);
  }
}
