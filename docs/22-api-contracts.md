# API контракти

[← i18n та тема](./21-frontend-i18n-theming.md) | [Тестування →](./23-testing-strategy.md)

---

## Таблиця всіх ендпоінтів

| Метод | URL | Auth | Опис |
|-------|-----|------|------|
| POST | `/api/auth/magic-link` | Ні | Запит магічного посилання |
| POST | `/api/auth/verify` | Ні | Обмін токену на JWT |
| GET | `/api/auth/me` | JWT | Профіль поточного користувача |
| POST | `/api/de-identification/analyze` | JWT | Аналіз тексту (Presidio) |
| POST | `/api/de-identification/anonymize` | JWT | Анонімізація тексту |
| POST | `/api/de-identification/upload` | JWT | Завантаження файлу |
| GET | `/api/de-identification/documents` | JWT | Список документів (пагінація) |
| GET | `/api/de-identification/documents/:id` | JWT | Один документ |
| POST | `/api/de-identification/jobs` | JWT | Створити Job |
| GET | `/api/de-identification/jobs` | JWT | Список Jobs |
| GET | `/api/de-identification/jobs/:id` | JWT | Деталі Job |
| PATCH | `/api/de-identification/jobs/:id` | JWT | Оновити wizardState |
| POST | `/api/de-identification/jobs/:id/run` | JWT | Запустити pipeline |
| GET | `/api/users` | JWT | Список користувачів |
| GET | `/api/users/me` | JWT | Поточний користувач |
| GET | `/api/users/:id` | JWT | Користувач за ID |
| PATCH | `/api/users/:id` | JWT | Оновити користувача |
| DELETE | `/api/users/:id` | JWT | Видалити користувача |
| GET | `/api/dashboard` | JWT | Метрики Dashboard |
| POST | `/api/synthetic-data/generate` | JWT | Генерація синтетичних даних |

---

## Приклади запитів/відповідей

### POST /api/auth/magic-link

```json
// Request
{ "email": "user@hospital.org" }

// Response (200 — завжди однаковий для анти-enumeration)
{ "message": "If an account exists for this email, a magic link has been sent." }
```

### POST /api/auth/verify

```json
// Request
{ "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }

// Response (200)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "uuid", "email": "user@hospital.org", "role": "analyst" }
}

// Error (401)
{ "statusCode": 401, "message": "Token has expired", "code": "TOKEN_EXPIRED" }
```

### POST /api/de-identification/analyze

```json
// Request
{
  "text": "Patient John Smith (SSN: 123-45-6789) was admitted on 03/15/2024",
  "language": "en",
  "entities": ["PERSON", "US_SSN", "DATE_TIME"],
  "minScore": 0.7
}

// Response (200)
[
  { "entity_type": "PERSON", "start": 8, "end": 18, "score": 0.95 },
  { "entity_type": "US_SSN", "start": 25, "end": 36, "score": 0.99 },
  { "entity_type": "DATE_TIME", "start": 55, "end": 65, "score": 0.88 }
]
```

### POST /api/de-identification/anonymize

```json
// Request
{
  "text": "Patient John Smith (SSN: 123-45-6789)...",
  "analyzerResults": [/* масив з /analyze */],
  "strategy": "replace",
  "framework": "hipaa",
  "hipaaMethod": "safe_harbor",
  "language": "en"
}

// Response (201) — створений Document
{
  "id": "doc-uuid",
  "originalText": "Patient John Smith...",
  "anonymizedText": "Patient <PERSON> (SSN: <US_SSN>)...",
  "entityCount": 3,
  "framework": "hipaa",
  "status": "completed"
}
```

---

## Формат помилок

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "BAD_REQUEST",
  "timestamp": "2024-03-15T10:00:00.000Z",
  "path": "/api/de-identification/analyze"
}
```

## JWT Authorization

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

JWT payload: `{ sub: "user-uuid", email: "user@hospital.org", role: "analyst", iat, exp }`
