/**
 * JwtStrategy
 *
 * passport-jwt strategy that validates the Bearer token on every
 * protected request. Used by JwtAuthGuard.
 *
 * What it does:
 * 1. Extracts the JWT from the Authorization: Bearer <token> header
 * 2. Verifies signature using JWT_SECRET from ConfigService
 * 3. Calls validate() with the decoded payload
 * 4. Return value of validate() is attached to request.user
 *
 * JwtPayload mirrors what AuthService.signToken() puts INTO the token:
 *   { sub: userId, email, role, iat, exp }
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/modules/users/users.service';

export interface JwtPayload {
  sub: string;    // subject = user UUID
  email: string;
  role: string;
  iat?: number;   // issued at (added automatically by jwt.sign)
  exp?: number;   // expires at
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // Extract the JWT from the Authorization header as a Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject tokens whose exp claim has passed
      ignoreExpiration: false,
      // Secret used to verify the token signature (must match AuthService.signToken)
      secretOrKey: configService.get<string>('jwt.secret') ?? '',
    });
  }

  /**
   * Called after the token signature is verified.
   * Returning a value attaches it to request.user.
   * Throwing an exception rejects the request with 401.
   */
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // Verify the user still exists in the database
    // (prevents using tokens of deleted accounts)
    const user = await this.usersService.findOne(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User account is inactive or not found');
    }
    return payload;
  }
}
