# Бекенд: База даних та ORM

[← Запуск та конфігурація](./03-backend-bootstrap-config.md) | [Автентифікація →](./05-backend-auth-module.md)

---

## TypeORM DataSource для CLI

Цей файл використовується CLI командами TypeORM (міграції) і працює **поза** NestJS DI контейнером:

```typescript
// backend/src/database/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../modules/users/entities/user.entity';
import { Document } from '../modules/de-identification/entities/document.entity';
import { Job } from '../modules/de-identification/entities/job.entity';
import { SyntheticRecord } from '../modules/synthetic-data/entities/synthetic-record.entity';

// Завантажуємо .env вручну (бо немає ConfigService поза NestJS)
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD,            // Без дефолту — обов'язкова змінна
  database: process.env.DB_NAME ?? 'clinical_studio',
  entities: [User, Document, Job, SyntheticRecord],
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // Шлях до файлів міграцій
  synchronize: false,           // НІКОЛИ не використовувати synchronize в продакшн
  logging: false,
});
```

---

## ER-діаграма (взаємозв'язки між сутностями)

```
┌──────────────────┐       ┌──────────────────────┐       ┌──────────────────┐
│      users       │       │      documents       │       │       jobs       │
├──────────────────┤       ├──────────────────────┤       ├──────────────────┤
│ id          (PK) │◄──┐   │ id            (PK)   │   ┌──►│ id          (PK) │
│ email       (UQ) │   │   │ userId        (FK)   │───┤   │ userId      (FK) │
│ firstName        │   ├───│ originalText         │   │   │ status      ENUM │
│ lastName         │   │   │ anonymizedText       │   │   │ currentStep      │
│ role        ENUM │   │   │ status        ENUM   │   │   │ wizardState JSON │
│ magicLinkToken   │   │   │ entityCount          │   │   │ progress         │
│ magicLinkExpires │   │   │ processingTimeMs     │   │   │ documentId  (FK) │──┐
│ isActive         │   │   │ framework     ENUM   │   │   │ error       JSON │  │
│ createdAt        │   │   │ analysisResult JSON  │◄──┼───│ createdAt        │  │
│ updatedAt        │   │   │ createdAt            │   │   │ updatedAt        │  │
└──────────────────┘   │   └──────────────────────┘   │   └──────────────────┘  │
                       │                              │                         │
                       │   ┌──────────────────────┐   │        OneToOne         │
                       │   │  synthetic_records   │   │                         │
                       │   ├──────────────────────┤   └─────────────────────────┘
                       └───│ userId       (Index) │
                           │ id            (PK)   │
                           │ entityType           │
                           │ value                │
                           │ locale               │
                           │ createdAt            │
                           └──────────────────────┘
```

**Зв'язки:**
- `User` → `Document`: One-to-Many (один користувач має багато документів), `ON DELETE CASCADE`
- `User` → `Job`: Many-to-One, `ON DELETE CASCADE`
- `Job` → `Document`: One-to-One (один job створює один документ), `ON DELETE SET NULL`
- `User` → `SyntheticRecord`: немає FK constraint (лише індекс на `userId`)

---

## Сутності (Entities)

### User Entity

```typescript
// backend/src/modules/users/entities/user.entity.ts
export type UserRole = 'admin' | 'analyst' | 'viewer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')           // UUID замість auto-increment (безпека)
  id: string;

  @Column({ unique: true })                 // Унікальний індекс на рівні БД
  email: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({
    type: 'enum',
    enum: ['admin', 'analyst', 'viewer'],
    default: 'analyst',                     // Нові користувачі — analyst за замовчуванням
  })
  role: UserRole;

  // select: false — НІКОЛИ не повертається у звичайних SELECT запитах
  // Потрібно явно: .addSelect('user.magicLinkToken')
  @Column({ type: 'varchar', nullable: true, select: false })
  magicLinkToken: string | null;

  @Column({ nullable: true, type: 'datetime', select: false })
  magicLinkExpiresAt: Date | null;

  @Column({ default: false })               // Активується при першому вході
  isActive: boolean;

  @CreateDateColumn()                        // Автоматично встановлюється TypeORM
  createdAt: Date;

  @UpdateDateColumn()                        // Автоматично оновлюється TypeORM
  updatedAt: Date;

  // Зв'язок: один користувач → багато документів
  // Рядковий синтаксис уникає циклічних залежностей між файлами
  @OneToMany('Document', 'user')
  documents: Document[];
}
```

### Document Entity

```typescript
// backend/src/modules/de-identification/entities/document.entity.ts
export type DocumentStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type ComplianceFramework = 'hipaa' | 'gdpr' | 'uk_dpi' | 'swiss_fadp' | 'custom';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()                                   // Індекс для швидкого пошуку по userId
  @Column()
  userId: string;

  @ManyToOne('User', 'documents', { onDelete: 'CASCADE' })  // Видалення каскадне
  user: User;

  @Column('text')                            // Оригінальний клінічний текст (PHI)
  originalText: string;

  @Column('text', { nullable: true })        // Анонімізований текст (після обробки)
  anonymizedText: string | null;

  @Column({
    type: 'enum',
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  })
  status: DocumentStatus;

  @Column({ default: 0 })                   // Кількість виявлених PII сутностей
  entityCount: number;

  @Column({ type: 'int', nullable: true })   // Час обробки в мілісекундах
  processingTimeMs: number | null;

  @Column({
    type: 'enum',
    enum: ['hipaa', 'gdpr', 'uk_dpi', 'swiss_fadp', 'custom'],
    default: 'hipaa',
  })
  framework: ComplianceFramework;

  @Column('json', { nullable: true })        // Результати аналізу Presidio (JSON масив)
  analysisResult: PresidioRecognizerResult[] | null;

  @CreateDateColumn()
  createdAt: Date;
}
```

### Job Entity

```typescript
// backend/src/modules/de-identification/entities/job.entity.ts
// Job — представляє одну задачу де-ідентифікації з повним станом wizard
export enum JobStatus {
  DRAFT = 'draft',           // Створено, wizard не завершено
  CONFIGURED = 'configured', // Wizard завершено, готовий до запуску
  QUEUED = 'queued',         // В черзі на обробку
  PROCESSING = 'processing', // Обробляється Presidio
  SUCCEEDED = 'succeeded',   // Успішно завершено
  FAILED = 'failed',         // Помилка обробки
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('User', { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Index()
  @Column()
  userId: string;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.DRAFT })
  status: JobStatus;

  @Column({ type: 'int', default: 1 })      // Поточний крок wizard (0-3)
  currentStep: number;

  @Column({ type: 'json', nullable: true })  // Стан wizard у JSON форматі
  wizardState: Record<string, any> | null;   // framework, strategy, entities, inputText...

  @Column({ type: 'int', default: 0 })      // Прогрес обробки (0-100)
  progress: number;

  @OneToOne('Document', { nullable: true, eager: false })
  @JoinColumn({ name: 'documentId' })
  document: Document | null;                 // Результуючий документ (після успіху)

  @Column({ nullable: true })
  documentId: string | null;

  @Column({ type: 'json', nullable: true })  // Помилка обробки
  error: { code: string; message: string } | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### SyntheticRecord Entity

```typescript
// backend/src/modules/synthetic-data/entities/synthetic-record.entity.ts
// Зберігає одиничний запис згенерованих синтетичних PHI даних

@Entity('synthetic_records')
export class SyntheticRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()                                   // Індекс для фільтрації по користувачу
  @Column()
  userId: string;                            // Немає FK constraint (на відміну від documents)

  @Column()
  entityType: string;                        // Тип сутності: PERSON, US_SSN, DATE_TIME тощо

  @Column('text')
  value: string;                             // Згенероване значення: "John Smith", "523-45-6789"

  @Column({ default: 'en_US' })
  locale: string;                            // Локаль генерації

  @CreateDateColumn()
  createdAt: Date;
}
```

---

## Міграції

### Міграція 1: Початкова схема (users, documents, synthetic_records)

```typescript
// backend/src/database/migrations/1710000000000-InitialSchema.ts
export class InitialSchema1710000000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    // Таблиця користувачів
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS users (
        id                 VARCHAR(36)    NOT NULL,            -- UUID первинний ключ
        email              VARCHAR(255)   NOT NULL,            -- Унікальний email
        firstName          VARCHAR(255)   NULL,
        lastName           VARCHAR(255)   NULL,
        role               ENUM('admin','analyst','viewer') NOT NULL DEFAULT 'analyst',
        magicLinkToken     VARCHAR(255)   NULL,                -- Токен магічного посилання
        magicLinkExpiresAt DATETIME       NULL,                -- Час закінчення токену
        isActive           TINYINT(1)     NOT NULL DEFAULT 0,  -- Активовано після 1-го входу
        createdAt          DATETIME(6)    NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt          DATETIME(6)    NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
                           ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        UNIQUE INDEX IDX_users_email (email)
      ) ENGINE=InnoDB
    `);

    // Таблиця документів (результати де-ідентифікації)
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id               VARCHAR(36)  NOT NULL,
        userId           VARCHAR(36)  NOT NULL,                -- FK → users.id
        originalText     TEXT         NOT NULL,                -- Оригінальний текст (PHI)
        anonymizedText   TEXT         NULL,                    -- Анонімізований текст
        status           ENUM('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
        entityCount      INT          NOT NULL DEFAULT 0,      -- Кількість виявлених сутностей
        processingTimeMs INT          NULL,                    -- Час обробки (мс)
        framework        ENUM('hipaa','gdpr','custom') NOT NULL DEFAULT 'hipaa',
        analysisResult   JSON         NULL,                    -- Масив результатів Presidio
        createdAt        DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        INDEX IDX_documents_userId (userId),
        CONSTRAINT FK_documents_userId
          FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);

    // Таблиця синтетичних записів
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS synthetic_records (
        id         VARCHAR(36)  NOT NULL,
        userId     VARCHAR(36)  NOT NULL,                      -- Індекс без FK
        entityType VARCHAR(255) NOT NULL,                      -- Тип: PERSON, US_SSN тощо
        value      TEXT         NOT NULL,                      -- Згенероване значення
        locale     VARCHAR(255) NOT NULL DEFAULT 'en_US',
        createdAt  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        INDEX IDX_synthetic_records_userId (userId)
      ) ENGINE=InnoDB
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    // Відкат: видалення таблиць у зворотному порядку (через FK)
    await queryRunner.query(`DROP TABLE synthetic_records`);
    await queryRunner.query(`DROP TABLE documents`);
    await queryRunner.query(`DROP TABLE users`);
  }
}
```

### Міграція 2: Таблиця Jobs

```typescript
// backend/src/database/migrations/1710000000001-CreateJobsTable.ts
export class CreateJobsTable1710000000001 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id          VARCHAR(36)  NOT NULL,
        userId      VARCHAR(36)  NOT NULL,                     -- FK → users.id
        status      ENUM('draft','configured','queued','processing','succeeded','failed')
                    NOT NULL DEFAULT 'draft',
        currentStep INT          NOT NULL DEFAULT 1,           -- Крок wizard (0-3)
        wizardState JSON         NULL,                         -- Повний стан wizard
        progress    INT          NOT NULL DEFAULT 0,           -- 0-100%
        documentId  VARCHAR(36)  NULL,                         -- FK → documents.id (OneToOne)
        error       JSON         NULL,                         -- {code, message}
        createdAt   DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt   DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
                    ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        INDEX IDX_jobs_userId (userId),
        UNIQUE INDEX REL_jobs_documentId (documentId),         -- OneToOne constraint
        CONSTRAINT FK_jobs_userId
          FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT FK_jobs_documentId
          FOREIGN KEY (documentId) REFERENCES documents (id) ON DELETE SET NULL
      ) ENGINE=InnoDB
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS jobs`);
  }
}
```

---

## Seed — створення початкового користувача

```typescript
// backend/src/database/seeds/seed.ts
// Скрипт ідемпотентний: якщо admin вже існує, пропускає створення
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { AppDataSource } from '../data-source';
import { User } from '../../modules/users/entities/user.entity';

dotenv.config();

async function seed(): Promise<void> {
  await AppDataSource.initialize();                 // Підключення до БД
  const repo = AppDataSource.getRepository(User);

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@clinical-studio.local';

  // Перевірка: чи існує admin
  const existing = await repo.findOneBy({ email: adminEmail });
  if (existing) {
    console.log(`Admin вже існує: ${adminEmail}`);
    await AppDataSource.destroy();
    return;
  }

  // Створення admin користувача
  const admin = repo.create({
    email: adminEmail,
    role: 'admin',
    isActive: true,              // Одразу активний (не потребує magic link)
  });
  await repo.save(admin);

  console.log(`Створено admin: ${adminEmail} (id: ${admin.id})`);
  await AppDataSource.destroy();                    // Закриття з'єднання
}

seed().catch((err) => {
  console.error('Seed помилка:', err);
  process.exit(1);
});
```

### Команди для роботи з БД

```bash
# Запуск міграцій (створення таблиць)
npm run migration:run

# Відкат останньої міграції
npm run migration:revert

# Створення admin користувача
npm run db:seed

# Генерація нової міграції (на основі змін entities)
npm run migration:generate -- -n НазваМіграції
```
