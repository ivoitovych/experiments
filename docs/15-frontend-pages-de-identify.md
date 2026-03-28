# Фронтенд: De-Identify 4-Step Wizard

[← Dashboard](./14-frontend-pages-dashboard.md) | [Processing та Results →](./16-frontend-pages-processing-results.md)

---

## Архітектура Wizard

`DeIdentify.tsx` (~476 рядків) реалізує 4-кроковий майстер через MUI `Stepper`:

```
Step 0: Вибір фреймворку       ← RadioGroup: HIPAA, GDPR, UK DPA, Swiss FADP, Custom
Step 1: Введення тексту         ← TextArea або FileUpload компонент
Step 2: Конфігурація анонімізації ← Залежить від фреймворку (див. нижче)
Step 3: Перегляд та запуск      ← Summary + кнопка "Run Analysis"
```

### Step 0 — Вибір фреймворку

```typescript
// RadioGroup з 5 опціями
const frameworks = [
  { value: 'hipaa', label: 'HIPAA', description: 'US health data' },
  { value: 'gdpr', label: 'GDPR', description: 'EU personal data' },
  { value: 'uk_dpi', label: 'UK DPA', description: 'UK data protection' },
  { value: 'swiss_fadp', label: 'Swiss FADP', description: 'Swiss data protection' },
  { value: 'custom', label: 'Custom', description: 'Manual entity selection' },
];

// Зміна → dispatch(setFramework(value))
```

### Step 1 — Введення тексту

- `<TextField multiline>` для прямого введення тексту
- `<FileUpload>` компонент для drag-and-drop (CSV/JSON/TXT)
- Мінімум 50 символів для продовження

### Step 2 — Конфігурація (залежить від фреймворку)

```
HIPAA → <HipaaConfig>
  ├── Safe Harbor (фіксовані 18 сутностей, тільки перегляд)
  └── Expert Determination (ручний вибір сутностей)

GDPR / UK DPA / Swiss FADP → <RiskSliderConfig>
  ├── Risk Level Slider (Low / Medium / High)
  └── Автоматичний набір сутностей за рівнем ризику

Custom → Ручний вибір сутностей через Chip компоненти
```

Спільне для всіх:
- **StrategySelect** — dropdown вибору стратегії (replace, redact, hash, encrypt...)
- **Language** — мова тексту (en, es, de, fr)
- **minScore** — поріг впевненості (Slider 0.0 - 1.0)

### Step 3 — Перегляд та запуск

```typescript
const handleRunAnalysis = async () => {
  setIsRunning(true);
  // 1. Створити Job → POST /jobs
  const job = await dispatch(createJob({ framework }));
  // 2. Оновити wizardState → PATCH /jobs/:id
  await dispatch(updateJob({ id: job.id, data: { wizardState: settings, status: 'configured' } }));
  // 3. Запустити → POST /jobs/:id/run
  await dispatch(runJob(job.id));
  // 4. Redirect → /app/processing/:id
  navigate(`/app/processing/${job.id}`);
};
```
