/**
 * AuthService — Magic Link Authentication
 *
 * Flow:
 *   1. requestMagicLink(email)
 *      - Find or create the user
 *      - Generate a UUID token
 *      - Store the token (plaintext) + expiry in the user record
 *      - "Send" the email (logged to console in this learning project)
 *      - TODO (production): hash the token before storing (crypto.createHash('sha256'))
 *
 *   2. verifyMagicLink(token)
 *      - Find user by token (SQL WHERE match)
 *      - Check expiry
 *      - Clear the token (one-time use)
 *      - Sign and return a JWT
 *
 * Security notes:
 *   - Tokens are UUIDs (random, not guessable)
 *   - Tokens expire (configurable via MAGIC_LINK_EXPIRES_IN env var)
 *   - Tokens are single-use (cleared after successful verification)
 *   - TODO (production): hash tokens before storing and use constant-time comparison
 */
import {
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '@/modules/users/users.service';
import type { User } from '@/modules/users/entities/user.entity';
import type { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async requestMagicLink(email: string): Promise<void> {
    // findOrCreate: find existing user or create a new one
    const user = await this.usersService.findOrCreate(email);

    // Generate a random one-time token
    const token = uuidv4();

    const expiresInSeconds = this.configService.get<number>('magicLink.expiresInSeconds') ?? 900;
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    // Store the token + expiry on the user record
    // In production: hash the token before storing (crypto.createHash('sha256').update(token).digest('hex'))
    await this.usersService.setMagicLinkToken(user.id, token, expiresAt);

    // In production: send email via SES, SendGrid, Postmark, etc.
    // For this learning project, we log the link to the console.
    const verifyUrl = `http://localhost:5173/auth/verify?token=${token}`;
    this.logger.warn(`[MAGIC LINK] ${email}: ${verifyUrl}`);
  }

  async verifyMagicLink(token: string): Promise<{ user: User; token: string }> {
    // Find the user whose magic link token matches
    const user = await this.usersService.findByMagicLinkToken(token);

    if (!user) {
      throw new UnauthorizedException({
        code: 'TOKEN_INVALID',
        message: 'Invalid or already used token',
      });
    }

    if (!user.magicLinkExpiresAt || user.magicLinkExpiresAt < new Date()) {
      // Clear expired token so it cannot be retried
      await this.usersService.clearMagicLinkToken(user.id);
      throw new UnauthorizedException({
        code: 'TOKEN_EXPIRED',
        message: 'Token has expired',
      });
    }

    // Clear the token (one-time use)
    await this.usersService.clearMagicLinkToken(user.id);

    // Activate the user if not already active
    if (!user.isActive) {
      await this.usersService.activate(user.id);
    }

    const jwt = this.signToken(user);
    // Strip sensitive fields before returning
    const { magicLinkToken: _t, magicLinkExpiresAt: _e, ...safeUser } = user;
    return { user: safeUser as User, token: jwt };
  }

  getProfile(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  private signToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
