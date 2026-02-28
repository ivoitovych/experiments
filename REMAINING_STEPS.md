# Етапи 10-11: Інструкція для завершення проєкту

## Поточний стан

Етапи 1-9 виконані та запушені:

| Етап | Опис | Статус |
|------|------|--------|
| 1 | Фундамент (Django, Docker, settings, Celery) | ✅ Готово |
| 2 | Ролі, автентифікація, користувачі, seed_data | ✅ Готово |
| 3 | Марки та моделі авто (CRUD, brand requests) | ✅ Готово |
| 4 | Курси валют (PrivatBank API, Celery task) | ✅ Готово |
| 5 | Оголошення (CRUD, profanity, ціни, фільтри) | ✅ Готово |
| 6 | Статистика Premium (перегляди, середні ціни) | ✅ Готово |
| 7 | Автосалони (заготовка) | ✅ Готово |
| 8 | Тестування (35 тестів, всі проходять) | ✅ Готово |
| 9 | README.md + Postman колекція (40 кроків) | ✅ Готово |

---

## Етап 10: Cloud DB та фінальна підготовка

### 10.1. Налаштування cloud PostgreSQL (Neon — рекомендовано)

1. **Зареєструватися** на [neon.tech](https://neon.tech)
2. **Створити проєкт** (назва: `autoria-clone`)
3. **Створити базу** (або використати `neondb` за замовчуванням)
4. **Скопіювати credentials** зі сторінки Connection Details:
   - Host (наприклад: `ep-cool-name-123456.eu-central-1.aws.neon.tech`)
   - Database name
   - Username (role)
   - Password

### 10.2. Оновити `.env` для cloud DB

Замінити блок `Database` у файлі `.env`:

```env
# Database — Cloud (Neon)
POSTGRES_DB=neondb
POSTGRES_USER=your_neon_username
POSTGRES_PASSWORD=your_neon_password
POSTGRES_HOST=ep-cool-name-123456.eu-central-1.aws.neon.tech
POSTGRES_PORT=5432
POSTGRES_SSL=require
```

> **Увага:** `POSTGRES_SSL=require` — обов'язково для cloud DB. Settings.py вже підтримує це:
> ```python
> if os.environ.get('POSTGRES_SSL', '') == 'require':
>     DATABASES['default']['OPTIONS'] = {'sslmode': 'require'}
> ```

### 10.3. Перевірити міграції та seed-дані на cloud DB

```bash
# З локальною машиною (без Docker)
# Переконатися що .env вказує на cloud DB

python manage.py migrate
python manage.py seed_data
```

Перевірити що все пройшло без помилок. Seed-дані створять:
- 16 permissions
- 4 ролі (buyer, seller, manager, admin)
- 1 адмін-користувач (`admin@autoria.ua` / `Admin123!`)
- 25 регіонів (24 області + м. Київ)
- 15 марок авто з моделями

### 10.4. Створити ОКРЕМИЙ репозиторій для здачі

Вимога контрольної: *"Фінальний код має бути в ОКРЕМОМУ репозиторії на головній гілці (main/master)"*

1. **Створити новий репозиторій** на GitHub (наприклад: `autoria-clone`)
2. **Скопіювати файли проєкту** (без `.git`, без `PLAN.md`, без `INSTRUCTIONS.md`, без `REMAINING_STEPS.md`):

```bash
# Створити тимчасову директорію
mkdir /tmp/autoria-clone
cd /home/user/experiments

# Скопіювати всі файли проєкту
cp -r apps/ configs/ core/ fixtures/ profanity/ postman/ /tmp/autoria-clone/
cp manage.py requirements.txt Dockerfile docker-compose.yml /tmp/autoria-clone/
cp .env.example .gitignore .dockerignore README.md /tmp/autoria-clone/

# Також скопіювати .env (з cloud DB credentials)
cp .env /tmp/autoria-clone/

# Ініціалізувати git
cd /tmp/autoria-clone
git init
git add .
git commit -m "AutoRia Clone — car marketplace platform"

# Додати remote та запушити
git remote add origin https://github.com/YOUR_USERNAME/autoria-clone.git
git branch -M main
git push -u origin main
```

> **Важливо:** Один пуш — без повторних пушів після здачі.

### 10.5. Що включити у фінальний репозиторій

| Включити | НЕ включати |
|----------|------------|
| `apps/` | `PLAN.md` |
| `configs/` | `INSTRUCTIONS.md` |
| `core/` | `REMAINING_STEPS.md` |
| `profanity/` | `.git/` (з experiments) |
| `postman/` | `media/` (створюється автоматично) |
| `manage.py` | `db.sqlite3` |
| `requirements.txt` | `__pycache__/` |
| `Dockerfile` | |
| `docker-compose.yml` | |
| `.env` (з cloud credentials) | |
| `.env.example` | |
| `.gitignore` | |
| `.dockerignore` | |
| `README.md` | |

---

## Етап 11: Фінальна перевірка

### 11.1. Клонувати з нуля та перевірити запуск

```bash
# В новій директорії
git clone https://github.com/YOUR_USERNAME/autoria-clone.git
cd autoria-clone

# Docker запуск
docker-compose up --build
```

Переконатися що:
- Всі 5 сервісів стартують (db, redis, app, celery, celery-beat)
- Міграції проходять автоматично
- Seed-дані завантажуються
- API доступний на `http://localhost:8000`

### 11.2. Пройти Postman flow (40 кроків)

1. Імпортувати `postman/AutoRia_Clone.postman_collection.json` в Postman
2. Переконатися що `base_url` = `http://localhost:8000`
3. Виконати кроки послідовно (1-40):

| Кроки | Що перевіряємо |
|-------|----------------|
| 1-2 | Анонімний доступ до оголошень та марок |
| 3-6 | Адмін: логін, ролі, пермішини, створення менеджера |
| 7-8 | Реєстрація продавця та покупця |
| 9-15 | Продавець: марки, моделі, запит на нову марку → адмін схвалює |
| 16-20 | Створення оголошення, анонімний перегляд, ліміт Basic (403) |
| 21-22 | Апгрейд до Premium, створення 2-го оголошення |
| 23-26 | Profanity flow: 3 невдалі спроби → inactive → email менеджеру |
| 27-29 | Статистика Premium: перегляди, середні ціни |
| 30-31 | Покупець намагається статистику → 403 |
| 32-36 | Менеджер: pending оголошення, активація, бан/розбан |
| 37-40 | Курси валют, мої оголошення, оновлення токена, вихід |

### 11.3. Чекліст фінальної перевірки

- [ ] Docker Compose стартує всі 5 сервісів без помилок
- [ ] Міграції проходять автоматично
- [ ] `seed_data` завантажує ролі, пермішини, адміна, регіони, марки
- [ ] Реєстрація buyer/seller працює
- [ ] Логін повертає JWT токен
- [ ] Анонімний доступ до оголошень (AllowAny)
- [ ] Basic акаунт: максимум 1 оголошення
- [ ] Premium: необмежена кількість оголошень
- [ ] Profanity filter працює (needs_edit → 3 спроби → inactive)
- [ ] Email менеджеру при inactive (console backend — перевірити в логах celery)
- [ ] Конвертація валют (USD/EUR/UAH) при створенні оголошення
- [ ] Статистика доступна тільки Premium-продавцю (автору)
- [ ] Buyer отримує 403 при запиті статистики
- [ ] Менеджер може бан/розбан користувача
- [ ] Менеджер може activate/deactivate оголошення
- [ ] Адмін може створити менеджера
- [ ] Адмін може manage ролі та марки
- [ ] Фільтрація оголошень працює (brand, model, region, price, year, engine)
- [ ] Cloud DB працює (seed-дані та оголошення зберігаються)
- [ ] Swagger UI доступний на `/api/docs/`
- [ ] Курси валют endpoint працює (`/api/currency/rates`)
- [ ] Тести проходять (`python manage.py test apps/` — 35 тестів)
- [ ] README.md містить інструкції та credentials
- [ ] Postman колекція містить всі 40 кроків

### 11.4. Типові проблеми та рішення

| Проблема | Рішення |
|----------|---------|
| Cloud DB не з'єднується | Перевірити `POSTGRES_SSL=require` в `.env` |
| Seed-дані не створюються | Запустити `python manage.py seed_data` вручну |
| Celery не працює | Перевірити що Redis запущений та `CELERY_BROKER_URL` вірний |
| Курси валют порожні | Запустити `python manage.py shell` → `from apps.currency.tasks import fetch_currency_rates; fetch_currency_rates()` |
| Postman: 401 Unauthorized | Перевірити що токен скопійовано з відповіді login |
| Docker: порт зайнятий | Змінити порти в `docker-compose.yml` (5433→5434, 8000→8001) |
| Profanity не працює | Перевірити що файл `profanity/words.txt` існує та не порожній |
