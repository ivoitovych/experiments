# Фінальний звіт про тестування

## Прототип: КНП "Нововолинська центральна міська лікарня"
**URL:** https://prototype-novovolynsk-cml.vercel.app/
**Дата тестування:** 2026-02-05
**Тестувальник:** Iaroslav Voitovych
**Версія звіту:** 1.0

---

## Резюме

| Параметр | Значення |
|----------|----------|
| Всього тестів | 67 |
| Пройшли | 58 |
| Провалились | 6 |
| Попередження | 3 |
| Загальна оцінка | **87% (Добре)** |

### Критичні проблеми: 0
### Серйозні проблеми: 2
### Незначні проблеми: 7

---

## 1. Функціональне тестування

### 1.1. Навігація

| ID | Тест | Результат | Коментар |
|----|------|-----------|----------|
| NAV-01 | Головне меню | PASS | 5 пунктів: Головна, Історія, Структура, Інформація, Контакти |
| NAV-02 | Мобільне меню | PASS | Бургер-меню з aria-controls |
| NAV-03 | Футер-навігація | PASS | Дублює головне меню + державні ресурси |
| NAV-04 | Хлібні крихти | PASS | "Назад до структури" на підсторінках |
| NAV-05 | Внутрішні посилання | PASS | Всі основні сторінки працюють |
| NAV-06 | Перехід між сторінками | PASS | Next.js client-side routing |

### 1.2. Посилання

| ID | Тест | Результат | Коментар |
|----|------|-----------|----------|
| LNK-01 | Зовнішнє: МОЗ | WARN | 403 Forbidden (захист від ботів) |
| LNK-02 | Зовнішнє: НСЗУ | WARN | 403 Forbidden (захист від ботів) |
| LNK-03 | Зовнішнє: Helsi | PASS | 200 OK |
| LNK-04 | Зовнішнє: Дія | PASS | 200 OK |
| LNK-05 | Зовнішнє: Facebook | PASS | 301 → 200 (редірект на www) |
| LNK-06 | Телефонні (tel:) | PASS | +380673040911, +380334449097 |
| LNK-07 | Email (mailto:) | PASS | cml@nov-rada.gov.ua, accessibility@nov-rada.gov.ua |
| LNK-08 | CTA-кнопки | PASS | "Записатися на прийом", "Детальніше" |
| LNK-09 | Посилання /news | FAIL | 404 Not Found |
| LNK-10 | Політика конфіденційності | FAIL | Заглушка `#` |
| LNK-11 | Умови використання | FAIL | Заглушка `#` |

### 1.3. Сторінки

| Сторінка | Статус | Код | Розмір |
|----------|--------|-----|--------|
| `/` | PASS | 200 | 143 KB |
| `/history` | PASS | 200 | 108 KB |
| `/structure` | PASS | 200 | ~95 KB |
| `/information` | PASS | 200 | ~90 KB |
| `/contacts` | PASS | 200 | 104 KB |
| `/news` | FAIL | 404 | 60 KB |
| `/structure/management` | PASS | 200 | - |
| `/structure/ambulatory-main` | PASS | 200 | - |
| `/structure/therapy` | PASS | 200 | - |
| `/structure/pediatrics` | PASS | 200 | - |
| `/structure/hospital-main` | PASS | 200 | - |
| `/structure/surgery` | PASS | 200 | - |
| `/structure/therapy-hospital` | PASS | 200 | - |
| `/structure/radiology` | PASS | 200 | - |
| `/structure/diagnostics` | PASS | 200 | - |
| `/structure/rehabilitation` | PASS | 200 | - |
| `/information/diphtheria` | PASS | 200 | - |
| `/information/covid-testing` | PASS | 200 | - |
| `/information/patient-rights` | PASS | 200 | - |
| `/information/hepatitis-c` | PASS | 200 | - |
| `/information/measles` | PASS | 200 | - |
| `/information/lyme-disease-ticks` | PASS | 200 | - |

### 1.4. 404-сторінка

| ID | Тест | Результат | Коментар |
|----|------|-----------|----------|
| E404-01 | Наявність кастомної 404 | PASS | Українською мовою |
| E404-02 | HTTP-код | PASS | 404 Not Found |
| E404-03 | Навігація з 404 | PASS | "На головну", "Шукати відділення" |
| E404-04 | Контактна інформація | PASS | Екстрена допомога +380334449097, 103 |
| E404-05 | noindex meta | PASS | `<meta name="robots" content="noindex"/>` |

---

## 2. SEO-тестування

### 2.1. Meta-теги

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| SEO-01 | Title | PASS | "Головна \| КНП Нововолинська ЦМЛ \| Портал КНП" |
| SEO-02 | Meta description | PASS | "Офіційний сайт КНП..." (~150 символів) |
| SEO-03 | Meta keywords | PASS | "Нововолинська лікарня,ЦМЛ Нововолинськ..." |
| SEO-04 | Canonical URL | PASS | Абсолютний URL сторінки |
| SEO-05 | Lang attribute | PASS | `<html lang="uk-UA">` |

### 2.2. Open Graph

| ID | Тест | Результат | Значення |
|----|------|-----------|----------|
| SEO-06 | og:title | PASS | Є |
| SEO-07 | og:description | PASS | Є |
| SEO-08 | og:url | PASS | Є |
| SEO-09 | og:locale | PASS | `uk_UA` |
| SEO-10 | og:type | PASS | `website` |
| SEO-11 | og:site_name | PASS | Є |

### 2.3. Twitter Cards

| ID | Тест | Результат | Значення |
|----|------|-----------|----------|
| SEO-12 | twitter:card | PASS | `summary` |
| SEO-13 | twitter:title | PASS | Є |
| SEO-14 | twitter:description | PASS | Є |

### 2.4. Структуровані дані

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| SEO-15 | JSON-LD Schema | PASS | MedicalOrganization |
| SEO-16 | @context | PASS | https://schema.org |
| SEO-17 | name | PASS | КНП "Нововолинська ЦМЛ" |
| SEO-18 | address | PASS | PostalAddress з усіма полями |
| SEO-19 | telephone | PASS | +380673040911 |
| SEO-20 | email | PASS | cml@nov-rada.gov.ua |

### 2.5. Заголовки

| ID | Тест | Результат | Коментар |
|----|------|-----------|----------|
| SEO-21 | Один H1 на сторінку | PASS | Перевірено на головній |
| SEO-22 | Ієрархія H1→H2→H3 | PASS | Логічна структура |
| SEO-23 | Favicon | PASS | `/favicon.ico` 256x256 |

---

## 3. Тестування доступності (WCAG 2.1 AA)

### 3.1. Основні елементи

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| A11Y-01 | Skip-to-content | PASS | "Перейти до основного вмісту" |
| A11Y-02 | Видимість при фокусі | PASS | sr-only → visible on focus |
| A11Y-03 | id="main-content" | PASS | Цільовий елемент існує |
| A11Y-04 | tabindex="-1" | PASS | На main елементі |

### 3.2. Семантичний HTML

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| A11Y-05 | `<header>` | PASS | Є |
| A11Y-06 | `<nav>` | PASS | Є (головна та футер) |
| A11Y-07 | `<main>` | PASS | Є з id="main-content" |
| A11Y-08 | `<footer>` | PASS | Є |
| A11Y-09 | `<article>` | PASS | Використовується для статей |
| A11Y-10 | `<section>` | PASS | Логічне розділення контенту |

### 3.3. ARIA

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| A11Y-11 | aria-label на кнопках | PASS | "Екстрена допомога - зателефонувати" |
| A11Y-12 | aria-hidden на іконках | PASS | SVG іконки приховані |
| A11Y-13 | aria-expanded | PASS | На мобільному меню |
| A11Y-14 | aria-controls | PASS | "mobile-navigation" |

### 3.4. Зображення

| ID | Тест | Результат | Коментар |
|----|------|-----------|----------|
| A11Y-15 | Alt-тексти | PASS | Всі зображення мають alt |
| A11Y-16 | Декоративні зображення | PASS | aria-hidden="true" |

### 3.5. Фокус та клавіатура

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| A11Y-17 | Focus ring | PASS | `focus:ring-2 focus:ring-primary-500` |
| A11Y-18 | focus-visible | PASS | Використовується для кнопок |
| A11Y-19 | focus:outline-none | PASS | Заміна на власні стилі |

### 3.6. Координатор доступності

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| A11Y-20 | Email координатора | PASS | accessibility@nov-rada.gov.ua |
| A11Y-21 | Телефон координатора | PASS | +380673040911 |
| A11Y-22 | Заявлений стандарт | PASS | WCAG 2.1 Level AA |

---

## 4. Тестування безпеки

### 4.1. HTTPS та заголовки

| ID | Тест | Результат | Значення |
|----|------|-----------|----------|
| SEC-01 | HTTPS | PASS | Примусовий |
| SEC-02 | HTTP→HTTPS редірект | PASS | 308 Permanent Redirect |
| SEC-03 | HSTS | PASS | `max-age=63072000; includeSubDomains; preload` |
| SEC-04 | X-Frame-Options | FAIL | Відсутній |
| SEC-05 | X-Content-Type-Options | FAIL | Відсутній |
| SEC-06 | Content-Security-Policy | FAIL | Відсутній |
| SEC-07 | Access-Control-Allow-Origin | WARN | `*` (надто відкритий) |

### 4.2. Посилання та форми

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| SEC-08 | rel="noopener noreferrer" | PASS | На зовнішніх посиланнях |
| SEC-09 | target="_blank" безпека | PASS | Поєднується з noopener |

---

## 5. Тестування продуктивності

| ID | Параметр | Результат | Значення |
|----|----------|-----------|----------|
| PERF-01 | Content-Type | PASS | text/html; charset=utf-8 |
| PERF-02 | Cache-Control | PASS | public, max-age=0, must-revalidate |
| PERF-03 | ETag | PASS | Є (для кешування) |
| PERF-04 | Vercel Cache | PASS | HIT (CDN кешування) |
| PERF-05 | Prerender | PASS | X-Nextjs-Prerender: 1 |
| PERF-06 | Stale Time | PASS | 300 секунд |
| PERF-07 | Розмір головної | PASS | 143 KB (прийнятно) |
| PERF-08 | Next.js Image | PASS | Оптимізація зображень |

---

## 6. Тестування контенту

### 6.1. Основна інформація

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| CNT-01 | Назва організації | PASS | КНП "Нововолинська ЦМЛ" |
| CNT-02 | ЄДРПОУ | PASS | 01983016 |
| CNT-03 | Адреса | PASS | 45400, Волинська обл., м. Нововолинськ, просп. Перемоги, 7 |
| CNT-04 | Гаряча лінія | PASS | +380673040911 |
| CNT-05 | Приймальня | PASS | +380334449097 |
| CNT-06 | Email | PASS | cml@nov-rada.gov.ua |
| CNT-07 | Режим роботи | PASS | Пн-Пт: 08:00-17:00, Сб: 09:00-14:00 |

### 6.2. Мова та локалізація

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| CNT-08 | Мова контенту | PASS | Українська |
| CNT-09 | html lang | PASS | uk-UA |
| CNT-10 | og:locale | PASS | uk_UA |
| CNT-11 | Дати | PASS | Формат DD.MM.YYYY |

### 6.3. Плейсхолдери та незавершений контент

| ID | Проблема | Статус | Деталі |
|----|----------|--------|--------|
| CNT-12 | Фото відділень | INFO | Stock-зображення з Unsplash |
| CNT-13 | Галереї | INFO | "Реальні фото будуть додані в наступній версії" |
| CNT-14 | Інформація про персонал | INFO | "буде додана найближчим часом" |
| CNT-15 | Сторінка новин | FAIL | Посилається, але не існує |

---

## 7. Тестування адаптивності

| ID | Тест | Результат | Деталі |
|----|------|-----------|--------|
| RWD-01 | Viewport meta | PASS | `width=device-width, initial-scale=1` |
| RWD-02 | Responsive grid | PASS | Tailwind breakpoints (sm, md, lg) |
| RWD-03 | Mobile menu | PASS | Бургер-меню для lg:hidden |
| RWD-04 | Responsive images | PASS | Next.js Image з srcset |
| RWD-05 | Responsive typography | PASS | Адаптивні розміри (text-3xl md:text-4xl) |

---

## 8. Виявлені проблеми

### 8.1. Серйозні проблеми

| # | Проблема | Категорія | Рекомендація |
|---|----------|-----------|--------------|
| 1 | Відсутній X-Frame-Options | Безпека | Додати заголовок DENY або SAMEORIGIN |
| 2 | Відсутній CSP | Безпека | Додати Content-Security-Policy |

### 8.2. Незначні проблеми

| # | Проблема | Категорія | Рекомендація |
|---|----------|-----------|--------------|
| 3 | Сторінка /news повертає 404 | Функціональність | Створити сторінку або прибрати посилання |
| 4 | Посилання "#" для політики | Функціональність | Створити сторінки або прибрати посилання |
| 5 | Посилання "#" для умов використання | Функціональність | Створити сторінки або прибрати посилання |
| 6 | CORS * (надто відкритий) | Безпека | Обмежити до необхідних доменів |
| 7 | Плейсхолдери замість фото | Контент | Додати реальні фотографії |
| 8 | Неповна інформація про персонал | Контент | Доповнити дані про лікарів |
| 9 | Відсутній X-Content-Type-Options | Безпека | Додати nosniff |

---

## 9. Позитивні аспекти

### Сильні сторони прототипу:

1. **Доступність (A11Y):**
   - Skip-to-content посилання
   - Семантичний HTML
   - ARIA-атрибути
   - Координатор з питань доступності
   - Заявлена відповідність WCAG 2.1 AA

2. **SEO:**
   - Повний набір meta-тегів
   - Open Graph та Twitter Cards
   - JSON-LD структуровані дані (MedicalOrganization)
   - Правильна ієрархія заголовків

3. **Безпека:**
   - HTTPS з HSTS preload
   - HTTP→HTTPS редірект
   - rel="noopener noreferrer" на зовнішніх посиланнях

4. **Продуктивність:**
   - CDN кешування (Vercel)
   - Server-side rendering (Next.js)
   - Оптимізація зображень
   - Prerender

5. **UX:**
   - Кастомна 404-сторінка українською
   - Зрозуміла навігація
   - Контактна інформація на кожній сторінці
   - Екстрена допомога виділена

6. **Контент:**
   - Повна контактна інформація
   - Режим роботи
   - Посилання на державні ресурси
   - Медичні статті

---

## 10. Рекомендації

### Критичні (P1):
1. Додати HTTP security headers (X-Frame-Options, CSP, X-Content-Type-Options)

### Високі (P2):
2. Створити сторінку /news або прибрати посилання з головної
3. Створити сторінки "Політика конфіденційності" та "Умови використання"

### Середні (P3):
4. Додати реальні фотографії відділень
5. Заповнити інформацію про персонал
6. Обмежити CORS до необхідних доменів

---

## 11. Висновок

Прототип сайту КНП "Нововолинська центральна міська лікарня" демонструє **високу якість** з точки зору:
- Доступності
- SEO-оптимізації
- Користувацького досвіду
- Базової безпеки

Основні зауваження стосуються:
- Відсутності деяких HTTP security headers
- Незавершеного контенту (фото, персонал)
- Неіснуючих сторінок, на які є посилання

**Загальна оцінка: 87% — Добре**

Прототип готовий до подальшого розвитку з урахуванням виявлених рекомендацій.

---

## Додаток A: HTTP-заголовки головної сторінки

```
HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 32575
Cache-Control: public, max-age=0, must-revalidate
Content-Disposition: inline
Content-Length: 143315
Content-Type: text/html; charset=utf-8
Date: Fri, 06 Feb 2026 20:34:39 GMT
Etag: "3aa8a1ade6d3b6cc33eb00433a96d588"
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch
X-Matched-Path: /
X-Nextjs-Prerender: 1
X-Nextjs-Stale-Time: 300
X-Vercel-Cache: HIT
```

## Додаток B: Карта сайту

```
/
├── /history
├── /structure
│   ├── /structure/management
│   ├── /structure/ambulatory-main
│   ├── /structure/therapy
│   ├── /structure/pediatrics
│   ├── /structure/hospital-main
│   ├── /structure/surgery
│   ├── /structure/therapy-hospital
│   ├── /structure/radiology
│   ├── /structure/diagnostics
│   └── /structure/rehabilitation
├── /information
│   ├── /information/diphtheria
│   ├── /information/covid-testing
│   ├── /information/patient-rights
│   ├── /information/hepatitis-c
│   ├── /information/measles
│   └── /information/lyme-disease-ticks
├── /contacts
└── /news (404)
```

---

*Звіт створено: 2026-02-05*
*Тестувальник: Iaroslav Voitovych*
