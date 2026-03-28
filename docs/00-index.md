# Clinical Data De-Identification & Synthetic Data Studio — Документація

## Про проєкт

Clinical Data De-Identification & Synthetic Data Studio — це повнофункціональний веб-застосунок для де-ідентифікації клінічних текстових даних відповідно до стандартів HIPAA та GDPR. Проєкт побудовано на основі React 18 (фронтенд) та NestJS 10 (бекенд) з використанням Microsoft Presidio як ядра для розпізнавання та анонімізації персональних даних (PHI/PII).

Система підтримує кілька регуляторних фреймворків — HIPAA (Safe Harbor та Expert Determination), GDPR, UK DPA та Swiss FADP — і надає покроковий візард для налаштування процесу де-ідентифікації. Користувачі можуть завантажувати клінічні тексти у форматах CSV, JSON або TXT, обирати стратегію анонімізації (заміна, редакція, хешування, шифрування тощо) та отримувати детальні результати з аудиторським слідом відповідності.

Крім того, застосунок пропонує генерацію синтетичних даних, інтерактивну панель моніторингу (Dashboard) із візуалізацією статистики через Recharts, а також повноцінну систему автентифікації через Magic Link без паролів. Уся інфраструктура контейнеризована за допомогою Docker Compose (MySQL 8, Presidio Analyzer, Presidio Anonymizer), що забезпечує швидке розгортання та ізоляцію сервісів.

---

## Зміст документації

| №  | Файл | Опис |
|----|------|------|
| 00 | [00-index.md](./00-index.md) | Головна сторінка документації |
| 01 | [01-project-overview.md](./01-project-overview.md) | Огляд проєкту та технологічний стек |
| 02 | [02-infrastructure-docker.md](./02-infrastructure-docker.md) | Інфраструктура та Docker |
| 03 | [03-backend-bootstrap-config.md](./03-backend-bootstrap-config.md) | Бекенд: Запуск та конфігурація |
| 04 | [04-backend-database.md](./04-backend-database.md) | Бекенд: База даних та ORM |
| 05 | [05-backend-auth-module.md](./05-backend-auth-module.md) | Бекенд: Автентифікація та Magic Link |
| 06 | [06-backend-de-identification.md](./06-backend-de-identification.md) | Бекенд: Модуль де-ідентифікації |
| 07 | [07-backend-jobs-lifecycle.md](./07-backend-jobs-lifecycle.md) | Бекенд: Життєвий цикл Job |
| 08 | [08-backend-other-modules.md](./08-backend-other-modules.md) | Бекенд: Users, Dashboard, Synthetic Data |
| 09 | [09-backend-common-utilities.md](./09-backend-common-utilities.md) | Бекенд: Утиліти, фільтри, інтерцептори |
| 10 | [10-frontend-bootstrap-routing.md](./10-frontend-bootstrap-routing.md) | Фронтенд: Запуск та маршрутизація |
| 11 | [11-frontend-state-management.md](./11-frontend-state-management.md) | Фронтенд: Redux та управління станом |
| 12 | [12-frontend-services-api.md](./12-frontend-services-api.md) | Фронтенд: API клієнти та сервіси |
| 13 | [13-frontend-pages-auth-landing.md](./13-frontend-pages-auth-landing.md) | Фронтенд: Автентифікація та лендінг |
| 14 | [14-frontend-pages-dashboard.md](./14-frontend-pages-dashboard.md) | Фронтенд: Dashboard |
| 15 | [15-frontend-pages-de-identify.md](./15-frontend-pages-de-identify.md) | Фронтенд: De-Identify Wizard |
| 16 | [16-frontend-pages-processing-results.md](./16-frontend-pages-processing-results.md) | Фронтенд: Processing та Results |
| 17 | [17-frontend-pages-synthetic.md](./17-frontend-pages-synthetic.md) | Фронтенд: Synthetic Data |
| 18 | [18-frontend-components.md](./18-frontend-components.md) | Фронтенд: Компоненти |
| 19 | [19-frontend-layouts.md](./19-frontend-layouts.md) | Фронтенд: Layouts |
| 20 | [20-frontend-hooks-utils.md](./20-frontend-hooks-utils.md) | Фронтенд: Hooks, утиліти, константи, типи |
| 21 | [21-frontend-i18n-theming.md](./21-frontend-i18n-theming.md) | Фронтенд: i18n та тема |
| 22 | [22-api-contracts.md](./22-api-contracts.md) | API контракти |
| 23 | [23-testing-strategy.md](./23-testing-strategy.md) | Тестування |

---

## Швидкий старт

### Крок 1: Встановлення передумов

Переконайтеся, що на вашій машині встановлено:

- **Node.js 20+** — середовище виконання JavaScript
- **Docker** та **Docker Compose** — для контейнеризації інфраструктурних сервісів (MySQL, Presidio)

### Крок 2: Налаштування змінних оточення

```bash
# Скопіюйте файли прикладів змінних оточення
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Відредагуйте backend/.env — встановіть безпечний JWT_SECRET та паролі БД
# Детальний опис кожної змінної: див. 02-infrastructure-docker.md
```

### Крок 3: Запуск інфраструктури (MySQL + Presidio)

```bash
# Піднімаємо MySQL 8, Presidio Analyzer та Presidio Anonymizer у фоновому режимі
docker compose up -d

# Перевіряємо стан контейнерів (Presidio завантажує ML-моделі ~30 секунд при першому запуску)
docker compose ps
```

### Крок 4: Запуск бекенду

```bash
cd backend
npm install          # Встановлення залежностей
npm run start:dev    # Запуск у режимі розробки з автоперезавантаженням (hot-reload)
# API:     http://localhost:3000
# Swagger: http://localhost:3000/api/docs
```

### Крок 5: Запуск фронтенду

```bash
cd frontend
npm install          # Встановлення залежностей
npm run dev          # Запуск Vite dev-сервера
# Застосунок: http://localhost:5173
```

---

## Корисні посилання

| Ресурс | URL | Опис |
|--------|-----|------|
| Swagger UI | `http://localhost:3000/api/docs` | Інтерактивна документація REST API |
| OpenAPI JSON | `http://localhost:3000/api/docs-json` | OpenAPI специфікація у форматі JSON |
| Фронтенд | `http://localhost:5173` | Веб-інтерфейс застосунку |
| MySQL | `localhost:3307` | Зовнішній порт бази даних (контейнер: 3306) |
| Presidio Analyzer | `http://localhost:5001` | REST API аналізатора сутностей |
| Presidio Anonymizer | `http://localhost:5002` | REST API анонімізатора тексту |
