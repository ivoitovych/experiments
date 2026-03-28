# Фронтенд: Processing та Results

[← De-Identify Wizard](./15-frontend-pages-de-identify.md) | [Synthetic Data →](./17-frontend-pages-synthetic.md)

---

## Processing.tsx — очікування результату

Сторінка відображає прогрес обробки Job та автоматично переходить на Results при успіху.

### Polling механізм

```typescript
// Polling GET /jobs/:id кожні 1.5 секунди
useEffect(() => {
  dispatch(pollJob(jobId));        // Перший запит одразу

  const interval = setInterval(() => {
    dispatch(pollJob(jobId));      // Наступні — кожні 1500 мс
  }, 1500);

  return () => clearInterval(interval); // Cleanup при unmount
}, [jobId]);

// Автоматичний redirect при успіху
useEffect(() => {
  if (currentJob?.status === JobStatus.SUCCEEDED) {
    clearInterval(interval);
    navigate(`/app/results/${currentJob.id}`);
  }
  if (currentJob?.status === JobStatus.FAILED) {
    clearInterval(interval);
    // Показати кнопку Retry
  }
}, [currentJob?.status]);
```

### UI елементи

- `LinearProgress` — determinate (за progress %) або indeterminate
- Elapsed timer — відлік часу обробки
- Retry button — при FAILED статусі

---

## Results.tsx — 7 інтерактивних функцій

Найбільший компонент проєкту (~723 рядки). Відображає результати де-ідентифікації.

### Архітектура

```
Results.tsx
├── Feature 1: Entity Toggle      ← Чіпи для фільтрації типів сутностей
├── Feature 2: Sync Scroll        ← Синхронне прокручування двох панелей
├── Feature 3: Copy Cell          ← Копіювання тексту сутності в буфер
├── Feature 4: Export PDF          ← Генерація PDF звіту (jsPDF)
├── Feature 5: Audit Trail        ← Розгортувана секція аудиту відповідності
├── Feature 6: Re-run with Tweaks ← Повернення до wizard зі збереженими налаштуваннями
└── Feature 7: Navigation         ← Кнопки: New Analysis, Synthetic Data, Dashboard
```

### Feature 1: Entity Toggle

```typescript
// Стан: Set активних типів сутностей
const [activeEntityTypes, setActiveEntityTypes] = useState<Set<string>>(new Set(allTypes));

const toggleEntityType = (type: string) => {
  setActiveEntityTypes(prev => {
    const next = new Set(prev);
    next.has(type) ? next.delete(type) : next.add(type);
    return next;
  });
};

// Рендеринг чіпів з кількістю
{entityTypes.map(type => (
  <Chip
    key={type}
    label={`${type} (${entityCounts[type]})`}
    color={activeEntityTypes.has(type) ? 'primary' : 'default'}
    onClick={() => toggleEntityType(type)}
  />
))}
```

### Feature 2: Sync Scroll

```typescript
// Два ref'и на панелі + синхронізація через onScroll
const leftRef = useRef<HTMLPreElement>(null);
const rightRef = useRef<HTMLPreElement>(null);
const isSyncing = useRef(false); // Guard від рекурсії

const handleScroll = (source: 'left' | 'right') => {
  if (isSyncing.current) return;
  isSyncing.current = true;
  const from = source === 'left' ? leftRef.current : rightRef.current;
  const to = source === 'left' ? rightRef.current : leftRef.current;
  if (from && to) to.scrollTop = from.scrollTop;
  requestAnimationFrame(() => { isSyncing.current = false; });
};
```

### Feature 3: Copy Cell

```typescript
const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  setSnackbarMessage('Copied!');
};
```

### Feature 4: Export PDF

```typescript
const exportPdf = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('De-Identification Report', 20, 20);
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
  doc.text(`Framework: ${job.wizardState?.framework}`, 20, 40);
  // Додавання анонімізованого тексту з авто-пагінацією
  const lines = doc.splitTextToSize(sanitizeForPdf(anonymizedText), 170);
  doc.text(lines, 20, 60);
  doc.save('de-identification-report.pdf');
};
```

### Feature 5: Compliance Audit Trail

Розгортуваний `Accordion` з деталями:
- Фреймворк та метод (HIPAA Safe Harbor / Expert Determination)
- Стратегія анонімізації
- Виявлені сутності (розбивка по типах)
- Час обробки
- Кнопка "Download Compliance Report" (окремий PDF)

### Feature 6-7: Re-run та Navigation

```typescript
// Re-run: повернення до wizard з попередніми налаштуваннями
<Button onClick={() => navigate(`/app/de-identify?jobId=${jobId}&step=2`)}>
  Adjust Settings
</Button>

// Navigation
<Button onClick={() => { dispatch(resetWorkflow()); navigate('/app/de-identify'); }}>
  New Analysis
</Button>
```

### buildHighlightedText() — підсвічування сутностей

```typescript
// Алгоритм: сортуємо сутності за позицією, вставляємо React елементи між ними
function buildHighlightedText(text, entities, activeTypes) {
  const sorted = [...entities].sort((a, b) => a.start - b.start);
  const parts = [];
  let lastIndex = 0;

  for (const entity of sorted) {
    if (!activeTypes.has(entity.entity_type)) continue;
    // Текст до сутності
    parts.push(text.slice(lastIndex, entity.start));
    // Підсвічена сутність з Tooltip
    parts.push(
      <Tooltip title={`${entity.entity_type} (${entity.score.toFixed(2)})`}>
        <span style={{ backgroundColor: entityColor(entity.entity_type) }}>
          {text.slice(entity.start, entity.end)}
        </span>
      </Tooltip>
    );
    lastIndex = entity.end;
  }
  parts.push(text.slice(lastIndex)); // Залишок тексту
  return parts;
}
```
