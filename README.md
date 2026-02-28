# AutoRia Clone

Car marketplace platform (AutoRia analog) built with Django 5.1 + Django REST Framework.

## Tech Stack

- **Backend:** Django 5.1.4, Django REST Framework 3.15.2
- **Database:** PostgreSQL 16
- **Cache / Broker:** Redis 7
- **Task Queue:** Celery 5.4 + Celery Beat
- **Auth:** JWT (djangorestframework-simplejwt) with token blacklist
- **API Docs:** drf-spectacular (Swagger UI)
- **Containerization:** Docker, Docker Compose

## Requirements

- Python 3.12+
- Docker & Docker Compose
- Git

## Quick Start (Docker)

```bash
git clone <repo-url>
cd autoria-clone

# Copy env file
cp .env.example .env

# Build and run all services
docker-compose up --build
```

The API will be available at `http://localhost:8000`.

On first run, the app automatically:
1. Runs database migrations
2. Seeds roles, permissions, admin user, regions, car brands & models

## Local Development (without Docker)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env: set POSTGRES_HOST=localhost, POSTGRES_PORT=5433

# Start PostgreSQL and Redis (via Docker)
docker-compose up -d db redis

# Run migrations
python manage.py migrate

# Seed data (idempotent)
python manage.py seed_data

# Start Celery worker (separate terminal)
celery -A configs worker -l info

# Start Celery Beat (separate terminal)
celery -A configs beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler

# Start Django dev server
python manage.py runserver
```

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@autoria.ua` | `Admin123!` |
| Manager | Created via `POST /api/users/create-manager` | — |
| Seller (basic) | Register via `POST /api/auth/register` with `role_name: seller` | — |
| Buyer | Register via `POST /api/auth/register` with `role_name: buyer` | — |

The admin user is created automatically by `seed_data`.

## API Documentation

Swagger UI: `http://localhost:8000/api/docs/`

OpenAPI Schema: `http://localhost:8000/api/schema/`

## API Endpoints

### Authentication (`/api/auth/`)
| Method | URL | Description | Access |
|--------|-----|-------------|--------|
| POST | `/api/auth/register` | Register buyer/seller | Public |
| POST | `/api/auth/login` | Login (get JWT) | Public |
| POST | `/api/auth/refresh` | Refresh JWT token | Authenticated |
| POST | `/api/auth/logout` | Logout (blacklist token) | Authenticated |

### Users (`/api/users/`)
| Method | URL | Description | Access |
|--------|-----|-------------|--------|
| GET | `/api/users/me` | My profile | Authenticated |
| PATCH | `/api/users/me` | Update profile | Authenticated |
| GET | `/api/users/` | List users | Manager/Admin |
| GET | `/api/users/{id}` | User details | Manager/Admin |
| PATCH | `/api/users/{id}/ban` | Ban user | Manager/Admin |
| PATCH | `/api/users/{id}/unban` | Unban user | Manager/Admin |
| POST | `/api/users/create-manager` | Create manager | Admin |
| POST | `/api/users/upgrade-premium` | Upgrade to premium (seller only) | Seller |

### Cars (`/api/cars/`)
| Method | URL | Description | Access |
|--------|-----|-------------|--------|
| GET | `/api/cars/brands` | List brands | Public |
| POST | `/api/cars/brands` | Add brand | Admin |
| GET | `/api/cars/brands/{id}/models` | List models by brand | Public |
| POST | `/api/cars/brands/{id}/models` | Add model | Admin |
| POST | `/api/cars/brand-requests` | Request new brand/model | Seller |
| GET | `/api/cars/brand-requests` | List requests | Manager/Admin |
| PATCH | `/api/cars/brand-requests/{id}` | Approve/reject request | Admin |

### Listings (`/api/listings/`)
| Method | URL | Description | Access |
|--------|-----|-------------|--------|
| GET | `/api/listings/` | List listings (with filters) | Public |
| POST | `/api/listings/` | Create listing | Seller |
| GET | `/api/listings/{id}` | Listing details (+ seller contacts) | Public |
| PATCH | `/api/listings/{id}` | Edit listing | Author |
| DELETE | `/api/listings/{id}` | Delete listing | Author/Manager/Admin |
| GET | `/api/listings/my` | My listings | Seller |
| GET | `/api/listings/pending` | Pending listings | Manager/Admin |
| PATCH | `/api/listings/{id}/deactivate` | Deactivate listing | Manager/Admin |
| PATCH | `/api/listings/{id}/activate` | Activate listing | Manager/Admin |

### Statistics (`/api/statistics/`) — Premium
| Method | URL | Description | Access |
|--------|-----|-------------|--------|
| GET | `/api/statistics/listings/{id}` | Listing statistics | Premium seller (owner) |
| GET | `/api/statistics/listings/{id}/views` | View counts | Premium seller (owner) |
| GET | `/api/statistics/listings/{id}/avg-price` | Average prices | Premium seller (owner) |

### Currency (`/api/currency/`)
| Method | URL | Description | Access |
|--------|-----|-------------|--------|
| GET | `/api/currency/rates` | Current exchange rates | Public |

### Dealerships (`/api/dealerships/`) — Stub
| Method | URL | Description | Access |
|--------|-----|-------------|--------|
| GET | `/api/dealerships/` | List dealerships | Public |
| POST | `/api/dealerships/` | Create dealership | Authenticated |

## Listing Filters

`GET /api/listings/?car_brand=1&car_model=2&region=3&price_min=5000&price_max=30000&year_min=2015&year_max=2024&engine_type=diesel`

## Project Structure

```
autoria-clone/
├── configs/              # Django project settings
│   ├── settings.py       # Main settings (DB, DRF, JWT, Celery)
│   ├── urls.py           # Root URL configuration
│   ├── celery.py         # Celery configuration
│   ├── wsgi.py / asgi.py
│   └── __init__.py       # Celery app import
│
├── apps/                 # Django applications
│   ├── authentication/   # Register, login, JWT, logout
│   ├── users/            # User profiles, management, premium
│   ├── roles/            # Custom Role + Permission system
│   ├── cars/             # Car brands, models, brand requests
│   ├── listings/         # Listings CRUD, profanity check, price conversion
│   ├── currency/         # PrivatBank rates, conversion service
│   ├── statistics/       # Premium view counts, average prices
│   ├── notifications/    # Email notifications (manager alerts)
│   └── dealerships/      # Dealership stub (future feature)
│
├── core/                 # Shared utilities
│   ├── pagination.py     # StandardPagination (page_size=20)
│   └── permissions.py    # HasPermission factory, IsOwnerOrReadOnly
│
├── profanity/words.txt   # Ukrainian profanity word list
├── postman/              # Postman collection
├── docker-compose.yml    # 5 services: db, redis, app, celery, celery-beat
├── Dockerfile
├── requirements.txt
└── manage.py
```

## Docker Services

| Service | Image | Port |
|---------|-------|------|
| db | postgres:16 | 5433:5432 |
| redis | redis:7-alpine | 6379:6379 |
| app | custom (Dockerfile) | 8000:8000 |
| celery | custom (Dockerfile) | — |
| celery-beat | custom (Dockerfile) | — |

## Running Tests

```bash
python manage.py test apps/ --verbosity=2
```

35 tests covering: profanity filter, currency conversion, role permissions, auth flow, user management, premium upgrade, ban/unban.
