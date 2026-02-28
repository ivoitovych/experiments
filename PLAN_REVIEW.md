# Рев'ю плану AutoRia Clone — перехресна перевірка з вимогами

> **Статус: Всі знайдені проблеми (включаючи зовнішні рев'ю) виправлені у PLAN.md.**

## Методологія

Кожна вимога з ТЗ перевірена на покриття у PLAN.md. Додатково враховані знахідки з двох зовнішніх рев'ю.

- **OK** — повністю покрито
- **GAP** → **FIXED** — було пропущено, виправлено
- **ISSUE** → **FIXED** — було з помилкою, виправлено

---

## 1. Ролі (Розділ ТЗ: пункт 1)

| Вимога | Статус | Деталі |
|--------|--------|--------|
| Покупець — "гуляє" по платформі | **OK** | Роль `buyer`, perm `can_view_listings` |
| Покупець — може зв'язатися з продавцем або автосалоном | **FIXED** | Додано контактні дані продавця (ім'я, телефон) у деталях оголошення |
| Продавець — може продати авто | **OK** | Роль `seller`, perm `can_create_listing` |
| Менеджер — банить людей | **OK** | `can_ban_user`, `can_unban_user` |
| Менеджер — видаляє невалідні оголошення | **OK** | `can_delete_any_listing`, `can_deactivate_listing` |
| Менеджер — перевіряє підозрілі оголошення | **FIXED** | Додано `GET /api/listings/pending/` та `PATCH .../activate/` |
| Менеджера може створити лише Адміністратор | **OK** | `POST /api/users/create-manager/` з `can_create_manager` |
| Адміністратор — суперюзер | **OK** | Всі пермішини |
| Автосалони у майбутньому | **FIXED** | `Dealership` + `DealershipMembership`; Role.scope (platform/dealership) запобігає конфлікту імен |
| Система пермішинів | **OK** | Кастомна система `Permission` + `Role` |

---

## 2. Типи акаунтів (Розділ ТЗ: пункт 2)

| Вимога | Статус | Деталі |
|--------|--------|--------|
| Базовий — за замовчуванням | **OK** | `account_type` choices: basic/premium, default basic |
| Преміум — купується за гроші | **OK** | `POST /api/users/upgrade-premium/` (тільки seller) |
| Преміум — статистика | **OK** | Endpoints в `/api/statistics/` |
| Преміум — середня ціна по ринку | **OK** | `avg-price` endpoint з фільтром brand+model |
| Преміум — кількість переглядів | **OK** | `views` endpoint з день/тиждень/місяць |

---

## 3. Створення оголошення (Розділ ТЗ: пункт 3)

| Вимога | Статус | Деталі |
|--------|--------|--------|
| Продавець може виставити авто | **OK** | `POST /api/listings/` |
| Базовий — максимум 1 оголошення | **OK** | Перевірка в бізнес-логіці (7.1) |
| Преміум — без обмежень | **OK** | |
| Випадайка з марками | **OK** | `GET /api/cars/brands/` |
| Якщо марки немає — повідомити | **OK** | `POST /api/cars/brand-requests/` |
| Ціна в USD, EUR, UAH | **OK** | `original_price`, `original_currency` |
| Ціни оновлюються раз на день | **OK** | Celery Beat + reprice job (flow 7.3) |
| Вказувати курс | **OK** | `rate_usd_uah`, `rate_eur_uah`, `rate_date` (inline) |
| Яку ціну вказав юзер | **OK** | `original_price`, `original_currency` |
| Profanity check | **OK** | `ProfanityValidator` |
| 3 спроби → inactive → email | **OK** | `edit_attempts` + Celery email task |

---

## 4. Інформація про оголошення (Розділ ТЗ: пункт 4)

| Вимога | Статус | Деталі |
|--------|--------|--------|
| Базовий — НЕ надає інформації | **OK** | 403 для non-premium |
| Преміум — перегляди за день/тиждень/місяць | **OK** | Фільтрація по `viewed_at` |
| Преміум — середня ціна по регіону | **OK** | AVG по region (FK до Region) |
| Преміум — середня ціна по Україні | **OK** | AVG по всіх регіонах |

---

## 5. Deliverables

| Вимога | Статус | Деталі |
|--------|--------|--------|
| README | **OK** | Розділ 12 |
| Postman | **OK** | Розділ 11 + 18 (40 послідовних кроків) |
| Cloud DB | **FIXED** | Розділ 14 (Neon/Supabase/AWS RDS; ElephantSQL видалено — EOL) |
| Окреме репо + main | **FIXED** | Розділ 1 + Етап 10 |

---

## 6. Зведена таблиця всіх виправлень

### Раунд 1 (внутрішнє рев'ю):

| # | Тип | Проблема | Статус |
|---|-----|----------|--------|
| 1 | GAP | Немає зв'язку покупця з продавцем | **FIXED** — контактні дані в деталях |
| 2 | GAP | Немає endpoint для менеджера | **FIXED** — `GET /api/listings/pending/` |
| 3 | GAP | Cloud БД | **FIXED** — розділ 14 + Етап 10 |
| 4 | GAP | Окреме репо | **FIXED** — розділ 1 + Етап 10 |
| 5 | ISSUE | Дублювання полів ціни | **FIXED** — `original_price/currency` only |
| 6 | ISSUE | FK на CurrencyRate | **FIXED** — inline rates |
| 7 | ISSUE | CarModel без unique_together | **FIXED** |
| 8 | ISSUE | Регіони без стандартизації | **FIXED** — модель Region |
| 9 | ISSUE | `apps/auth/` конфлікт | **FIXED** — `apps/authentication/` |
| 10 | ISSUE | django-celery-beat відсутній | **FIXED** |
| 11 | ISSUE | Postman flow не послідовний | **FIXED** — розділ 18 |
| 12 | ISSUE | Відсутність тестів | **FIXED** — розділ 16 + Етап 8 |
| 13 | ISSUE | APPEND_SLASH = False | **FIXED** |
| 14 | GAP | Кешування | **FIXED** — розділ 17 Redis cache |

### Раунд 2 (зовнішні рев'ю):

| # | Тип | Проблема (джерело) | Статус |
|---|-----|----------|--------|
| 15 | P0 | `DEFAULT_PERMISSION_CLASSES = IsAuthenticated` ламає анонімний browse (Review 2, P0.3) | **FIXED** — змінено на `AllowAny`, protected endpoints мають явні permissions |
| 16 | P0 | ElephantSQL EOL — shutdown 27 Jan 2025 (Review 2, fact-check 2.3) | **FIXED** — видалено з опцій, додано примітку |
| 17 | P1 | Role.scope потрібен для автосалонів (Review 2, P1.1) | **FIXED** — `scope` (platform/dealership) + `unique_together('name','scope')` |
| 18 | P1 | Listing status visibility невизначена (Review 2, P1.2) | **FIXED** — матриця видимості статусів додана; `pending` прибрано |
| 19 | P1 | ListingView per-request INSERT не масштабується (Review 2, P1.3) | **FIXED** — Redis INCR + flush варіант описано як рекомендований |
| 20 | P1 | loaddata при кожному старті Docker — ризик дублювання (Review 2, P1.4) | **FIXED** — замінено на `seed_data` management command (get_or_create) |
| 21 | P2 | Не вказано buy чи sale rate (Review 2) | **FIXED** — `sale` rate для конвертації, `coursid=5` (готівковий) |
| 22 | P2 | SSL для cloud Postgres не згаданий (Review 2) | **FIXED** — `sslmode=require` через env var |
| 23 | P2 | Немає anonymous browse кроків у Postman (Review 2) | **FIXED** — кроки 1-2 без токена |
| 24 | P2 | "25 областей" → фактично 24 (Review 2, fact-check 2.4) | **FIXED** — "24 області + м.Київ" |

### З Review 1 (позитивна валідація):

Review 1 підтвердив повну відповідність плану вимогам ТЗ. Жодних фактичних помилок чи протиріч не знайдено. Оцінка: "ready for immediate implementation", "98–100 points".
