# Бекенд: Запуск та конфігурація

[← Інфраструктура](./02-infrastructure-docker.md) | [База даних та ORM →](./04-backend-database.md)

---

## Точка входу — main.ts

Файл `main.ts` — це bootstrap NestJS додатку. Він створює застосунок, налаштовує CORS, валідацію, Swagger та починає прослуховування порту.

```typescript
// backend/src/main.ts — Bootstrap NestJS додатку
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Крок 1: Створення NestJS додатку з кореневим модулем
  const app = await NestFactory.create(AppModule);

  // Крок 2: Отримання конфігурації через ConfigService (а не process.env!)
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') ?? 3000;
  const corsOrigin = configService.get<string>('app.corsOrigin') ?? 'http://localhost:5173';
  const nodeEnv = configService.get<string>('app.nodeEnv') ?? 'development';

  // Крок 3: Налаштування CORS — дозволяє фронтенду (Vite на :5173)
  // звертатися до бекенду (NestJS на :3000)
  app.enableCors({
    origin: corsOrigin,          // Дозволене джерело
    credentials: true,           // Дозволяє передачу cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Крок 4: Глобальний префікс — усі маршрути починаються з /api
  // GET /api/dashboard, POST /api/auth/magic-link тощо
  app.setGlobalPrefix('api');

  // Крок 5: Глобальний ValidationPipe — автоматична валідація всіх вхідних DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // Видаляє поля, яких немає в DTO
      forbidNonWhitelisted: true,   // Повертає 400 якщо є зайві поля
      transform: true,              // Перетворює plain object → class instance
      transformOptions: {
        enableImplicitConversion: true, // Автоконвертація @Query('page') → number
      },
    }),
  );

  // Крок 6: Swagger UI — інтерактивна документація API
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Clinical Data Studio API')
    .setDescription('REST API для де-ідентифікації клінічних текстів')
    .setVersion('1.0')
    .addBearerAuth()              // Кнопка Authorize у Swagger UI
    .addTag('Auth', 'Magic link автентифікація')
    .addTag('Users', 'Управління користувачами')
    .addTag('De-Identification', 'Виявлення та анонімізація PII через Presidio')
    .addTag('Synthetic Data', 'Генерація синтетичних даних')
    .addTag('Dashboard', 'Метрики та активність')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,  // JWT зберігається при оновленні сторінки
      docExpansion: 'list',        // Усі ендпоінти розгорнуті списком
    },
  });

  // Крок 7: Запуск HTTP сервера
  await app.listen(port);
  logger.log(`Clinical Data Studio API: порт ${port}, режим ${nodeEnv}`);
}

void bootstrap();
```

---

## Кореневий модуль — AppModule

`AppModule` є точкою збирання всього застосунку. Він імпортує інфраструктурні модулі (Config, TypeORM) та всі feature-модулі.

```typescript
// backend/src/app.module.ts — Кореневий модуль NestJS
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import configuration from './config/configuration';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// Feature-модулі (бізнес-логіка)
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DeIdentificationModule } from './modules/de-identification/de-identification.module';
import { SyntheticDataModule } from './modules/synthetic-data/synthetic-data.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

// Сутності TypeORM — потрібні для конфігурації БД
import { User } from './modules/users/entities/user.entity';
import { Document } from './modules/de-identification/entities/document.entity';
import { Job } from './modules/de-identification/entities/job.entity';
import { SyntheticRecord } from './modules/synthetic-data/entities/synthetic-record.entity';

@Module({
  imports: [
    // 1. ConfigModule — завантажує .env та надає ConfigService глобально
    ConfigModule.forRoot({
      isGlobal: true,            // Доступний у будь-якому модулі без імпорту
      load: [configuration],     // Наша фабрика конфігурації (вкладений об'єкт)
      envFilePath: '.env',
    }),

    // 2. TypeOrmModule — підключення до MySQL через ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.name'),
        entities: [User, Document, Job, SyntheticRecord], // Усі сутності
        synchronize: configService.get<boolean>('db.synchronize') ?? false,
        logging: configService.get<boolean>('db.logging') ?? false,
        retryAttempts: 10,       // Повторні спроби підключення
        retryDelay: 3000,        // Інтервал між спробами (3 сек)
      }),
    }),

    // 3. Feature-модулі
    AuthModule,              // Автентифікація (Magic Link + JWT)
    UsersModule,             // CRUD користувачів
    DeIdentificationModule,  // Presidio інтеграція + документи
    SyntheticDataModule,     // Генерація синтетичних даних
    DashboardModule,         // Метрики та статистика
  ],
  providers: [
    // Глобальний фільтр помилок — перехоплює всі HttpException
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

### Порядок ініціалізації модулів

```
AppModule
├── ConfigModule.forRoot()         ← 1. Завантаження .env
├── TypeOrmModule.forRootAsync()   ← 2. Підключення до MySQL
├── AuthModule                     ← 3. Feature-модулі
│   └── UsersModule (залежність)
├── UsersModule
├── DeIdentificationModule
├── SyntheticDataModule
└── DashboardModule
```

---

## Фабрика конфігурації — configuration.ts

Цей файл перетворює плоскі змінні `process.env` у вкладену типізовану структуру, доступну через `ConfigService`:

```typescript
// backend/src/config/configuration.ts
// Фабрика конфігурації — повертає вкладений об'єкт
// Використання: configService.get<string>('db.host')

export default () => ({
  // ─── Налаштування додатку ───────────────────────────────────────────
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  },

  // ─── База даних ────────────────────────────────────────────────────
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'clinical_studio',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',  // Рядок → boolean
    logging: process.env.DB_LOGGING === 'true',
  },

  // ─── JWT автентифікація ─────────────────────────────────────────────
  jwt: {
    secret: process.env.JWT_SECRET ?? 'CHANGE_ME_IN_PRODUCTION',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',       // Час життя токену
  },

  // ─── Magic Link ────────────────────────────────────────────────────
  magicLink: {
    expiresInSeconds: parseInt(process.env.MAGIC_LINK_EXPIRES_IN ?? '900', 10),
  },

  // ─── Presidio сервіси ───────────────────────────────────────────────
  presidio: {
    analyzerUrl: process.env.PRESIDIO_ANALYZER_URL ?? 'http://localhost:5001',
    anonymizerUrl: process.env.PRESIDIO_ANONYMIZER_URL ?? 'http://localhost:5002',
  },

  // ─── Шифрування (AES-128 ключ для Presidio encrypt оператора) ──────
  encryption: {
    key: process.env.ENCRYPTION_KEY ?? '0000000000000000',
  },

  // ─── Пошта ─────────────────────────────────────────────────────────
  mail: {
    from: process.env.MAIL_FROM ?? 'noreply@clinicaldatastudio.com',
  },
});
```

### Приклад використання в сервісі

```typescript
// Будь-який сервіс може отримати конфігурацію через DI:
@Injectable()
export class SomeService {
  constructor(private readonly configService: ConfigService) {}

  someMethod() {
    const dbHost = this.configService.get<string>('db.host');
    const jwtSecret = this.configService.get<string>('jwt.secret');
    const analyzerUrl = this.configService.get<string>('presidio.analyzerUrl');
  }
}
```

---

## Схема обробки HTTP запиту

```
Клієнт (браузер)
    │
    ▼
 CORS middleware         ← Перевірка дозволеного origin
    │
    ▼
 Global Prefix /api      ← Маршрутизація за префіксом
    │
    ▼
 JwtAuthGuard            ← Перевірка Bearer token (якщо @UseGuards)
    │
    ▼
 ValidationPipe          ← Валідація DTO (class-validator декоратори)
    │
    ▼
 Controller method       ← Бізнес-логіка
    │
    ▼
 HttpExceptionFilter     ← Обробка помилок (якщо throw HttpException)
    │
    ▼
 Відповідь клієнту
```
