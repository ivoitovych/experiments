# Бекенд: Модуль де-ідентифікації

[← Автентифікація](./05-backend-auth-module.md) | [Життєвий цикл Job →](./07-backend-jobs-lifecycle.md)

---

## Огляд модуля

Модуль де-ідентифікації — серце всього застосунку. Він інтегрується з Microsoft Presidio для виявлення та анонімізації персональних даних (PII/PHI) у клінічних текстах.

### Архітектура модуля

```
DeIdentificationModule
├── DeIdentificationController    ← REST ендпоінти (/analyze, /anonymize, /upload, /documents)
├── DeIdentificationService       ← Бізнес-логіка (фільтрація за фреймворком, overlap resolution)
├── PresidioService               ← HTTP клієнт до Presidio Analyzer/Anonymizer
├── JobsController                ← REST ендпоінти для Jobs (див. 07-backend-jobs-lifecycle.md)
├── JobsService                   ← Логіка pipeline обробки
├── Document entity               ← Сутність документа
└── Job entity                    ← Сутність задачі
```

---

## PresidioService — HTTP клієнт до Presidio

Цей сервіс проксує запити до двох Docker-контейнерів Presidio:

```typescript
// backend/src/modules/de-identification/presidio.service.ts

// Типи відповідей від Presidio
export interface PresidioRecognizerResult {
  entity_type: string;   // Тип сутності: "PERSON", "US_SSN", "DATE_TIME"
  start: number;         // Початкова позиція у тексті
  end: number;           // Кінцева позиція
  score: number;         // Впевненість (0.0 — 1.0)
}

export interface PresidioAnonymizeResult {
  text: string;          // Повний анонімізований текст
  items: PresidioAnonymizedItem[];  // Список замін
}

// Типи операторів анонімізації
type AnonymizerOperator =
  | { type: 'replace'; new_value: string }     // Заміна на тег: <PERSON>
  | { type: 'redact' }                         // Видалення тексту
  | { type: 'hash'; hash_type: 'sha256' }      // Хешування
  | { type: 'encrypt'; key: string };           // AES шифрування

@Injectable()
export class PresidioService {
  private readonly analyzerUrl: string;    // http://localhost:5001
  private readonly anonymizerUrl: string;  // http://localhost:5002

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.analyzerUrl = configService.get<string>('presidio.analyzerUrl');
    this.anonymizerUrl = configService.get<string>('presidio.anonymizerUrl');
  }

  // ─── Аналіз тексту ─────────────────────────────────────────────────
  // POST http://localhost:5001/analyze
  async analyzeText(
    text: string,
    language: string,
    entities: string[],
    scoreThreshold?: number,
  ): Promise<PresidioRecognizerResult[]> {
    const body: Record<string, unknown> = { text, language };
    if (entities.length > 0) body.entities = entities;
    if (scoreThreshold !== undefined) body.score_threshold = scoreThreshold;

    const response = await firstValueFrom(
      this.httpService.post(`${this.analyzerUrl}/analyze`, body).pipe(
        timeout(30_000), // Таймаут 30 секунд
      ),
    );
    return response.data;
  }

  // ─── Анонімізація тексту ────────────────────────────────────────────
  // POST http://localhost:5002/anonymize
  async anonymizeText(
    text: string,
    analyzerResults: PresidioRecognizerResult[],
    strategy: string,
    entityTypes: string[],
  ): Promise<PresidioAnonymizeResult> {
    // Побудова карти операторів для кожного типу сутності
    const anonymizers: Record<string, AnonymizerOperator> = {};
    for (const entityType of entityTypes) {
      anonymizers[entityType] = this.buildOperatorForEntity(entityType, strategy);
    }

    const body = {
      text,
      analyzer_results: analyzerResults,
      anonymizers,
    };

    const response = await firstValueFrom(
      this.httpService.post(`${this.anonymizerUrl}/anonymize`, body).pipe(
        timeout(30_000),
      ),
    );
    return response.data;
  }

  // ─── Маппінг стратегії → оператор Presidio ──────────────────────────
  private buildOperatorForEntity(entityType: string, strategy: string): AnonymizerOperator {
    switch (strategy) {
      case 'replace':     return { type: 'replace', new_value: `<${entityType}>` };
      case 'redact':      return { type: 'redact' };
      case 'hash':        return { type: 'hash', hash_type: 'sha256' };
      case 'encrypt':     return {
        type: 'encrypt',
        key: this.configService.get<string>('encryption.key') ?? '0000000000000000',
      };
      case 'pseudonymize': return { type: 'replace', new_value: `<${entityType}_PSEUDO>` };
      case 'generalize':   return { type: 'replace', new_value: `<${entityType}_GENERALIZED>` };
      default:            return { type: 'replace', new_value: `<${entityType}>` };
    }
  }
}
```

---

## DeIdentificationService — бізнес-логіка

```typescript
// backend/src/modules/de-identification/de-identification.service.ts

@Injectable()
export class DeIdentificationService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly presidioService: PresidioService,
  ) {}

  // Аналіз тексту — проксування до Presidio Analyzer
  async analyzeText(dto: AnalyzeTextDto): Promise<PresidioRecognizerResult[]> {
    return this.presidioService.analyzeText(dto.text, dto.language ?? 'en', dto.entities ?? []);
  }

  // Фреймворк-залежна фільтрація сутностей
  // HIPAA Safe Harbor: фіксований набір з 14 типів сутностей
  private static readonly SAFE_HARBOR_ENTITIES = [
    'PERSON', 'DATE_TIME', 'PHONE_NUMBER', 'LOCATION', 'EMAIL_ADDRESS',
    'US_SSN', 'MEDICAL_LICENSE', 'US_PASSPORT', 'US_DRIVER_LICENSE',
    'CREDIT_CARD', 'IBAN_CODE', 'IP_ADDRESS', 'URL', 'NRP',
  ];

  // GDPR/UK_DPI/Swiss FADP: рівні ризику визначають набір сутностей
  private static readonly RISK_LEVEL_ENTITIES: Record<string, string[]> = {
    low:    ['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN'],
    medium: ['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN',
             'DATE_TIME', 'LOCATION', 'IP_ADDRESS', 'URL', 'CREDIT_CARD', 'IBAN_CODE'],
    high:   [/* всі сутності */],
  };

  // Анонімізація з збереженням результату в БД
  async anonymizeText(dto: AnonymizeTextDto, userId: string) {
    const startTime = Date.now();

    // 1. Фільтрація analyzerResults за фреймворком/рівнем ризику
    let analyzerResults = dto.analyzerResults;
    if (dto.framework === 'hipaa') {
      analyzerResults = analyzerResults.filter(
        r => DeIdentificationService.SAFE_HARBOR_ENTITIES.includes(r.entity_type)
      );
    } else if (['gdpr', 'uk_dpi', 'swiss_fadp'].includes(dto.framework)) {
      const allowed = DeIdentificationService.RISK_LEVEL_ENTITIES[dto.riskLevel ?? 'medium'];
      analyzerResults = analyzerResults.filter(r => allowed.includes(r.entity_type));
    }

    // 2. Вирішення перекриттів (overlap resolution)
    analyzerResults = this.resolveOverlaps(analyzerResults);

    // 3. Виклик Presidio Anonymizer
    const result = await this.presidioService.anonymizeText(
      dto.text, analyzerResults, dto.strategy,
      [...new Set(analyzerResults.map(r => r.entity_type))],
    );

    // 4. Збереження документа в БД
    const document = this.documentRepository.create({
      userId,
      originalText: dto.text,
      anonymizedText: result.text,
      status: 'completed',
      entityCount: analyzerResults.length,
      processingTimeMs: Date.now() - startTime,
      framework: dto.framework,
      analysisResult: analyzerResults,
    });

    return this.documentRepository.save(document);
  }

  // Алгоритм вирішення перекриттів:
  // Якщо дві сутності перекриваються, залишається та, у якої вищий score
  resolveOverlaps(results: PresidioRecognizerResult[]): PresidioRecognizerResult[] {
    const sorted = [...results].sort((a, b) => a.start - b.start || b.score - a.score);
    const resolved: PresidioRecognizerResult[] = [];
    for (const item of sorted) {
      const last = resolved[resolved.length - 1];
      if (!last || item.start >= last.end) {
        resolved.push(item);
      }
      // Якщо перекривається — пропускаємо (попередній має вищий score)
    }
    return resolved;
  }

  // Завантаження файлу — парсинг CSV/JSON/TXT
  async uploadFile(file: MulterFile): Promise<UploadFileResult> {
    const raw = readFileSync(file.path, 'utf-8').slice(0, 100_000); // Ліміт 100K символів
    // ... парсинг за типом файлу, повернення preview
  }
}
```

---

## DeIdentificationController

```typescript
// backend/src/modules/de-identification/de-identification.controller.ts

@ApiTags('De-Identification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)          // Усі ендпоінти вимагають JWT
@Controller('de-identification')
export class DeIdentificationController {

  // POST /api/de-identification/analyze — аналіз тексту через Presidio
  @Post('analyze')
  analyze(@Body() dto: AnalyzeTextDto) { ... }

  // POST /api/de-identification/anonymize — анонімізація + збереження в БД
  @Post('anonymize')
  anonymize(@Body() dto: AnonymizeTextDto, @CurrentUser() user: JwtPayload) { ... }

  // GET /api/de-identification/documents?page=1&limit=20 — список документів
  @Get('documents')
  getDocuments(
    @CurrentUser() user: JwtPayload,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) { ... }

  // GET /api/de-identification/documents/:id — один документ
  @Get('documents/:id')
  getDocument(@Param('id') id: string) { ... }

  // POST /api/de-identification/upload — завантаження файлу (multipart/form-data)
  // Ліміт: 5 MB, дозволені MIME: text/csv, application/json, text/plain
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({ destination: './uploads', ... }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (ALLOWED_MIMETYPES.includes(file.mimetype)) cb(null, true);
      else cb(new BadRequestException('Unsupported format'), false);
    },
  }))
  uploadFile(@UploadedFile() file: MulterFile) { ... }
}
```

---

## Стратегії анонімізації

| Стратегія | Опис | Приклад |
|-----------|------|---------|
| `replace` | Заміна на тег типу сутності | `John Smith` → `<PERSON>` |
| `redact` | Повне видалення тексту | `John Smith` → `` |
| `hash` | SHA-256 хеш значення | `John Smith` → `a1b2c3d4...` |
| `encrypt` | AES-128 шифрування | `John Smith` → `encrypted_base64...` |
| `pseudonymize` | Заміна на псевдонім | `John Smith` → `<PERSON_PSEUDO>` |
| `generalize` | Узагальнення | `John Smith` → `<PERSON_GENERALIZED>` |
