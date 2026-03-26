/**
 * AppModule — root module
 *
 * Imports are ordered from infrastructure → feature modules:
 *   1. ConfigModule  — loads .env, makes ConfigService available everywhere
 *   2. TypeOrmModule — database connection
 *   3. Feature modules
 *
 * Global providers (HttpExceptionFilter) are registered here.
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import configuration from './config/configuration';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DeIdentificationModule } from './modules/de-identification/de-identification.module';
import { SyntheticDataModule } from './modules/synthetic-data/synthetic-data.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

// Entities — TypeORM needs to know about all entities for auto-migrations
import { User } from './modules/users/entities/user.entity';
import { Document } from './modules/de-identification/entities/document.entity';
import { Job } from './modules/de-identification/entities/job.entity';
import { SyntheticRecord } from './modules/synthetic-data/entities/synthetic-record.entity';

@Module({
  imports: [
    // ─── Config ─────────────────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,               // ConfigService injectable everywhere without re-importing
      load: [configuration],        // our typed configuration factory
      envFilePath: '.env',
    }),

    // ─── Database ────────────────────────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      // registerAsync reads configuration AFTER ConfigModule has loaded .env
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.name'),
        entities: [User, Document, Job, SyntheticRecord],
        // synchronize: true auto-creates/alters tables to match entities.
        // NEVER use in production — use migrations instead.
        synchronize: configService.get<boolean>('db.synchronize') ?? false,
        logging: configService.get<boolean>('db.logging') ?? false,
        // Retry logic for startup race condition (app starts before MySQL is ready)
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),

    // ─── Feature Modules ─────────────────────────────────────────────────────
    AuthModule,
    UsersModule,
    DeIdentificationModule,
    SyntheticDataModule,
    DashboardModule,
  ],
  providers: [
    // Apply HttpExceptionFilter globally — all unhandled exceptions go through it
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
