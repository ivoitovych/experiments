/**
 * TypeORM DataSource — used by the TypeORM CLI for migrations
 *
 * The CLI commands in package.json reference this file:
 *   npm run migration:generate -- -n CreateUsersTable
 *   npm run migration:run
 *   npm run migration:revert
 *
 * This is separate from the AppModule TypeORM config because the CLI
 * runs outside of NestJS's DI container, so it can't use ConfigService.
 * We load .env directly here using dotenv.
 *
 * Note: In production, set DB_SYNCHRONIZE=false and use migrations.
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../modules/users/entities/user.entity';
import { Document } from '../modules/de-identification/entities/document.entity';
import { Job } from '../modules/de-identification/entities/job.entity';
import { SyntheticRecord } from '../modules/synthetic-data/entities/synthetic-record.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'clinical_studio',
  entities: [User, Document, Job, SyntheticRecord],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,  // NEVER sync in production
  logging: false,
});
