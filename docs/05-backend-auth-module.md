# Бекенд: Автентифікація та Magic Link

[← База даних](./04-backend-database.md) | [Де-ідентифікація →](./06-backend-de-identification.md)

---

## Огляд модуля

Автентифікація побудована на **Magic Link** — безпарольному підході. Замість пароля користувач отримує одноразове посилання на email, яке обмінюється на JWT токен.

### Діаграма потоку Magic Link

```
Користувач                   Фронтенд                    Бекенд                      БД
    │                            │                          │                          │
    │─── Вводить email ─────────►│                          │                          │
    │                            │── POST /auth/magic-link─►│                          │
    │                            │                          │── findOrCreate(email) ───►│
    │                            │                          │◄── user ─────────────────│
    │                            │                          │── setMagicLinkToken() ──►│
    │                            │                          │   (UUID + expiry)        │
    │                            │◄── { message: "..." } ──│                          │
    │                            │                          │                          │
    │◄── Отримує email з link ──│                          │                          │
    │── Клікає посилання ───────►│                          │                          │
    │                            │── POST /auth/verify ────►│                          │
    │                            │   { token: "uuid..." }   │── findByMagicToken() ──►│
    │                            │                          │◄── user + token ────────│
    │                            │                          │── Перевірка expiry       │
    │                            │                          │── clearMagicToken() ────►│
    │                            │                          │── Активація user ───────►│
    │                            │                          │── JWT sign ───────────── │
    │                            │◄── { token, user } ─────│                          │
    │◄── Авторизований! ────────│                          │                          │
```

---

## AuthModule

```typescript
// backend/src/modules/auth/auth.module.ts
@Module({
  imports: [
    UsersModule,          // Залежність: доступ до UsersService
    PassportModule,       // Passport.js для стратегій автентифікації

    // JwtModule — реєстрація через async для читання конфігу після завантаження .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),      // Секрет підпису
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn') ?? '7d', // Час життя
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  // JwtStrategy реєструється як провайдер
  exports: [AuthService],                 // Експорт для використання в інших модулях
})
export class AuthModule {}
```

---

## AuthService

```typescript
// backend/src/modules/auth/auth.service.ts
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,   // Робота з користувачами
    private readonly jwtService: JwtService,       // Підпис JWT
    private readonly configService: ConfigService, // Конфігурація
  ) {}

  // ─── Крок 1: Запит магічного посилання ──────────────────────────────
  async requestMagicLink(email: string): Promise<void> {
    // Знайти існуючого користувача або створити нового
    const user = await this.usersService.findOrCreate(email);

    // Генерація одноразового UUID токену
    const token = uuidv4();

    // Час життя токену (за замовчуванням 15 хвилин = 900 секунд)
    const expiresInSeconds = this.configService.get<number>('magicLink.expiresInSeconds') ?? 900;
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    // Збереження токену в БД (у plaintext — TODO: хешувати в продакшн)
    await this.usersService.setMagicLinkToken(user.id, token, expiresAt);

    // У розробці — посилання логується в консоль
    // У продакшн — відправляється email через SES/SendGrid
    const verifyUrl = `http://localhost:5173/auth/verify?token=${token}`;
    this.logger.warn(`[MAGIC LINK] ${email}: ${verifyUrl}`);
  }

  // ─── Крок 2: Верифікація токену → видача JWT ────────────────────────
  async verifyMagicLink(token: string): Promise<{ user: User; token: string }> {
    // Пошук користувача за токеном
    const user = await this.usersService.findByMagicLinkToken(token);

    // Токен не знайдено або вже використано
    if (!user) {
      throw new UnauthorizedException({
        code: 'TOKEN_INVALID',
        message: 'Invalid or already used token',
      });
    }

    // Перевірка терміну дії
    if (!user.magicLinkExpiresAt || user.magicLinkExpiresAt < new Date()) {
      await this.usersService.clearMagicLinkToken(user.id); // Очистити прострочений
      throw new UnauthorizedException({
        code: 'TOKEN_EXPIRED',
        message: 'Token has expired',
      });
    }

    // Одноразове використання: очищення токену
    await this.usersService.clearMagicLinkToken(user.id);

    // Активація користувача при першому вході
    if (!user.isActive) {
      await this.usersService.activate(user.id);
    }

    // Підпис JWT та повернення
    const jwt = this.signToken(user);
    const { magicLinkToken: _t, magicLinkExpiresAt: _e, ...safeUser } = user;
    return { user: safeUser as User, token: jwt };
  }

  // ─── Профіль поточного користувача ──────────────────────────────────
  getProfile(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  // ─── Підпис JWT ─────────────────────────────────────────────────────
  private signToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,        // subject — UUID користувача
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload); // Підпис з секретом з ConfigService
  }
}
```

---

## JWT Strategy (Passport)

```typescript
// backend/src/modules/auth/strategies/jwt.strategy.ts
// Інтерфейс payload, що зберігається всередині JWT токену
export interface JwtPayload {
  sub: string;    // UUID користувача
  email: string;
  role: string;
  iat?: number;   // Час створення (автоматично)
  exp?: number;   // Час закінчення (автоматично)
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // Витягування JWT з заголовку Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,              // Відхиляти прострочені токени
      secretOrKey: configService.get<string>('jwt.secret') ?? '',
    });
  }

  // Викликається ПІСЛЯ успішної верифікації підпису
  // Повернене значення прикріплюється до request.user
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // Перевірка: чи існує користувач і чи активний
    const user = await this.usersService.findOne(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User account is inactive or not found');
    }
    return payload; // Це значення буде доступне через @CurrentUser()
  }
}
```

---

## AuthController

```typescript
// backend/src/modules/auth/auth.controller.ts
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /api/auth/magic-link — запит магічного посилання
  // Завжди повертає 200 (анти-enumeration: не розкриває чи існує email)
  @Post('magic-link')
  @HttpCode(HttpStatus.OK)
  async requestMagicLink(@Body() dto: RequestMagicLinkDto): Promise<{ message: string }> {
    await this.authService.requestMagicLink(dto.email);
    return { message: 'If an account exists for this email, a magic link has been sent.' };
  }

  // POST /api/auth/verify — обмін токену на JWT
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() dto: VerifyMagicLinkDto) {
    return this.authService.verifyMagicLink(dto.token);
  }

  // GET /api/auth/me — профіль поточного користувача (потребує JWT)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: JwtPayload) {
    return this.authService.getProfile(user.sub);
  }
}
```

---

## DTOs (валідація вхідних даних)

```typescript
// backend/src/modules/auth/dto/request-magic-link.dto.ts
export class RequestMagicLinkDto {
  @ApiProperty({
    description: 'Email для відправлення магічного посилання',
    example: 'user@hospital.org',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;   // Валідується як email формат
}

// backend/src/modules/auth/dto/verify-magic-link.dto.ts
export class VerifyMagicLinkDto {
  @ApiProperty({
    description: 'Одноразовий токен з магічного посилання',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsString()
  @IsNotEmpty()
  token: string;   // UUID токен, отриманий через email
}
```

---

## Коди помилок автентифікації

| Код | HTTP | Опис |
|-----|------|------|
| `TOKEN_INVALID` | 401 | Токен не знайдено або вже використано |
| `TOKEN_EXPIRED` | 401 | Токен прострочений (за замовчуванням 15 хвилин) |
