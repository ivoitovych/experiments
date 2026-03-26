/**
 * Configuration factory for @nestjs/config
 *
 * @nestjs/config loads this factory and makes the return value available
 * via ConfigService throughout the application:
 *
 *   constructor(private readonly configService: ConfigService) {}
 *   const port = this.configService.get<number>('app.port');
 *
 * Why a nested object? Flat keys can collide. Nested keys allow
 * this.configService.get('db.host') instead of 'DB_HOST'.
 *
 * IMPORTANT: Never access process.env directly in business logic.
 * Always inject ConfigService. The ESLint rule in .eslintrc.cjs enforces this.
 */
export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'clinical_studio',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'CHANGE_ME_IN_PRODUCTION',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
  magicLink: {
    expiresInSeconds: parseInt(process.env.MAGIC_LINK_EXPIRES_IN ?? '900', 10),
  },
  presidio: {
    analyzerUrl: process.env.PRESIDIO_ANALYZER_URL ?? 'http://localhost:5001',
    anonymizerUrl: process.env.PRESIDIO_ANONYMIZER_URL ?? 'http://localhost:5002',
  },
  encryption: {
    // Dedicated key for Presidio encrypt operator. Must be exactly 16 chars (AES-128).
    // Generate: openssl rand -hex 8
    key: process.env.ENCRYPTION_KEY ?? '0000000000000000',
  },
  mail: {
    from: process.env.MAIL_FROM ?? 'noreply@clinicaldatastudio.com',
  },
});
