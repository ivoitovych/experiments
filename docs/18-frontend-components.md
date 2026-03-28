# Фронтенд: Компоненти

[← Synthetic Data](./17-frontend-pages-synthetic.md) | [Layouts →](./19-frontend-layouts.md)

---

## Перелік перевикористовуваних компонентів

| Компонент | Файл | Призначення |
|-----------|------|-------------|
| FileUpload | `components/FileUpload/` | Drag-and-drop завантаження файлів |
| HipaaConfig | `components/HipaaConfig/` | Конфігурація HIPAA (Safe Harbor / Expert) |
| RiskSliderConfig | `components/RiskSliderConfig/` | Слайдер ризику GDPR/UK/Swiss |
| StrategySelect | `components/StrategySelect/` | Dropdown стратегій анонімізації |
| LoadingSpinner | `components/LoadingSpinner/` | Індикатор завантаження |
| DocumentDetailDialog | `components/DocumentDetailDialog/` | Діалог деталей документа |
| ErrorBoundary | `components/ErrorBoundary/` | Обробка помилок React |

### FileUpload — drag-and-drop

```typescript
// Підтримувані MIME типи та ліміт розміру
const ALLOWED_TYPES = ['text/csv', 'application/json', 'text/plain'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

// Drag-and-drop zone + hidden file input
<Box
  onClick={() => inputRef.current?.click()}
  onDragOver={handleDragOver}
  onDrop={handleDrop}
>
  {isUploading ? <CircularProgress /> : <CloudUploadIcon />}
  <Typography>Drag & drop або натисніть для завантаження</Typography>
</Box>
```

### StrategySelect — вибір стратегії

```typescript
const strategies = ['replace', 'redact', 'hash', 'encrypt', 'synthetic', 'pseudonymize', 'generalize'];

<Select value={value} onChange={(e) => onChange(e.target.value)}>
  {strategies.map(s => <MenuItem key={s} value={s}>{t(`strategies.${s}`)}</MenuItem>)}
</Select>
```

### LoadingSpinner

```typescript
interface Props {
  fullPage?: boolean;  // true = на всю сторінку, false = inline
  message?: string;    // Текст під спінером
}

<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <CircularProgress />
  <Typography>{message ?? t('common.loading')}</Typography>
</Box>
```

### ErrorBoundary

```typescript
// Class component (обов'язково для Error Boundary в React)
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReset={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}
```
