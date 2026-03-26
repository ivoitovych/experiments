/**
 * Smoke tests — hit the real running server on localhost:3000
 *
 * Prerequisites:
 *   - Backend running: npm run start:dev
 *   - MySQL running: docker compose up -d mysql
 *
 * Run:
 *   npx ts-node -r tsconfig-paths/register test/smoke.ts
 */
import axios, { type AxiosInstance } from 'axios';
import { execSync } from 'child_process';

const BASE = 'http://localhost:3000/api';
const TEST_EMAIL = 'smoke@test.local';
const GREEN = '\x1b[32m✓\x1b[0m';
const RED   = '\x1b[31m✗\x1b[0m';

let passed = 0;
let failed = 0;

async function check(
  label: string,
  fn: () => Promise<{ status: number }>,
  expected = 200,
): Promise<void> {
  process.stdout.write(`  ${label} ... `);
  try {
    const res = await fn();
    if (res.status === expected) {
      console.log(`${GREEN} ${res.status}`);
      passed++;
    } else {
      console.log(`${RED} expected ${expected}, got ${res.status}`);
      failed++;
    }
  } catch (err: unknown) {
    const status = axios.isAxiosError(err) ? err.response?.status : 'ERR';
    console.log(`${RED} ${status}`);
    failed++;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMagicToken(): string {
  const sql = `SELECT magicLinkToken FROM users WHERE email='${TEST_EMAIL}' AND magicLinkToken IS NOT NULL ORDER BY updatedAt DESC LIMIT 1`;
  const out = execSync(
    `docker exec clinical-studio-mysql mysql -u root -p"change_me_in_prod" -sN clinical_studio -e "${sql}" 2>/dev/null`,
    { encoding: 'utf8' },
  ).trim();
  if (!out) throw new Error('No magic link token found in DB — is the backend running?');
  return out;
}

function makeClient(token?: string): AxiosInstance {
  return axios.create({
    baseURL: BASE,
    validateStatus: () => true, // never throw on HTTP errors
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function run(): Promise<void> {
  console.log('\n\x1b[1m═══ Clinical Data Studio — Smoke Tests ═══\x1b[0m\n');

  const anon = makeClient();

  // ── Step 1: Public endpoints ─────────────────────────────────────────────
  console.log('\x1b[33m[PUBLIC]\x1b[0m');

  await check('POST /auth/magic-link', () =>
    anon.post('/auth/magic-link', { email: TEST_EMAIL }),
  );

  // ── Step 2: Get token from DB, verify → get JWT ──────────────────────────
  console.log('\n\x1b[33m[AUTH FLOW]\x1b[0m');

  let jwt = '';
  process.stdout.write('  Reading magic link token from DB ... ');
  let magicToken: string;
  try {
    magicToken = getMagicToken();
    console.log(`${GREEN} OK (${magicToken.slice(0, 8)}...)`);
  } catch (err) {
    console.log(`${RED} ${(err as Error).message}`);
    printSummary();
    process.exit(1);
  }

  process.stdout.write('  POST /auth/verify ... ');
  try {
    const res = await anon.post('/auth/verify', { token: magicToken });
    if (res.status === 200 && res.data.token) {
      jwt = res.data.token as string;
      console.log(`${GREEN} 200 (JWT obtained)`);
      passed++;
    } else {
      console.log(`${RED} ${res.status} — ${JSON.stringify(res.data)}`);
      failed++;
      printSummary();
      process.exit(1);
    }
  } catch (err) {
    console.log(`${RED} ${(err as Error).message}`);
    failed++;
    printSummary();
    process.exit(1);
  }

  // ── Step 3: Protected endpoints ──────────────────────────────────────────
  console.log('\n\x1b[33m[PROTECTED]\x1b[0m');
  const auth = makeClient(jwt);

  await check('GET  /auth/me', () => auth.get('/auth/me'));
  await check('GET  /users', () => auth.get('/users'));
  await check('GET  /users/me', () => auth.get('/users/me'));
  await check('GET  /dashboard', () => auth.get('/dashboard'));

  // ── Step 4: De-identification flow ───────────────────────────────────────
  console.log('\n\x1b[33m[DE-IDENTIFICATION]\x1b[0m');

  const sampleText = 'Patient John Doe, born 1985-03-12, email john.doe@hospital.org';

  // Analyze
  let analyzerResults: unknown[] = [];
  process.stdout.write('  POST /de-identification/analyze ... ');
  try {
    const res = await auth.post('/de-identification/analyze', {
      text: sampleText,
      language: 'en',
    });
    if (res.status === 200 || res.status === 201) {
      analyzerResults = res.data as unknown[];
      console.log(`${GREEN} ${res.status} (${analyzerResults.length} entities found)`);
      passed++;
    } else {
      console.log(`${RED} ${res.status} — ${JSON.stringify(res.data)}`);
      failed++;
    }
  } catch (err) {
    console.log(`${RED} ${(err as Error).message}`);
    failed++;
  }

  // Anonymize (only if analyze succeeded)
  if (analyzerResults.length > 0) {
    process.stdout.write('  POST /de-identification/anonymize ... ');
    try {
      const res = await auth.post('/de-identification/anonymize', {
        text: sampleText,
        analyzerResults,
        strategy: 'replace',
      });
      if (res.status === 200 || res.status === 201) {
        const data = res.data as { anonymizedText?: string; text?: string };
        const preview = (data.anonymizedText ?? data.text ?? '').slice(0, 50);
        console.log(`${GREEN} ${res.status} — "${preview}..."`);
        passed++;
      } else {
        console.log(`${RED} ${res.status} — ${JSON.stringify(res.data)}`);
        failed++;
      }
    } catch (err) {
      console.log(`${RED} ${(err as Error).message}`);
      failed++;
    }
  } else {
    console.log(`  POST /de-identification/anonymize ... \x1b[33mSKIPPED\x1b[0m (no entities to anonymize)`);
  }

  await check('GET  /de-identification/documents', () =>
    auth.get('/de-identification/documents'),
  );

  // ── Step 5: Synthetic data ────────────────────────────────────────────────
  console.log('\n\x1b[33m[SYNTHETIC DATA]\x1b[0m');

  await check(
    'POST /synthetic-data/generate',
    () =>
      auth.post('/synthetic-data/generate', {
        recordCount: 3,
        entityTypes: ['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER'],
        locale: 'en_US',
      }),
    201,
  );

  // ── Summary ───────────────────────────────────────────────────────────────
  printSummary();
  process.exit(failed > 0 ? 1 : 0);
}

function printSummary(): void {
  const total = passed + failed;
  console.log(`\n${'─'.repeat(45)}`);
  if (failed === 0) {
    console.log(`\x1b[32m\x1b[1m  ALL ${total} CHECKS PASSED\x1b[0m`);
  } else {
    console.log(`\x1b[32m  ${passed} passed\x1b[0m  \x1b[31m${failed} failed\x1b[0m  (${total} total)`);
  }
  console.log();
}

run().catch((err) => {
  console.error('\x1b[31mFatal:\x1b[0m', err);
  process.exit(1);
});
