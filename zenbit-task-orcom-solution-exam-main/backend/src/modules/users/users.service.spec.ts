import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeUser = (overrides: Partial<User> = {}): User =>
  ({
    id: 'user-uuid-1',
    email: 'test@example.com',
    firstName: null,
    lastName: null,
    role: 'analyst',
    isActive: true,
    magicLinkToken: null,
    magicLinkExpiresAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    documents: [],
    ...overrides,
  } as User);

// ─── Repository mock ──────────────────────────────────────────────────────────

const mockQueryBuilder = {
  addSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getOne: jest.fn(),
};

const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  // ─── create ──────────────────────────────────────────────────────────────

  describe('create', () => {
    it('should create and save a user with isActive true', async () => {
      const dto = { email: 'new@example.com' };
      const saved = makeUser({ email: dto.email });
      mockRepo.create.mockReturnValue(saved);
      mockRepo.save.mockResolvedValue(saved);

      const result = await service.create(dto);

      expect(mockRepo.create).toHaveBeenCalledWith({ email: dto.email, isActive: true });
      expect(mockRepo.save).toHaveBeenCalledWith(saved);
      expect(result).toBe(saved);
    });
  });

  // ─── findAll ─────────────────────────────────────────────────────────────

  describe('findAll', () => {
    it('should return all users ordered by createdAt DESC', async () => {
      const users = [makeUser(), makeUser({ id: 'user-uuid-2', email: 'b@example.com' })];
      mockRepo.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(mockRepo.find).toHaveBeenCalledWith({ order: { createdAt: 'DESC' } });
      expect(result).toHaveLength(2);
    });
  });

  // ─── findOne ─────────────────────────────────────────────────────────────

  describe('findOne', () => {
    it('should return user when found', async () => {
      const user = makeUser();
      mockRepo.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(user.id);

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: user.id });
      expect(result).toBe(user);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('nonexistent-id')).rejects.toThrow(NotFoundException);
    });
  });

  // ─── findByEmail ─────────────────────────────────────────────────────────

  describe('findByEmail', () => {
    it('should return user when email exists', async () => {
      const user = makeUser();
      mockRepo.findOneBy.mockResolvedValue(user);

      const result = await service.findByEmail(user.email);

      expect(result).toBe(user);
    });

    it('should return null when email not found', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      const result = await service.findByEmail('nobody@example.com');

      expect(result).toBeNull();
    });
  });

  // ─── findByMagicLinkToken ────────────────────────────────────────────────

  describe('findByMagicLinkToken', () => {
    it('should query via QueryBuilder with token', async () => {
      const user = makeUser({ magicLinkToken: 'my-token' });
      mockQueryBuilder.getOne.mockResolvedValue(user);

      const result = await service.findByMagicLinkToken('my-token');

      expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith('user.magicLinkToken');
      expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith('user.magicLinkExpiresAt');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'user.magicLinkToken = :token',
        { token: 'my-token' },
      );
      expect(result).toBe(user);
    });

    it('should return null when no matching token', async () => {
      mockQueryBuilder.getOne.mockResolvedValue(null);

      const result = await service.findByMagicLinkToken('wrong-token');

      expect(result).toBeNull();
    });
  });

  // ─── setMagicLinkToken ───────────────────────────────────────────────────

  describe('setMagicLinkToken', () => {
    it('should update the token and expiry', async () => {
      const expiresAt = new Date(Date.now() + 900_000);
      mockRepo.update.mockResolvedValue({ affected: 1 });

      await service.setMagicLinkToken('user-uuid-1', 'new-token', expiresAt);

      expect(mockRepo.update).toHaveBeenCalledWith('user-uuid-1', {
        magicLinkToken: 'new-token',
        magicLinkExpiresAt: expiresAt,
      });
    });
  });

  // ─── clearMagicLinkToken ─────────────────────────────────────────────────

  describe('clearMagicLinkToken', () => {
    it('should nullify token and expiry', async () => {
      mockRepo.update.mockResolvedValue({ affected: 1 });

      await service.clearMagicLinkToken('user-uuid-1');

      expect(mockRepo.update).toHaveBeenCalledWith('user-uuid-1', {
        magicLinkToken: null,
        magicLinkExpiresAt: null,
      });
    });
  });

  // ─── activate ────────────────────────────────────────────────────────────

  describe('activate', () => {
    it('should set isActive to true', async () => {
      mockRepo.update.mockResolvedValue({ affected: 1 });

      await service.activate('user-uuid-1');

      expect(mockRepo.update).toHaveBeenCalledWith('user-uuid-1', { isActive: true });
    });
  });

  // ─── findOrCreate ─────────────────────────────────────────────────────────

  describe('findOrCreate', () => {
    it('should return existing user when email is found', async () => {
      const existing = makeUser();
      mockRepo.findOneBy.mockResolvedValue(existing);

      const result = await service.findOrCreate(existing.email);

      expect(mockRepo.create).not.toHaveBeenCalled();
      expect(result).toBe(existing);
    });

    it('should create and return new user when email is not found', async () => {
      const newUser = makeUser({ email: 'new@example.com' });
      mockRepo.findOneBy.mockResolvedValue(null);
      mockRepo.create.mockReturnValue(newUser);
      mockRepo.save.mockResolvedValue(newUser);

      const result = await service.findOrCreate('new@example.com');

      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'new@example.com', isActive: true }),
      );
      expect(result).toBe(newUser);
    });
  });
});
