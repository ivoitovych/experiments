# Бекенд: Users, Dashboard, Synthetic Data

[← Життєвий цикл Job](./07-backend-jobs-lifecycle.md) | [Утиліти →](./09-backend-common-utilities.md)

---

## 1. Users Module

Модуль управління користувачами. Надає CRUD операції та допоміжні методи для auth.

### UsersService — ключові методи

```typescript
// backend/src/modules/users/users.service.ts

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Знайти всіх користувачів (для адміністратора)
  findAll(): Promise<User[]> {
    return this.usersRepository.find({ order: { createdAt: 'DESC' } });
  }

  // Знайти за UUID (кидає 404 якщо не знайдено)
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  // Знайти за email
  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  // Знайти або створити (для magic link — перший вхід створює акаунт)
  async findOrCreate(email: string): Promise<User> {
    const existing = await this.findByEmail(email);
    if (existing) return existing;
    return this.create({ email });
  }

  // Знайти за magic link токеном (select: false поля потрібен addSelect)
  findByMagicLinkToken(token: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.magicLinkToken')       // Поле з select: false
      .addSelect('user.magicLinkExpiresAt')
      .where('user.magicLinkToken = :token', { token })
      .getOne();
  }

  // Встановити magic link токен та термін дії
  async setMagicLinkToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    await this.usersRepository.update(userId, {
      magicLinkToken: token,
      magicLinkExpiresAt: expiresAt,
    });
  }

  // Очистити токен (одноразове використання)
  async clearMagicLinkToken(userId: string): Promise<void> {
    await this.usersRepository.update(userId, {
      magicLinkToken: null,
      magicLinkExpiresAt: null,
    });
  }

  // Активувати акаунт
  async activate(userId: string): Promise<void> {
    await this.usersRepository.update(userId, { isActive: true });
  }
}
```

### UsersController

```typescript
// backend/src/modules/users/users.controller.ts
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  @Get()      findAll() { ... }           // GET /api/users — список
  @Get('me')  getMe(@CurrentUser() u) { ... }  // GET /api/users/me — поточний
  @Get(':id') findOne(@Param('id') id) { ... }  // GET /api/users/:id — за ID
  @Patch(':id') update(@Param('id') id, @Body() dto) { ... } // PATCH
  @Delete(':id') remove(@Param('id') id) { ... }  // DELETE
}
```

### Ролі користувачів

| Роль | Опис |
|------|------|
| `admin` | Повний доступ (CRUD всіх користувачів) |
| `analyst` | Робота з де-ідентифікацією (за замовчуванням) |
| `viewer` | Перегляд результатів |

---

## 2. Dashboard Module

Агрегує метрики для сторінки Dashboard.

```typescript
// backend/src/modules/dashboard/dashboard.service.ts
@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Document) private readonly documentRepo: Repository<Document>,
    @InjectRepository(SyntheticRecord) private readonly syntheticRepo: Repository<SyntheticRecord>,
  ) {}

  async getStats(userId: string) {
    // Підрахунок реальних документів
    const realDocCount = await this.documentRepo.count({ where: { userId } });

    // Підрахунок виявлених сутностей (SUM entityCount)
    const result = await this.documentRepo
      .createQueryBuilder('d')
      .select('SUM(d.entityCount)', 'total')
      .where('d.userId = :userId', { userId })
      .getRawOne();
    const realEntities = parseInt(result?.total ?? '0', 10);

    // Fallback до mock-даних якщо немає реальних
    const totalDocuments = realDocCount || 24;       // Mock: 24
    const entitiesDetected = realEntities || 516;    // Mock: 516

    // Активність (завжди mock — random дані для графіку)
    const activityChart = this.generateMockActivityData(30);

    return {
      totalDocuments,
      entitiesDetected,
      activityChart,
      // ... інші метрики
    };
  }

  // Генерація випадкових даних активності для графіку Recharts
  private generateMockActivityData(days: number) {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 86400000).toISOString().split('T')[0],
      documents: Math.floor(Math.random() * 20),
    }));
  }
}
```

---

## 3. Synthetic Data Module

Генерує реалістичні синтетичні PHI дані за допомогою Faker.js.

```typescript
// backend/src/modules/synthetic-data/synthetic-data.service.ts
@Injectable()
export class SyntheticDataService {
  constructor(
    @InjectRepository(SyntheticRecord)
    private readonly recordRepo: Repository<SyntheticRecord>,
  ) {}

  async generate(dto: GenerateSyntheticDto, userId: string): Promise<SyntheticRecord[]> {
    const records: SyntheticRecord[] = [];

    for (let i = 0; i < dto.recordCount; i++) {
      // Round-robin по типах сутностей
      const entityType = dto.entityTypes[i % dto.entityTypes.length];
      const value = this.generateValue(entityType);

      const record = this.recordRepo.create({
        id: uuidv4(),
        userId,
        entityType,
        value,
        locale: dto.locale ?? 'en_US',
      });
      records.push(record);
    }

    return this.recordRepo.save(records);
  }

  // Маппінг типу сутності → генератор Faker.js
  private generateValue(entityType: string): string {
    switch (entityType) {
      case 'PERSON':         return faker.person.fullName();
      case 'EMAIL_ADDRESS':  return faker.internet.email();
      case 'PHONE_NUMBER':   return faker.phone.number();
      case 'US_SSN':         return faker.string.numeric('###-##-####');
      case 'DATE_TIME':      return faker.date.past().toISOString();
      case 'LOCATION':       return faker.location.streetAddress(true);
      case 'CREDIT_CARD':    return faker.finance.creditCardNumber();
      case 'IP_ADDRESS':     return faker.internet.ipv4();
      case 'URL':            return faker.internet.url();
      default:               return faker.lorem.sentence();
    }
  }
}
```

### GenerateSyntheticDto

```typescript
export class GenerateSyntheticDto {
  @IsInt()
  @Min(1)
  @Max(1000)
  recordCount: number;           // Кількість записів для генерації

  @IsArray()
  @IsString({ each: true })
  entityTypes: string[];         // Типи: ['PERSON', 'US_SSN', 'EMAIL_ADDRESS']

  @IsOptional()
  @IsString()
  locale?: string;               // Локаль: 'en_US', 'de_DE' тощо
}
```
