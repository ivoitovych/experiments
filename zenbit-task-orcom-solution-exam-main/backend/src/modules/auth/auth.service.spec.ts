import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from '@/modules/users/users.service';
import type { User } from '@/modules/users/entities/user.entity';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeUser = (overrides: Partial<User> = {}): User =>
  ({
    id: 'user-uuid-1',
    email: 'test@example.com',
    firstName: null,
    lastName: null,
    role: 'analyst',
    isActive: true,
    magicLinkToken: 'valid-token',
    magicLinkExpiresAt: new Date(Date.now() + 60_000), // 1 min in future
    createdAt: new Date(),
    updatedAt: new Date(),
    documents: [],
    ...overrides,
  } as User);

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockUsersService = {
  findOrCreate: jest.fn(),
  setMagicLinkToken: jest.fn(),
  findByMagicLinkToken: jest.fn(),
  clearMagicLinkToken: jest.fn(),
  activate: jest.fn(),
  findOne: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('signed-jwt-token'),
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'magicLink.expiresInSeconds') return 900;
    return undefined;
  }),
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  // ─── requestMagicLink ──────────────────────────────────────────────────────

  describe('requestMagicLink', () => {
    it('should find or create a user and store the token', async () => {
      const user = makeUser();
      mockUsersService.findOrCreate.mockResolvedValue(user);
      mockUsersService.setMagicLinkToken.mockResolvedValue(undefined);

      await service.requestMagicLink(user.email);

      expect(mockUsersService.findOrCreate).toHaveBeenCalledWith(user.email);
      expect(mockUsersService.setMagicLinkToken).toHaveBeenCalledWith(
        user.id,
        expect.any(String),
        expect.any(Date),
      );
    });

    it('should set expiry 900 seconds in the future by default', async () => {
      const user = makeUser();
      mockUsersService.findOrCreate.mockResolvedValue(user);
      mockUsersService.setMagicLinkToken.mockResolvedValue(undefined);

      const before = Date.now();
      await service.requestMagicLink(user.email);
      const after = Date.now();

      const [, , expiresAt] = mockUsersService.setMagicLinkToken.mock.calls[0];
      expect(expiresAt.getTime()).toBeGreaterThanOrEqual(before + 900_000);
      expect(expiresAt.getTime()).toBeLessThanOrEqual(after + 900_000);
    });

    it('should generate a UUID format token', async () => {
      const user = makeUser();
      mockUsersService.findOrCreate.mockResolvedValue(user);
      mockUsersService.setMagicLinkToken.mockResolvedValue(undefined);

      await service.requestMagicLink(user.email);

      const [, token] = mockUsersService.setMagicLinkToken.mock.calls[0];
      expect(token).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    });

    it('should generate a different token on each call', async () => {
      const user = makeUser();
      mockUsersService.findOrCreate.mockResolvedValue(user);
      mockUsersService.setMagicLinkToken.mockResolvedValue(undefined);

      await service.requestMagicLink(user.email);
      await service.requestMagicLink(user.email);

      const token1 = mockUsersService.setMagicLinkToken.mock.calls[0][1];
      const token2 = mockUsersService.setMagicLinkToken.mock.calls[1][1];
      expect(token1).not.toBe(token2);
    });
  });

  // ─── verifyMagicLink ───────────────────────────────────────────────────────

  describe('verifyMagicLink', () => {
    it('should return user and JWT on valid token', async () => {
      const user = makeUser();
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);
      mockUsersService.clearMagicLinkToken.mockResolvedValue(undefined);

      const result = await service.verifyMagicLink('valid-token');

      expect(result.token).toBe('signed-jwt-token');
      expect(result.user.email).toBe(user.email);
    });

    it('should throw UnauthorizedException for unknown token', async () => {
      mockUsersService.findByMagicLinkToken.mockResolvedValue(null);

      await expect(service.verifyMagicLink('unknown-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw with code TOKEN_INVALID for unknown token', async () => {
      mockUsersService.findByMagicLinkToken.mockResolvedValue(null);

      try {
        await service.verifyMagicLink('unknown-token');
        fail('Expected UnauthorizedException');
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        const response = (err as UnauthorizedException).getResponse();
        expect(response).toMatchObject({ code: 'TOKEN_INVALID' });
      }
    });

    it('should throw UnauthorizedException for expired token', async () => {
      const user = makeUser({
        magicLinkExpiresAt: new Date(Date.now() - 1000), // 1 second in the past
      });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);

      await expect(service.verifyMagicLink('valid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw with code TOKEN_EXPIRED for expired token', async () => {
      const user = makeUser({
        magicLinkExpiresAt: new Date(Date.now() - 1000),
      });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);

      try {
        await service.verifyMagicLink('valid-token');
        fail('Expected UnauthorizedException');
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        const response = (err as UnauthorizedException).getResponse();
        expect(response).toMatchObject({ code: 'TOKEN_EXPIRED' });
      }
    });

    it('should clear the expired token from DB before throwing', async () => {
      const user = makeUser({
        magicLinkExpiresAt: new Date(Date.now() - 1000),
      });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);
      mockUsersService.clearMagicLinkToken.mockResolvedValue(undefined);

      await expect(service.verifyMagicLink('valid-token')).rejects.toThrow();

      expect(mockUsersService.clearMagicLinkToken).toHaveBeenCalledWith(user.id);
    });

    it('should throw UnauthorizedException when expiresAt is null', async () => {
      const user = makeUser({ magicLinkExpiresAt: null });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);

      await expect(service.verifyMagicLink('valid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw with code TOKEN_EXPIRED when expiresAt is null', async () => {
      const user = makeUser({ magicLinkExpiresAt: null });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);
      mockUsersService.clearMagicLinkToken.mockResolvedValue(undefined);

      try {
        await service.verifyMagicLink('valid-token');
        fail('Expected UnauthorizedException');
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        const response = (err as UnauthorizedException).getResponse();
        expect(response).toMatchObject({ code: 'TOKEN_EXPIRED' });
      }
    });

    it('should clear the token after successful verification (one-time use)', async () => {
      const user = makeUser();
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);
      mockUsersService.clearMagicLinkToken.mockResolvedValue(undefined);

      await service.verifyMagicLink('valid-token');

      expect(mockUsersService.clearMagicLinkToken).toHaveBeenCalledWith(user.id);
    });

    it('should activate an inactive user on successful verification', async () => {
      const user = makeUser({ isActive: false });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);
      mockUsersService.clearMagicLinkToken.mockResolvedValue(undefined);
      mockUsersService.activate.mockResolvedValue(undefined);

      await service.verifyMagicLink('valid-token');

      expect(mockUsersService.activate).toHaveBeenCalledWith(user.id);
    });

    it('should NOT call activate if user is already active', async () => {
      const user = makeUser({ isActive: true });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);
      mockUsersService.clearMagicLinkToken.mockResolvedValue(undefined);

      await service.verifyMagicLink('valid-token');

      expect(mockUsersService.activate).not.toHaveBeenCalled();
    });

    it('should strip magicLinkToken and magicLinkExpiresAt from returned user', async () => {
      const user = makeUser({
        magicLinkToken: 'secret-token',
        magicLinkExpiresAt: new Date(Date.now() + 60_000),
      });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);
      mockUsersService.clearMagicLinkToken.mockResolvedValue(undefined);

      const result = await service.verifyMagicLink('valid-token');

      expect(result.user).not.toHaveProperty('magicLinkToken');
      expect(result.user).not.toHaveProperty('magicLinkExpiresAt');
    });

    it('should sign JWT with correct payload', async () => {
      const user = makeUser({ id: 'abc-123', email: 'doc@hospital.org', role: 'admin' });
      mockUsersService.findByMagicLinkToken.mockResolvedValue(user);
      mockUsersService.clearMagicLinkToken.mockResolvedValue(undefined);

      await service.verifyMagicLink('valid-token');

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: 'abc-123',
        email: 'doc@hospital.org',
        role: 'admin',
      });
    });
  });

  // ─── getProfile ───────────────────────────────────────────────────────────

  describe('getProfile', () => {
    it('should delegate to usersService.findOne', async () => {
      const user = makeUser();
      mockUsersService.findOne.mockResolvedValue(user);

      const result = await service.getProfile(user.id);

      expect(mockUsersService.findOne).toHaveBeenCalledWith(user.id);
      expect(result).toBe(user);
    });
  });
});
