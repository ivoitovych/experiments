# Фронтенд: i18n та тема

[← Hooks та утиліти](./20-frontend-hooks-utils.md) | [API контракти →](./22-api-contracts.md)

---

## i18n — інтернаціоналізація

### Конфігурація i18next

```typescript
// frontend/src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)           // Завантаження перекладів через HTTP
  .use(LanguageDetector)      // Автовизначення мови браузера
  .use(initReactI18next)      // Інтеграція з React
  .init({
    fallbackLng: 'en',        // Якщо мова не знайдена → англійська
    debug: true,              // Логування в dev
    interpolation: { escapeValue: false }, // React вже захищає від XSS
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Шлях до файлів перекладу
    },
  });
```

### Структура перекладів

```
public/locales/en/translation.json
├── common        ← loading, error, success, close
├── nav           ← dashboard, deIdentify, syntheticData, logout
├── auth          ← emailLabel, sendLink, tokenExpired, tokenInvalid
├── landing       ← hero, features, compliance, contact
├── dashboard     ← title, metrics
├── deIdentify    ← steps, frameworks, strategies, entities
├── processing    ← title, progress, retry
├── results       ← title, entities, exportPdf, auditTrail
└── syntheticData ← title, generate, recordCount
```

### Використання в компонентах

```typescript
const { t } = useTranslation();
<Typography>{t('deIdentify.steps.framework')}</Typography>  // "Framework Selection"
<Button>{t('common.next')}</Button>                          // "Next"
```

---

## MUI Theme — кастомізація Material UI

```typescript
// frontend/src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0',           // Основний синій (медичний)
      light: '#42A5F5',
      dark: '#0D47A1',
    },
    secondary: {
      main: '#00897B',           // Бірюзовий (безпека)
    },
    success: { main: '#2E7D32' },
    warning: { main: '#F57F17' },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontWeight: 700 },
    h4: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
      },
    },
  },
});
```
