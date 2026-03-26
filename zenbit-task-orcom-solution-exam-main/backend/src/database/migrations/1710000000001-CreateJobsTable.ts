import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobsTable1710000000001 implements MigrationInterface {
  name = 'CreateJobsTable1710000000001';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`jobs\` (
        \`id\`          VARCHAR(36)                                                              NOT NULL,
        \`userId\`      VARCHAR(36)                                                              NOT NULL,
        \`status\`      ENUM('draft','configured','queued','processing','succeeded','failed')     NOT NULL DEFAULT 'draft',
        \`currentStep\` INT                                                                      NOT NULL DEFAULT 1,
        \`wizardState\` JSON                                                                     NULL,
        \`progress\`    INT                                                                      NOT NULL DEFAULT 0,
        \`documentId\`  VARCHAR(36)                                                              NULL,
        \`error\`       JSON                                                                     NULL,
        \`createdAt\`   DATETIME(6)                                                              NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\`   DATETIME(6)                                                              NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        INDEX \`IDX_jobs_userId\` (\`userId\`),
        UNIQUE INDEX \`REL_jobs_documentId\` (\`documentId\`),
        CONSTRAINT \`FK_jobs_userId\`
          FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`)
          ON DELETE CASCADE,
        CONSTRAINT \`FK_jobs_documentId\`
          FOREIGN KEY (\`documentId\`) REFERENCES \`documents\` (\`id\`)
          ON DELETE SET NULL
      ) ENGINE=InnoDB
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`jobs\``);
  }
}
