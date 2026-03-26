/**
 * JwtAuthGuard
 *
 * Extends PassportAuthGuard to use the 'jwt' strategy.
 * Apply to controllers or routes via @UseGuards(JwtAuthGuard).
 *
 * When applied, NestJS will:
 * 1. Extract the Bearer token from the Authorization header
 * 2. Verify the token signature using JWT_SECRET
 * 3. Attach the decoded payload to req.user
 * 4. Reject with 401 if the token is missing or invalid
 *
 * Usage:
 *   @Get('profile')
 *   @UseGuards(JwtAuthGuard)
 *   getProfile(@CurrentUser() user: JwtPayload) { ... }
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
