# Бекенд: Життєвий цикл Job

[← Де-ідентифікація](./06-backend-de-identification.md) | [Інші модулі →](./08-backend-other-modules.md)

---

## Діаграма життєвого циклу

```
  ┌───────┐    updateJob()    ┌────────────┐    runJob()     ┌────────┐
  │ DRAFT │ ─────────────────►│ CONFIGURED │ ──────────────►│ QUEUED │
  └───────┘                   └────────────┘                └───┬────┘
                                                                │
                                                                ▼
  ┌────────┐                                              ┌────────────┐
  │ FAILED │◄─── помилка ───────────────────────────────── │ PROCESSING │
  └────────┘                                              └─────┬──────┘
                                                                │ успіх
                                                                ▼
                                                          ┌───────────┐
                                                          │ SUCCEEDED │
                                                          └───────────┘
```

### Дозволені переходи статусів

```typescript
export const ALLOWED_STATUS_TRANSITIONS: Record<string, string[]> = {
  draft:      ['configured'],
  configured: ['queued'],
  queued:     ['processing'],
  processing: ['succeeded', 'failed'],
  succeeded:  [],                    // Фінальний статус
  failed:     ['queued'],            // Можна перезапустити
};
```

---

## Job Entity

Див. повний код у [04-backend-database.md](./04-backend-database.md#job-entity).

Ключові поля:
- `status` — ENUM стан (draft → configured → queued → processing → succeeded/failed)
- `wizardState` — JSON з повним станом wizard (framework, strategy, entities, inputText, language, minScore)
- `documentId` — FK на результуючий Document (OneToOne, створюється при успіху)
- `error` — JSON з кодом та повідомленням помилки

---

## JobsService

```typescript
// backend/src/modules/de-identification/jobs.service.ts

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    private readonly presidioService: PresidioService,
  ) {}

  // ─── Створення нового Job (статус: DRAFT) ─────────────────────────
  async createJob(userId: string, dto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create({
      userId,
      status: JobStatus.DRAFT,
      currentStep: 1,
      wizardState: dto.framework ? { framework: dto.framework } : null,
    });
    return this.jobRepository.save(job);
  }

  // ─── Список jobs поточного користувача ──────────────────────────────
  async getJobs(userId: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
    });
  }

  // ─── Отримання одного Job з перевіркою доступу ─────────────────────
  async getJob(jobId: string, userId: string): Promise<Job> {
    const job = await this.jobRepository.findOneBy({ id: jobId });
    if (!job) throw new NotFoundException('Job not found');
    if (job.userId !== userId) throw new ForbiddenException('Access denied');
    return job;
  }

  // ─── Оновлення wizardState (auto-save з фронтенду) ─────────────────
  async updateJob(jobId: string, userId: string, dto: UpdateJobDto): Promise<Job> {
    const job = await this.getJob(jobId, userId);

    // Валідація переходу статусу
    if (dto.status && dto.status !== job.status) {
      const allowed = ALLOWED_STATUS_TRANSITIONS[job.status] ?? [];
      if (!allowed.includes(dto.status)) {
        throw new BadRequestException(
          `Cannot transition from ${job.status} to ${dto.status}`
        );
      }
      job.status = dto.status as JobStatus;
    }

    // Оновлення wizardState (merge з існуючим)
    if (dto.wizardState) {
      job.wizardState = { ...job.wizardState, ...dto.wizardState };
    }
    if (dto.currentStep !== undefined) {
      job.currentStep = dto.currentStep;
    }

    return this.jobRepository.save(job);
  }

  // ─── Запуск pipeline де-ідентифікації ──────────────────────────────
  async runJob(jobId: string, userId: string): Promise<Job> {
    const job = await this.getJob(jobId, userId);
    const wizardState = job.wizardState;

    // Крок 1: Перехід QUEUED → PROCESSING
    job.status = JobStatus.QUEUED;
    job.progress = 0;
    await this.jobRepository.save(job);

    job.status = JobStatus.PROCESSING;
    await this.jobRepository.save(job);

    try {
      // Крок 2: Витягування параметрів з wizardState
      const inputText = (wizardState.inputText as string) ?? '';
      const language = (wizardState.language as string) ?? 'en';
      const entities = (wizardState.entities as string[]) ?? [];
      const strategy = (wizardState.strategy as string) ?? 'replace';
      const framework = (wizardState.framework as string) ?? 'hipaa';
      const minScore = (wizardState.minScore as number) ?? 0.5;

      // Крок 3: Аналіз тексту через Presidio Analyzer
      const analysisResult = await this.presidioService.analyzeText(
        inputText, language, entities, minScore,
      );

      // Крок 4: Анонімізація через Presidio Anonymizer + збереження Document
      const anonymizeResult = await this.presidioService.anonymizeText(
        inputText, analysisResult, strategy,
        [...new Set(analysisResult.map(r => r.entity_type))],
      );

      // Крок 5: Збереження документа
      const document = this.documentRepository.create({
        userId,
        originalText: inputText,
        anonymizedText: anonymizeResult.text,
        status: 'completed',
        entityCount: analysisResult.length,
        framework: framework as any,
        analysisResult,
      });
      const savedDoc = await this.documentRepository.save(document);

      // Крок 6: Оновлення job → SUCCEEDED
      job.status = JobStatus.SUCCEEDED;
      job.progress = 100;
      job.documentId = savedDoc.id;
      job.error = null;

    } catch (err) {
      // Помилка → FAILED
      job.status = JobStatus.FAILED;
      job.error = { code: 'PIPELINE_ERROR', message: err.message };
    }

    return this.jobRepository.save(job);
  }
}
```

---

## JobsController

```typescript
// backend/src/modules/de-identification/jobs.controller.ts

@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('de-identification/jobs')
export class JobsController {

  // POST /api/de-identification/jobs — створити новий draft job
  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateJobDto) { ... }

  // GET /api/de-identification/jobs — список jobs користувача
  @Get()
  findAll(@CurrentUser() user: JwtPayload) { ... }

  // GET /api/de-identification/jobs/:id — деталі job (з ParseUUIDPipe!)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) { ... }

  // PATCH /api/de-identification/jobs/:id — оновити wizardState (auto-save)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, ...) { ... }

  // POST /api/de-identification/jobs/:id/run — запуск pipeline
  @Post(':id/run')
  run(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) { ... }
}
```

---

## WizardState JSON — приклад

```json
{
  "framework": "hipaa",
  "hipaaMethod": "safe_harbor",
  "strategy": "replace",
  "language": "en",
  "entities": ["PERSON", "US_SSN", "DATE_TIME", "PHONE_NUMBER"],
  "minScore": 0.7,
  "inputText": "Patient John Smith (SSN: 123-45-6789) was admitted on 03/15/2024..."
}
```
