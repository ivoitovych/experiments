/**
 * main.ts — NestJS bootstrap
 *
 * Startup sequence:
 * 1. Create the Nest application
 * 2. Enable CORS (allows the React frontend to call the API)
 * 3. Set global validation pipe (class-validator + class-transformer)
 * 4. Configure Swagger UI at /api/docs
 * 5. Listen on the configured port
 *
 * Swagger UI: http://localhost:3000/api/docs
 * Raw OpenAPI JSON: http://localhost:3000/api/docs-json
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') ?? 3000;
  const corsOrigin = configService.get<string>('app.corsOrigin') ?? 'http://localhost:5173';
  const nodeEnv = configService.get<string>('app.nodeEnv') ?? 'development';

  // ─── CORS ─────────────────────────────────────────────────────────────────
  // Allow the React frontend (Vite dev server) to call this API.
  // In production, set CORS_ORIGIN to the actual frontend domain.
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ─── Global prefix ────────────────────────────────────────────────────────
  // All routes are prefixed with /api: GET /api/dashboard, POST /api/auth/magic-link
  app.setGlobalPrefix('api');

  // ─── Validation pipe ──────────────────────────────────────────────────────
  // Applied globally: every incoming request body is validated against its DTO.
  // whitelist: strips properties not defined in the DTO (prevents extra fields)
  // forbidNonWhitelisted: throws 400 if extra properties are present
  // transform: transforms plain objects to class instances (needed for @Type, @Transform)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // allows @Query('page') to be converted to number
      },
    }),
  );

  // ─── Swagger ──────────────────────────────────────────────────────────────
  // Available in all environments for learning purposes.
  // In production, you may want to conditionally disable this.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Clinical Data Studio API')
    .setDescription(
      'REST API for clinical text de-identification and synthetic data generation.\n\n' +
      '**Authentication:** Use the magic link flow to get a JWT, then click "Authorize" and paste it.\n\n' +
      '**Presidio endpoints** require the Docker containers to be running:\n' +
      '- `POST /api/de-identification/analyze` → calls presidio-analyzer:5001\n' +
      '- `POST /api/de-identification/anonymize` → calls presidio-anonymizer:5002',
    )
    .setVersion('1.0')
    .addBearerAuth()   // enables the 🔒 Authorize button in Swagger UI
    .addTag('Auth', 'Magic link authentication flow')
    .addTag('Users', 'User management')
    .addTag('De-Identification', 'PII detection and anonymization via Presidio')
    .addTag('Synthetic Data', 'Synthetic patient data generation')
    .addTag('Dashboard', 'Metrics and activity data')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // keeps the JWT token when page is refreshed
      docExpansion: 'list',
    },
  });

  await app.listen(port);

  logger.log(`🏥 Clinical Data Studio API running in ${nodeEnv} mode`);
  logger.log(`📡 Listening on port ${port}`);
  logger.log(`📖 Swagger UI: http://localhost:${port}/api/docs`);
  logger.log(`🔑 CORS origin: ${corsOrigin}`);
}

void bootstrap();
