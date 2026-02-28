# AutoRia Clone — Комплексний план реалізації

## 1. Огляд проєкту

**Замовлення:** Платформа для продажу автомобілів (аналог AutoRia).

**Ключові вимоги замовника:**
- Витримувати у десятки разів більше навантаження ніж поточний сайт (2010 року)
- Максимальна гнучкість: часто дописувати, переписувати, вимикати елементи системи
- Розгортання на AWS (контейнеризація)
- 4 ролі + система пермішинів з урахуванням майбутніх автосалонів
- 2 типи акаунтів (Базовий / Преміум)
- Оголошення з перевіркою на нецензурну лексику
- Статистика для преміум-акаунтів
- Конвертація валют через курс ПриватБанку

**Шаблон проєкту:** Базується на структурі [may-2024-drf](https://github.com/OktenSchool/may-2024-drf) — Django 5.x + DRF, MySQL через Docker, `configs/` як пакет налаштувань, API-only архітектура (без admin, sessions, CSRF).

---

## 2. Дизайн-рішення (Design Decisions)

### 2.1. База даних

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) MySQL 8** | Відповідає шаблону `may-2024-drf`; широка підтримка на AWS (RDS); добре підходить для реляційних даних | Менше фіч ніж PostgreSQL (немає `ArrayField`, `JSONField` нативно менш потужний) | |
| **B) PostgreSQL 16** | Потужніші типи даних; краща підтримка full-text search; кращі можливості для аналітики; `django.contrib.postgres` дає додаткові фічі | Відхилення від шаблону | **Рекомендовано** |

**Обґрунтування рекомендації:** PostgreSQL краще підходить для аналітичних запитів (середні ціни по регіонах), full-text search (пошук оголошень), і має кращу підтримку в AWS RDS. Шаблон використовує MySQL, але перехід на PostgreSQL потребує мінімальних змін.

---

### 2.2. Автентифікація

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) JWT (Simple JWT)** | Stateless; ідеально для API; добре масштабується; стандарт індустрії для DRF | Потрібна логіка refresh-токенів; складніше відкликати токени | **Рекомендовано** |
| **B) Token Auth (DRF built-in)** | Простіше в реалізації; вбудовано в DRF | Stateful (токени в БД); гірше масштабується; один токен на юзера | |
| **C) Session Auth** | Найпростіше | Не підходить для API-only; потребує CSRF | |

---

### 2.3. Система ролей та пермішинів

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) Кастомна система пермішинів** | Повний контроль; гнучкість; легко адаптувати під автосалони; чистіша архітектура | Більше коду для написання | **Рекомендовано** |
| **B) django-guardian (object-level permissions)** | Готове рішення для object-level permissions | Оверкіл для поточних вимог; додаткова залежність | |
| **C) django-role-permissions** | Готова система ролей | Менш гнучко для розширення під автосалони | |

**Деталі рекомендованого підходу (Опція A):**
- Модель `Permission` з кодовими назвами (`can_create_listing`, `can_ban_user`, `can_manage_dealership` тощо)
- Модель `Role` зі зв'язком M2M до `Permission`
- Юзер має зв'язок до `Role`
- Кастомні DRF permission classes що перевіряють пермішини з ролі
- У майбутньому автосалон (`Dealership`) матиме свої ролі та пермішини

---

### 2.4. Архітектура Django-додатків (App Structure)

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) Монолітні apps за доменами** | Простіше; менше файлів; легше для невеликої команди | Менш модульно | |
| **B) Розбиття на мікро-apps** | Максимальна модульність; кожен app — окрема відповідальність; легше вимикати/замінювати | Більше boilerplate | **Рекомендовано** |

**Рекомендована структура apps (Опція B):**
```
apps/
├── auth/            # Реєстрація, логін, JWT
├── users/           # Профілі, акаунти (базовий/преміум)
├── roles/           # Ролі та пермішини
├── cars/            # Марки, моделі авто
├── listings/        # Оголошення
├── currency/        # Курси валют (ПриватБанк)
├── statistics/      # Статистика переглядів, середні ціни
├── notifications/   # Email-повідомлення (менеджерам, продавцям)
├── dealerships/     # Автосалони (заготовка на майбутнє)
```

---

### 2.5. Фільтрація нецензурної лексики

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) Власний словник + regex** | Повний контроль; простота; легко додавати слова; без зовнішніх залежностей | Потрібно підтримувати словник | **Рекомендовано** |
| **B) `better-profanity` бібліотека** | Готове рішення; підтримка англійської | Обмежена підтримка української; залежність від третьої сторони | |
| **C) Зовнішній API (Google Perspective тощо)** | Найточніше; ML-based | Зовнішня залежність; latency; вартість | |

**Рекомендація:** Опція A з можливістю розширення. Словник нецензурних слів у конфігурації (БД або файл). Regex-паттерни для варіацій написання. Легко розширити до ML-підходу у майбутньому.

---

### 2.6. Курс валют — отримання та зберігання

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) Celery + Redis (periodic task)** | Надійне планування; повторення при помилках; стандартне рішення для DRF | Потрібен Redis та Celery worker | **Рекомендовано** |
| **B) Django management command + cron** | Простіше; менше інфраструктури | Менш надійне; немає retry; складніше моніторити | |
| **C) APScheduler** | Вбудовано в процес Django | Менш надійне; не масштабується | |

---

### 2.7. Зберігання та доступ до медіа-файлів (фото авто)

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) AWS S3 + django-storages** | Нативно для AWS; масштабується; CDN через CloudFront | Потребує AWS акаунт; вартість | **Рекомендовано для production** |
| **B) Локальне зберігання (MEDIA_ROOT)** | Простіше для розробки; без витрат | Не масштабується; не підходить для контейнерів | **Для етапу розробки** |

**Рекомендація:** Почати з локального зберігання, додати S3 через `django-storages` перед контейнеризацією. Конфігурація через змінні середовища.

---

### 2.8. Email-повідомлення

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) AWS SES** | Нативно для AWS; масштабується; дешево | Потребує верифікацію домену | Для production |
| **B) Django Console Backend** | Для розробки; без зовнішніх залежностей | Не відправляє реальні листи | **Для етапу розробки** |
| **C) SMTP (Gmail/Mailtrap)** | Простий компроміс | Обмеження на кількість листів | Для тестування |

---

### 2.9. Контейнеризація

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) Docker Compose (DB + App + Redis + Celery)** | Повне рішення для локальної розробки та деплою | Складніший docker-compose | **Рекомендовано** |
| **B) Тільки DB в Docker (як у шаблоні)** | Простіше | Не відповідає вимозі контейнеризації для AWS | |

---

### 2.10. Документація API

| Опція | Переваги | Недоліки | Рекомендація |
|-------|----------|----------|--------------|
| **A) drf-spectacular (OpenAPI/Swagger)** | Автогенерація; інтерактивна документація; стандарт | Додаткова залежність | **Рекомендовано** |
| **B) Тільки Postman колекція** | Мінімально; відповідає вимозі | Немає автоматичної синхронізації з кодом | Обов'язково (за вимогою) |

**Рекомендація:** Обидва варіанти одночасно — Swagger для розробки, Postman для перевірки.

---

## 3. Технічний стек (фінальний)

| Компонент | Технологія | Версія |
|-----------|-----------|--------|
| Мова | Python | 3.12+ |
| Фреймворк | Django | 5.1.x |
| REST API | Django REST Framework | 3.15.x |
| База даних | PostgreSQL (або MySQL 8 за бажанням) | 16+ (або 8+) |
| Кеш / Брокер | Redis | 7.x |
| Task Queue | Celery | 5.4.x |
| Автентифікація | djangorestframework-simplejwt | 5.x |
| Медіа-файли | django-storages + boto3 (production) | latest |
| API Docs | drf-spectacular | latest |
| Контейнеризація | Docker + Docker Compose | latest |
| Email | django (console/SMTP для dev) | — |
| Фільтрація | django-filter | latest |
| CORS | django-cors-headers | latest |

### Повний `requirements.txt` (орієнтовний)

```
Django==5.1.4
djangorestframework==3.15.2
djangorestframework-simplejwt==5.4.0
django-cors-headers==4.6.0
django-filter==24.3
django-storages==1.14.4
drf-spectacular==0.28.0
psycopg2-binary==2.9.10
celery==5.4.0
redis==5.2.1
boto3==1.35.0
requests==2.32.3
Pillow==11.1.0
python-dotenv==1.0.1
gunicorn==23.0.0
```

---

## 4. Архітектура бази даних

### 4.1. ER-діаграма (текстова)

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│    Permission     │     │       Role       │     │       User       │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ id               │     │ id               │     │ id               │
│ codename         │◄────│ permissions (M2M)│     │ email            │
│ name             │     │ name             │     │ password         │
│ description      │     │ description      │     │ first_name       │
└──────────────────┘     └──────────────────┘     │ last_name        │
                                │                  │ phone            │
                                │                  │ role (FK) ───────┤
                                │                  │ account_type     │
                                │                  │ avatar           │
                                │                  │ is_active        │
                                │                  │ is_staff         │
                                │                  │ created_at       │
                                │                  │ updated_at       │
                                │                  └──────────────────┘
                                │                           │
                                │                           │
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│    CarBrand      │     │    CarModel      │     │    Listing       │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ id               │     │ id               │     │ id               │
│ name             │◄────│ brand (FK)       │     │ seller (FK User) │
│ is_active        │     │ name             │     │ car_brand (FK)   │
└──────────────────┘     │ is_active        │     │ car_model (FK)   │
                         └──────────────────┘     │ year             │
                                                  │ price            │
┌──────────────────┐                              │ currency (choice)│
│  CurrencyRate    │                              │ price_usd        │
├──────────────────┤                              │ price_eur        │
│ id               │                              │ price_uah        │
│ ccy (USD/EUR)    │                              │ exchange_rate    │
│ base_ccy (UAH)   │                              │ original_currency│
│ buy              │                              │ original_price   │
│ sale             │                              │ description      │
│ fetched_at       │                              │ region           │
│ created_at       │                              │ city             │
└──────────────────┘                              │ status           │
                                                  │ edit_attempts    │
┌──────────────────┐                              │ photos (media)   │
│  ListingView     │                              │ created_at       │
├──────────────────┤                              │ updated_at       │
│ id               │                              └──────────────────┘
│ listing (FK)     │
│ viewed_at        │     ┌──────────────────┐     ┌──────────────────┐
│ viewer_ip        │     │   Dealership     │     │ DealershipMember │
└──────────────────┘     ├──────────────────┤     ├──────────────────┤
                         │ id               │     │ id               │
┌──────────────────┐     │ name             │     │ user (FK)        │
│ BrandRequest     │     │ description      │     │ dealership (FK)  │
├──────────────────┤     │ logo             │     │ role (FK Role)   │
│ id               │     │ address          │     │ joined_at        │
│ user (FK)        │     │ owner (FK User)  │     └──────────────────┘
│ brand_name       │     │ is_active        │
│ model_name       │     │ created_at       │
│ status           │     └──────────────────┘
│ created_at       │
└──────────────────┘
```

### 4.2. Моделі (деталі)

#### `User` (кастомна модель, extends `AbstractBaseUser`)
| Поле | Тип | Опис |
|------|-----|------|
| email | EmailField (unique) | Логін |
| password | CharField | Хеш пароля |
| first_name | CharField | Ім'я |
| last_name | CharField | Прізвище |
| phone | CharField | Телефон |
| role | ForeignKey(Role) | Роль на платформі |
| account_type | CharField (choices: basic/premium) | Тип акаунту |
| avatar | ImageField | Фото профілю |
| is_active | BooleanField | Чи активний |
| is_staff | BooleanField | Для адмін-панелі |
| created_at | DateTimeField | Дата реєстрації |
| updated_at | DateTimeField | Дата оновлення |

#### `Role`
| Поле | Тип | Опис |
|------|-----|------|
| name | CharField (unique) | buyer / seller / manager / admin |
| description | TextField | Опис ролі |
| permissions | ManyToManyField(Permission) | Набір пермішинів |

#### `Permission`
| Поле | Тип | Опис |
|------|-----|------|
| codename | CharField (unique) | Наприклад: `can_create_listing` |
| name | CharField | Людиночитана назва |
| description | TextField | Опис пермішину |

#### `CarBrand`
| Поле | Тип | Опис |
|------|-----|------|
| name | CharField (unique) | Назва марки (BMW, Daewoo...) |
| is_active | BooleanField | Чи активна |

#### `CarModel`
| Поле | Тип | Опис |
|------|-----|------|
| brand | ForeignKey(CarBrand) | Марка |
| name | CharField | Назва моделі (X5, Lanos...) |
| is_active | BooleanField | Чи активна |

#### `Listing` (Оголошення)
| Поле | Тип | Опис |
|------|-----|------|
| seller | ForeignKey(User) | Продавець |
| car_brand | ForeignKey(CarBrand) | Марка |
| car_model | ForeignKey(CarModel) | Модель |
| year | IntegerField | Рік випуску |
| description | TextField | Опис авто |
| price | DecimalField | Ціна в оригінальній валюті |
| currency | CharField (USD/EUR/UAH) | Валюта ціни |
| original_price | DecimalField | Ціна яку вказав юзер |
| original_currency | CharField | Валюта яку вказав юзер |
| price_usd | DecimalField | Ціна в USD |
| price_eur | DecimalField | Ціна в EUR |
| price_uah | DecimalField | Ціна в UAH |
| exchange_rate_id | ForeignKey(CurrencyRate) | Курс на момент розрахунку |
| region | CharField | Регіон продажу |
| city | CharField | Місто |
| mileage | IntegerField | Пробіг |
| engine_type | CharField | Тип двигуна |
| status | CharField | active/inactive/pending/needs_edit |
| edit_attempts | IntegerField (default=0) | Кількість спроб редагування |
| created_at | DateTimeField | Дата створення |
| updated_at | DateTimeField | Дата оновлення |

#### `ListingPhoto`
| Поле | Тип | Опис |
|------|-----|------|
| listing | ForeignKey(Listing) | Оголошення |
| photo | ImageField | Фото |
| is_primary | BooleanField | Головне фото |
| created_at | DateTimeField | Дата завантаження |

#### `ListingView` (для статистики Premium)
| Поле | Тип | Опис |
|------|-----|------|
| listing | ForeignKey(Listing) | Оголошення |
| viewed_at | DateTimeField | Час перегляду |
| viewer_ip | GenericIPAddressField | IP переглядача (опціонально) |

#### `CurrencyRate`
| Поле | Тип | Опис |
|------|-----|------|
| ccy | CharField | Валюта (USD, EUR) |
| base_ccy | CharField | Базова валюта (UAH) |
| buy | DecimalField | Курс купівлі |
| sale | DecimalField | Курс продажу |
| fetched_at | DateTimeField | Коли отримано курс |

#### `BrandRequest` (запит на додавання марки/моделі)
| Поле | Тип | Опис |
|------|-----|------|
| user | ForeignKey(User) | Хто запросив |
| brand_name | CharField | Назва марки |
| model_name | CharField (nullable) | Назва моделі (якщо є) |
| status | CharField | pending/approved/rejected |
| admin_comment | TextField (nullable) | Коментар адміна |
| created_at | DateTimeField | Дата запиту |

#### `Dealership` (заготовка на майбутнє)
| Поле | Тип | Опис |
|------|-----|------|
| name | CharField | Назва автосалону |
| description | TextField | Опис |
| logo | ImageField | Логотип |
| address | TextField | Адреса |
| owner | ForeignKey(User) | Власник |
| is_active | BooleanField | Чи активний |
| created_at | DateTimeField | Дата створення |

#### `DealershipMembership` (заготовка на майбутнє)
| Поле | Тип | Опис |
|------|-----|------|
| user | ForeignKey(User) | Користувач |
| dealership | ForeignKey(Dealership) | Автосалон |
| role | ForeignKey(Role) | Роль в автосалоні |
| joined_at | DateTimeField | Дата приєднання |

---

## 5. Структура проєкту

```
autoria-clone/
├── configs/                        # Django проєкт (налаштування)
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── asgi.py
│   └── celery.py                  # Налаштування Celery
│
├── apps/                           # Django-додатки
│   ├── __init__.py
│   │
│   ├── auth/                      # Автентифікація
│   │   ├── __init__.py
│   │   ├── serializers.py         # RegisterSerializer, LoginSerializer
│   │   ├── views.py               # RegisterView, LoginView, TokenRefreshView
│   │   └── urls.py
│   │
│   ├── users/                     # Користувачі
│   │   ├── __init__.py
│   │   ├── models.py             # CustomUser, CustomUserManager
│   │   ├── serializers.py        # UserSerializer, ProfileSerializer
│   │   ├── views.py              # UserViewSet
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── filters.py
│   │
│   ├── roles/                     # Ролі та пермішини
│   │   ├── __init__.py
│   │   ├── models.py             # Role, Permission
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── permissions.py        # Кастомні DRF permissions
│   │   ├── urls.py
│   │   └── seed.py               # Seed-дані для ролей/пермішинів
│   │
│   ├── cars/                      # Марки та моделі авто
│   │   ├── __init__.py
│   │   ├── models.py             # CarBrand, CarModel, BrandRequest
│   │   ├── serializers.py
│   │   ├── views.py              # CarBrandViewSet, CarModelViewSet, BrandRequestView
│   │   ├── urls.py
│   │   └── filters.py
│   │
│   ├── listings/                  # Оголошення
│   │   ├── __init__.py
│   │   ├── models.py             # Listing, ListingPhoto
│   │   ├── serializers.py        # ListingSerializer, ListingCreateSerializer
│   │   ├── views.py              # ListingViewSet
│   │   ├── urls.py
│   │   ├── filters.py            # Фільтрація за маркою, моделлю, ціною, регіоном
│   │   ├── validators.py         # ProfanityValidator
│   │   └── services.py           # ListingService (бізнес-логіка)
│   │
│   ├── currency/                  # Курси валют
│   │   ├── __init__.py
│   │   ├── models.py             # CurrencyRate
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── tasks.py              # Celery task: fetch_currency_rates
│   │   └── services.py           # PrivatBankAPI, CurrencyConverter
│   │
│   ├── statistics/                # Статистика (Premium)
│   │   ├── __init__.py
│   │   ├── models.py             # ListingView
│   │   ├── serializers.py
│   │   ├── views.py              # StatisticsView
│   │   ├── urls.py
│   │   └── services.py           # Розрахунок середніх цін, переглядів
│   │
│   ├── notifications/             # Email-повідомлення
│   │   ├── __init__.py
│   │   ├── services.py           # EmailService
│   │   ├── tasks.py              # Celery tasks: send_manager_notification
│   │   └── templates/            # Email-шаблони
│   │       ├── listing_rejected.html
│   │       └── brand_request.html
│   │
│   └── dealerships/               # Автосалони (заготовка)
│       ├── __init__.py
│       ├── models.py             # Dealership, DealershipMembership
│       ├── serializers.py
│       ├── views.py
│       └── urls.py
│
├── core/                           # Спільні утиліти
│   ├── __init__.py
│   ├── pagination.py              # Стандартна пагінація
│   ├── permissions.py             # Базові permission mixins
│   └── middleware.py              # Кастомний middleware (якщо потрібно)
│
├── fixtures/                       # Початкові дані
│   ├── roles_permissions.json     # Ролі та пермішини
│   ├── car_brands.json            # Марки авто
│   └── car_models.json            # Моделі авто
│
├── profanity/                      # Словник нецензурної лексики
│   └── words.txt                  # Список заборонених слів
│
├── postman/                        # Postman колекція
│   └── AutoRia_Clone.postman_collection.json
│
├── manage.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env                            # Змінні середовища (шаблон)
├── .env.example                    # Приклад .env
├── .gitignore
├── .dockerignore
└── README.md                       # Інструкція запуску
```

---

## 6. API Endpoints

### 6.1. Автентифікація (`/api/auth/`)

| Метод | URL | Опис | Доступ |
|-------|-----|------|--------|
| POST | `/api/auth/register/` | Реєстрація покупця/продавця | Всі |
| POST | `/api/auth/login/` | Логін (отримання JWT) | Всі |
| POST | `/api/auth/refresh/` | Оновлення JWT токена | Авторизовані |
| POST | `/api/auth/logout/` | Вихід (blacklist токен) | Авторизовані |

### 6.2. Користувачі (`/api/users/`)

| Метод | URL | Опис | Доступ |
|-------|-----|------|--------|
| GET | `/api/users/me/` | Мій профіль | Авторизовані |
| PATCH | `/api/users/me/` | Оновити профіль | Авторизовані |
| GET | `/api/users/` | Список користувачів | Менеджер/Адмін |
| GET | `/api/users/{id}/` | Профіль користувача | Менеджер/Адмін |
| PATCH | `/api/users/{id}/ban/` | Заблокувати юзера | Менеджер/Адмін |
| PATCH | `/api/users/{id}/unban/` | Розблокувати юзера | Менеджер/Адмін |
| POST | `/api/users/upgrade-premium/` | Купити преміум | Продавець |

### 6.3. Ролі та пермішини (`/api/roles/`) — тільки Admin

| Метод | URL | Опис | Доступ |
|-------|-----|------|--------|
| GET | `/api/roles/` | Список ролей | Адмін |
| POST | `/api/roles/` | Створити роль | Адмін |
| GET | `/api/roles/{id}/` | Деталі ролі | Адмін |
| PATCH | `/api/roles/{id}/` | Оновити роль | Адмін |
| GET | `/api/permissions/` | Список пермішинів | Адмін |
| POST | `/api/users/create-manager/` | Створити менеджера | Адмін |

### 6.4. Марки та моделі авто (`/api/cars/`)

| Метод | URL | Опис | Доступ |
|-------|-----|------|--------|
| GET | `/api/cars/brands/` | Список марок | Всі |
| POST | `/api/cars/brands/` | Додати марку | Адмін |
| GET | `/api/cars/brands/{id}/models/` | Моделі марки | Всі |
| POST | `/api/cars/brands/{id}/models/` | Додати модель | Адмін |
| POST | `/api/cars/brand-requests/` | Запит на нову марку/модель | Продавець |
| GET | `/api/cars/brand-requests/` | Список запитів | Менеджер/Адмін |
| PATCH | `/api/cars/brand-requests/{id}/` | Обробити запит | Адмін |

### 6.5. Оголошення (`/api/listings/`)

| Метод | URL | Опис | Доступ |
|-------|-----|------|--------|
| GET | `/api/listings/` | Список оголошень (з фільтрацією) | Всі |
| POST | `/api/listings/` | Створити оголошення | Продавець |
| GET | `/api/listings/{id}/` | Деталі оголошення | Всі |
| PATCH | `/api/listings/{id}/` | Редагувати оголошення | Автор |
| DELETE | `/api/listings/{id}/` | Видалити оголошення | Автор/Менеджер/Адмін |
| GET | `/api/listings/my/` | Мої оголошення | Продавець |
| PATCH | `/api/listings/{id}/deactivate/` | Деактивувати оголошення | Менеджер/Адмін |

### 6.6. Статистика (`/api/statistics/`) — Premium

| Метод | URL | Опис | Доступ |
|-------|-----|------|--------|
| GET | `/api/statistics/listings/{id}/` | Статистика оголошення | Premium-продавець (автор) |
| GET | `/api/statistics/listings/{id}/views/` | Перегляди (день/тиждень/місяць) | Premium-продавець (автор) |
| GET | `/api/statistics/listings/{id}/avg-price/` | Середня ціна (регіон + Україна) | Premium-продавець (автор) |

### 6.7. Валюти (`/api/currency/`)

| Метод | URL | Опис | Доступ |
|-------|-----|------|--------|
| GET | `/api/currency/rates/` | Поточні курси валют | Всі |

### 6.8. Автосалони (`/api/dealerships/`) — заготовка

| Метод | URL | Опис | Доступ |
|-------|-----|------|--------|
| GET | `/api/dealerships/` | Список автосалонів | Всі |
| POST | `/api/dealerships/` | Створити автосалон | Авторизовані |

---

## 7. Бізнес-логіка (ключові флоу)

### 7.1. Створення оголошення

```
Продавець -> POST /api/listings/
    │
    ├── Перевірка акаунту:
    │   ├── Базовий: Чи є вже активне оголошення? -> Якщо так: 403
    │   └── Преміум: Без обмежень
    │
    ├── Валідація даних (марка, модель, рік, ціна, валюта)
    │
    ├── Перевірка на нецензурну лексику (description):
    │   ├── Чисто -> status = "active" -> Опублікувати
    │   └── Знайдено -> status = "needs_edit" -> edit_attempts = 0
    │
    ├── Конвертація валюти:
    │   ├── Отримати поточний курс з CurrencyRate
    │   ├── Розрахувати price_usd, price_eur, price_uah
    │   └── Зберегти exchange_rate_id та original_price, original_currency
    │
    └── Зберегти оголошення
```

### 7.2. Редагування оголошення (після відмови через нецензурну лексику)

```
Продавець -> PATCH /api/listings/{id}/
    │
    ├── Перевірка: status == "needs_edit"?
    │   └── Ні -> Звичайне редагування (якщо status == "active")
    │
    ├── edit_attempts < 3?
    │   ├── Так -> Перевірка на нецензурну лексику
    │   │   ├── Чисто -> status = "active", edit_attempts не скидається
    │   │   └── Знайдено -> edit_attempts += 1
    │   │       └── edit_attempts == 3?
    │   │           ├── Ні -> status = "needs_edit" (повторити)
    │   │           └── Так -> status = "inactive"
    │   │               └── Відправити email менеджеру (Celery task)
    │   └── Ні -> 403 "Вичерпано ліміт спроб редагування"
```

### 7.3. Оновлення курсу валют (щоденно)

```
Celery Beat (раз на добу, о 10:00 UTC)
    │
    ├── Запит до API ПриватБанку:
    │   GET https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5
    │
    ├── Парсинг відповіді (USD, EUR до UAH)
    │
    ├── Збереження нового CurrencyRate
    │
    └── Оновлення цін у всіх активних оголошеннях
        (перерахунок price_usd, price_eur, price_uah)
```

### 7.4. Перегляд оголошення (лічильник)

```
Будь-хто -> GET /api/listings/{id}/
    │
    ├── Віддати дані оголошення
    │
    └── Створити запис ListingView (async, не блокує відповідь)
        ├── listing_id
        ├── viewed_at = now()
        └── viewer_ip (опціонально)
```

### 7.5. Статистика для Premium

```
Premium-продавець -> GET /api/statistics/listings/{id}/
    │
    ├── Перевірка: account_type == "premium"? -> Ні: 403
    ├── Перевірка: listing.seller == request.user? -> Ні: 403
    │
    ├── Підрахунок переглядів:
    │   ├── Загальна кількість
    │   ├── За сьогодні (viewed_at >= today)
    │   ├── За тиждень (viewed_at >= today - 7 days)
    │   └── За місяць (viewed_at >= today - 30 days)
    │
    ├── Середня ціна по регіону:
    │   └── AVG(price_uah) WHERE region == listing.region AND car_brand == listing.car_brand AND car_model == listing.car_model AND status == "active"
    │
    └── Середня ціна по Україні:
        └── AVG(price_uah) WHERE car_brand == listing.car_brand AND car_model == listing.car_model AND status == "active"
```

---

## 8. Система ролей та пермішинів (деталі)

### 8.1. Початкові ролі

| Роль | Опис |
|------|------|
| **buyer** | Покупець — перегляд оголошень, зв'язок з продавцем |
| **seller** | Продавець — створення та управління оголошеннями |
| **manager** | Менеджер — модерація, бан юзерів, перевірка оголошень |
| **admin** | Адміністратор — повний доступ |

### 8.2. Початкові пермішини

| Codename | Опис | Buyer | Seller | Manager | Admin |
|----------|------|-------|--------|---------|-------|
| `can_view_listings` | Перегляд оголошень | ✅ | ✅ | ✅ | ✅ |
| `can_create_listing` | Створення оголошення | ❌ | ✅ | ❌ | ✅ |
| `can_edit_own_listing` | Редагування свого оголошення | ❌ | ✅ | ❌ | ✅ |
| `can_delete_own_listing` | Видалення свого оголошення | ❌ | ✅ | ❌ | ✅ |
| `can_delete_any_listing` | Видалення будь-якого оголошення | ❌ | ❌ | ✅ | ✅ |
| `can_deactivate_listing` | Деактивація оголошення | ❌ | ❌ | ✅ | ✅ |
| `can_ban_user` | Блокування користувача | ❌ | ❌ | ✅ | ✅ |
| `can_unban_user` | Розблокування користувача | ❌ | ❌ | ✅ | ✅ |
| `can_view_users` | Перегляд списку користувачів | ❌ | ❌ | ✅ | ✅ |
| `can_create_manager` | Створення менеджера | ❌ | ❌ | ❌ | ✅ |
| `can_manage_roles` | Управління ролями | ❌ | ❌ | ❌ | ✅ |
| `can_manage_brands` | Управління марками/моделями | ❌ | ❌ | ❌ | ✅ |
| `can_review_brand_requests` | Перегляд запитів на марки | ❌ | ❌ | ✅ | ✅ |
| `can_request_brand` | Запит на додавання марки | ❌ | ✅ | ❌ | ✅ |
| `can_view_statistics` | Перегляд статистики (Premium) | ❌ | ✅* | ❌ | ✅ |
| `can_manage_dealership` | Управління автосалоном | ❌ | ❌ | ❌ | ✅ |

*\* — тільки для Premium-акаунту*

### 8.3. Реалізація DRF Permission Classes

```python
# apps/roles/permissions.py

class HasPermission:
    """Фабрика permission classes"""
    def __init__(self, codename):
        self.codename = codename

    def __call__(self):
        codename = self.codename
        class PermissionClass(BasePermission):
            def has_permission(self, request, view):
                if not request.user.is_authenticated:
                    return False
                return request.user.role.permissions.filter(
                    codename=codename
                ).exists()
        return PermissionClass

# Використання у views:
class ListingViewSet(ModelViewSet):
    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated(), HasPermission('can_create_listing')()]
        if self.action == 'destroy':
            return [IsAuthenticated(), HasPermission('can_delete_any_listing')()]
        return [AllowAny()]
```

---

## 9. Docker та контейнеризація

### 9.1. `Dockerfile`

```dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput 2>/dev/null || true

EXPOSE 8000

CMD ["gunicorn", "configs.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
```

### 9.2. `docker-compose.yml`

```yaml
services:
  db:
    image: postgres:16
    env_file:
      - .env
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: on-failure
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: on-failure

  app:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./media:/app/media
    restart: on-failure
    command: >
      sh -c "python manage.py migrate &&
             python manage.py loaddata fixtures/*.json 2>/dev/null;
             gunicorn configs.wsgi:application --bind 0.0.0.0:8000 --workers 3"

  celery:
    build: .
    env_file:
      - .env
    depends_on:
      - redis
      - db
    command: celery -A configs worker -l info
    restart: on-failure

  celery-beat:
    build: .
    env_file:
      - .env
    depends_on:
      - redis
      - db
    command: celery -A configs beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
    restart: on-failure

volumes:
  postgres_data:
```

### 9.3. `.env` (приклад)

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
POSTGRES_DB=autoria_clone
POSTGRES_USER=autoria_user
POSTGRES_PASSWORD=autoria_password
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Redis
REDIS_URL=redis://redis:6379/0

# Celery
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

# Email
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

# AWS (production)
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_STORAGE_BUCKET_NAME=
# AWS_S3_REGION_NAME=
```

---

## 10. Етапи реалізації

### Етап 1: Фундамент (базова інфраструктура)
1. Ініціалізація проєкту Django з структурою `configs/`
2. Налаштування `docker-compose.yml` (PostgreSQL + Redis)
3. Налаштування `settings.py` (DB, DRF, JWT, Celery)
4. Створення `.env`, `.env.example`, `.gitignore`, `.dockerignore`
5. Налаштування Celery з Redis

### Етап 2: Ролі та автентифікація
1. Створення app `roles` — моделі `Permission`, `Role`
2. Створення app `users` — кастомна модель `User` (AbstractBaseUser)
3. Створення app `auth` — реєстрація, логін, JWT
4. Seed-дані для ролей та пермішинів (fixtures)
5. Кастомні DRF permission classes
6. Endpoint для створення менеджера (тільки Admin)

### Етап 3: Марки та моделі авто
1. Створення app `cars` — моделі `CarBrand`, `CarModel`
2. CRUD для марок та моделей (тільки Admin)
3. Система запитів на додавання марки (`BrandRequest`)
4. Seed-дані з популярними марками та моделями

### Етап 4: Курси валют
1. Створення app `currency` — модель `CurrencyRate`
2. Сервіс для API ПриватБанку
3. Celery task для щоденного оновлення курсів
4. Endpoint для перегляду поточних курсів

### Етап 5: Оголошення
1. Створення app `listings` — моделі `Listing`, `ListingPhoto`
2. Валідатор нецензурної лексики
3. Логіка обмеження для базового акаунту (1 оголошення)
4. Конвертація цін при створенні оголошення
5. Флоу редагування (3 спроби)
6. Фільтрація та пагінація списку оголошень
7. Email-повідомлення менеджеру при 3-х невдалих спробах

### Етап 6: Статистика (Premium)
1. Створення app `statistics` — модель `ListingView`
2. Запис переглядів при GET оголошення
3. Endpoint статистики (перегляди за день/тиждень/місяць)
4. Розрахунок середньої ціни по регіону та Україні
5. Перевірка Premium-акаунту

### Етап 7: Автосалони (заготовка)
1. Створення app `dealerships` — моделі `Dealership`, `DealershipMembership`
2. Базові endpoints (CRUD)
3. Зв'язок з системою ролей

### Етап 8: Контейнеризація та документація
1. Написання `Dockerfile`
2. Оновлення `docker-compose.yml` (app + celery + beat)
3. Тестування повного запуску через Docker Compose
4. Написання `README.md` з інструкціями запуску
5. Створення Postman колекції з усіма endpoints
6. Заповнення Postman колекції мок-даними (credentials, приклади запитів)

### Етап 9: Фінальна перевірка
1. Клонувати проєкт з нуля і перевірити запуск
2. Пройти всі flow через Postman
3. Перевірити всі ролі та пермішини
4. Перевірити конвертацію валют
5. Перевірити фільтр нецензурної лексики
6. Перевірити статистику (Premium)

---

## 11. Postman колекція — структура

```
AutoRia Clone/
├── Auth/
│   ├── Register Buyer
│   ├── Register Seller
│   ├── Login (отримання JWT)
│   ├── Refresh Token
│   └── Logout
│
├── Users/
│   ├── Get My Profile
│   ├── Update My Profile
│   ├── List Users (Manager/Admin)
│   ├── Ban User (Manager/Admin)
│   ├── Unban User (Manager/Admin)
│   ├── Create Manager (Admin)
│   └── Upgrade to Premium
│
├── Roles & Permissions (Admin)/
│   ├── List Roles
│   ├── Create Role
│   ├── Update Role
│   └── List Permissions
│
├── Cars/
│   ├── List Brands
│   ├── List Models by Brand
│   ├── Create Brand (Admin)
│   ├── Create Model (Admin)
│   ├── Request New Brand (Seller)
│   ├── List Brand Requests (Manager/Admin)
│   └── Approve/Reject Brand Request (Admin)
│
├── Listings/
│   ├── List All Listings (with filters)
│   ├── Get Listing Details
│   ├── Create Listing (Seller)
│   ├── Edit Listing (Author)
│   ├── Delete Listing (Author/Manager/Admin)
│   ├── My Listings (Seller)
│   ├── Deactivate Listing (Manager/Admin)
│   └── Create Listing with Profanity (test 3 attempts flow)
│
├── Statistics (Premium)/
│   ├── Get Listing Statistics
│   ├── Get Views (day/week/month)
│   ├── Get Average Price by Region
│   └── Get Average Price Ukraine
│
├── Currency/
│   └── Get Current Rates
│
└── Dealerships/
    ├── List Dealerships
    └── Create Dealership
```

**Мок-дані для Postman:**
- Адмін: `admin@autoria.ua` / `Admin123!`
- Менеджер: `manager@autoria.ua` / `Manager123!`
- Продавець (базовий): `seller@autoria.ua` / `Seller123!`
- Продавець (преміум): `premium@autoria.ua` / `Premium123!`
- Покупець: `buyer@autoria.ua` / `Buyer123!`

---

## 12. README.md — план змісту

1. **Опис проєкту** — що це і для чого
2. **Технічний стек** — перелік технологій
3. **Вимоги** — Python 3.12+, Docker, Docker Compose
4. **Швидкий старт (Docker)** — `docker-compose up --build`
5. **Локальний запуск (без Docker)**
   - Створення venv
   - Встановлення залежностей
   - Налаштування `.env`
   - Міграції
   - Seed-дані
   - Запуск Redis, Celery, Django
6. **Credentials для доступу** — логіни/паролі всіх тестових юзерів
7. **Postman** — як імпортувати та використовувати колекцію
8. **API документація** — посилання на Swagger UI
9. **Структура проєкту** — опис apps та їхніх відповідальностей
10. **Docker** — опис сервісів та credentials

---

## 13. Підготовка до AWS

Хоча повний деплой на AWS не входить у першочергові завдання, архітектура готується з урахуванням:

| Компонент | AWS Сервіс |
|-----------|-----------|
| Django App | ECS Fargate або EC2 |
| PostgreSQL | RDS |
| Redis | ElastiCache |
| Media (фото) | S3 + CloudFront |
| Email | SES |
| Secrets | Secrets Manager |
| CI/CD | CodePipeline або GitHub Actions |
| Моніторинг | CloudWatch |

Контейнеризація через Docker Compose є першим кроком до деплою на AWS ECS.

---

## 14. Ключові технічні рішення

1. **AbstractBaseUser** замість AbstractUser — повний контроль над полями юзера
2. **Сервісний шар** (`services.py`) — бізнес-логіка окремо від views
3. **Fixtures** для seed-даних — ролі, пермішини, марки авто
4. **Celery Beat** для періодичних задач — курс валют
5. **django-filter** для фільтрації оголошень
6. **Окремі serializers** для створення та перегляду (CreateSerializer vs DetailSerializer)
7. **Signals** — мінімальне використання, перевага сервісному шару
8. **Custom management commands** — для ініціалізації даних (`python manage.py seed_data`)
