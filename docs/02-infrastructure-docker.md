# Інфраструктура та Docker

[← Огляд проєкту](./01-project-overview.md) | [Бекенд: Запуск та конфігурація →](./03-backend-bootstrap-config.md)

---

## Docker Compose

Проєкт використовує Docker Compose для оркестрації трьох інфраструктурних сервісів. Бекенд та фронтенд запускаються окремо на хості (не в контейнерах).

```yaml
# docker-compose.yml — Інфраструктурні сервіси проєкту
version: '3.8'

services:
  # ─── MySQL 8 ──────────────────────────────────────────────────────────────
  # Реляційна база даних для зберігання користувачів, документів, jobs
  mysql:
    image: mysql:8.0                          # Офіційний образ MySQL 8
    container_name: clinical-studio-mysql
    restart: unless-stopped                   # Автоматичний перезапуск
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}     # Пароль root (з .env)
      MYSQL_DATABASE: ${DB_NAME}              # Ім'я бази даних
      MYSQL_USER: ${DB_USERNAME}              # Користувач для додатку
      MYSQL_PASSWORD: ${DB_PASSWORD}          # Пароль користувача
    ports:
      - '3307:3306'                           # Хост:3307 → Контейнер:3306
    volumes:
      - mysql_data:/var/lib/mysql             # Персистентне зберігання даних
    healthcheck:
      test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost']
      timeout: 20s
      retries: 10

  # ─── Presidio Analyzer ────────────────────────────────────────────────────
  # Microsoft Presidio: розпізнавання PII/PHI сутностей у тексті
  # Використовує ML-моделі spaCy для NER (Named Entity Recognition)
  # REST API: POST /analyze → повертає масив {entity_type, score, start, end}
  presidio-analyzer:
    image: mcr.microsoft.com/presidio-analyzer:latest
    container_name: clinical-studio-presidio-analyzer
    restart: unless-stopped
    ports:
      - '5001:3000'                           # Хост:5001 → Контейнер:3000

  # ─── Presidio Anonymizer ──────────────────────────────────────────────────
  # Microsoft Presidio: анонімізація тексту на основі результатів аналізу
  # Підтримує стратегії: replace, redact, hash, encrypt, mask
  # REST API: POST /anonymize → приймає текст + результати аналізу → анонімізований текст
  presidio-anonymizer:
    image: mcr.microsoft.com/presidio-anonymizer:latest
    container_name: clinical-studio-presidio-anonymizer
    restart: unless-stopped
    ports:
      - '5002:3000'                           # Хост:5002 → Контейнер:3000

# Іменований волюм для збереження даних MySQL між перезапусками
volumes:
  mysql_data:
    driver: local
```

### Схема портів

```
Хост-машина                    Docker контейнери
─────────────                  ─────────────────
:3000  (бекенд NestJS)    →   працює на хості
:5173  (фронтенд Vite)    →   працює на хості
:3307  ──────────────────────► mysql:3306
:5001  ──────────────────────► presidio-analyzer:3000
:5002  ──────────────────────► presidio-anonymizer:3000
```

---

## Змінні оточення бекенду

Файл `backend/.env.example` — шаблон, який потрібно скопіювати в `backend/.env`:

```bash
# ─── Додаток ─────────────────────────────────────────────────────────────
NODE_ENV=development           # Режим: development | production
PORT=3000                      # Порт HTTP сервера

# ─── База даних (MySQL) ─────────────────────────────────────────────────
DB_HOST=localhost               # Хост MySQL
DB_PORT=3306                    # Порт MySQL (УВАГА: docker-compose маппить на 3307!)
DB_USERNAME=clinical_user       # Користувач БД
DB_PASSWORD=change_me_in_prod   # Пароль БД (ЗАМІНІТЬ у продакшн!)
DB_NAME=clinical_studio         # Назва бази даних
DB_SYNCHRONIZE=true             # true = TypeORM автоматично синхронізує схему
DB_LOGGING=false                # true = логування SQL запитів у консоль

# ─── JWT ─────────────────────────────────────────────────────────────────
JWT_SECRET=replace_with_a_long_random_string_at_least_64_chars  # Секрет підпису JWT
JWT_EXPIRES_IN=1h               # Час життя токену (1 година)

# ─── Magic Link ──────────────────────────────────────────────────────────
MAGIC_LINK_EXPIRES_IN=900       # Час життя магічного посилання (секунди, 15 хвилин)
MAIL_FROM=noreply@clinicaldatastudio.com  # Email відправника

# ─── Шифрування ──────────────────────────────────────────────────────────
ENCRYPTION_KEY=change_me_16chars  # AES-128 ключ (16 символів) для Presidio encrypt

# ─── Presidio сервіси ────────────────────────────────────────────────────
PRESIDIO_ANALYZER_URL=http://localhost:5001    # URL Presidio Analyzer
PRESIDIO_ANONYMIZER_URL=http://localhost:5002  # URL Presidio Anonymizer

# ─── CORS ────────────────────────────────────────────────────────────────
CORS_ORIGIN=http://localhost:5173  # Дозволене джерело для CORS
```

---

## Змінні оточення фронтенду

Файл `frontend/.env.example`:

```bash
# URL бекенд API (без кінцевого слешу)
VITE_API_BASE_URL=http://localhost:3000/api

# Назва додатку (відображається у заголовку)
VITE_APP_NAME=Clinical Data Studio
```

---

## Інструкції запуску

```bash
# 1. Скопіювати .env файли
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 2. Запустити Docker контейнери (MySQL + Presidio)
docker compose up -d

# 3. Перевірити стан контейнерів
docker compose ps
# Presidio завантажує ML-моделі spaCy при першому запуску (~30 секунд)

# 4. Запустити бекенд
cd backend && npm install && npm run start:dev

# 5. Запустити фронтенд (в окремому терміналі)
cd frontend && npm install && npm run dev

# 6. Відкрити додаток
# Фронтенд: http://localhost:5173
# Swagger:   http://localhost:3000/api/docs
```

### Зупинка та очищення

```bash
# Зупинити контейнери (зберегти дані)
docker compose down

# Зупинити контейнери та ВИДАЛИТИ дані (volume)
docker compose down -v
```
