# Бекенд: Утиліти, фільтри, інтерцептори

[← Інші модулі](./08-backend-other-modules.md) | [Фронтенд: Запуск →](./10-frontend-bootstrap-routing.md)

---

## Схема обробки HTTP запиту

```
Вхідний HTTP запит
       │
       ▼
  JwtAuthGuard            ← Перевірка Bearer token (якщо @UseGuards)
       │
       ▼
  ValidationPipe          ← Валідація DTO (class-validator)
       │
       ▼
  TransformInterceptor    ← Обгортання відповіді (НЕ застосований глобально)
       │
       ▼
  Controller method       ← Бізнес-логіка
       │
       ▼
  HttpExceptionFilter     ← Обробка помилок → JSON відповідь
       │
       ▼
  HTTP відповідь клієнту
```

---

## HttpExceptionFilter — глобальний фільтр помилок

Перехоплює всі `HttpException` та форматує відповідь у єдиний JSON формат:

```typescript
// backend/src/common/filters/http-exception.filter.ts

@Catch(HttpException) // Ловить ТІЛЬКИ HttpException (не TypeError, не DB помилки)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Витягування повідомлення з виключення
    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as { message: string | string[] }).message;

    // Уніфікований формат помилки для фронтенду
    const errorBody = {
      statusCode: status,                        // HTTP код (400, 401, 404...)
      message,                                   // Текст або масив помилок валідації
      error: HttpStatus[status] ?? 'Error',      // Назва статусу: "BAD_REQUEST"
      timestamp: new Date().toISOString(),
      path: request.url,                         // URL запиту
    };

    // 5xx — error рівень логування, 4xx — warning
    if (status >= 500) {
      this.logger.error(`[${status}] ${request.method} ${request.url}`, exception.stack);
    } else {
      this.logger.warn(`[${status}] ${request.method} ${request.url}`);
    }

    response.status(status).json(errorBody);
  }
}
```

**Реєстрація глобально** в `app.module.ts`:
```typescript
providers: [
  { provide: APP_FILTER, useClass: HttpExceptionFilter },
]
```

---

## TransformInterceptor — обгортання відповіді

Обгортає всі успішні відповіді у envelope `{ data, statusCode, timestamp }`. **Не застосований глобально** в поточному проєкті (деякі ендпоінти повертають масиви напряму).

```typescript
// backend/src/common/interceptors/transform.interceptor.ts

export interface Response<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse<{ statusCode: number }>().statusCode;
    return next.handle().pipe(
      map((data) => ({
        data,                                    // Оригінальна відповідь контролера
        statusCode,                              // HTTP статус
        timestamp: new Date().toISOString(),      // Час відповіді
      })),
    );
  }
}
```

---

## JwtAuthGuard — захист маршрутів

Розширює Passport `AuthGuard` для використання JWT стратегії:

```typescript
// backend/src/common/guards/auth.guard.ts

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// 'jwt' — ім'я стратегії, зареєстрованої в JwtStrategy
```

**Використання в контролерах:**
```typescript
@UseGuards(JwtAuthGuard)     // Додає захист JWT на весь контролер або метод
@Get('profile')
getProfile(@CurrentUser() user: JwtPayload) { ... }
```

**Що відбувається при виклику:**
1. Витягує Bearer token з заголовку `Authorization`
2. Верифікує підпис токену за допомогою `JWT_SECRET`
3. Викликає `JwtStrategy.validate()` — перевіряє існування користувача в БД
4. Прикріплює `JwtPayload` до `request.user`
5. Якщо токен відсутній або невалідний → `401 Unauthorized`

---

## @CurrentUser() — декоратор параметра

Витягує автентифікованого користувача з `request.user` (встановлюється `JwtAuthGuard`):

```typescript
// backend/src/common/decorators/current-user.decorator.ts

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    // Отримання HTTP запиту з контексту
    const request = ctx.switchToHttp().getRequest<Request & { user: JwtPayload }>();
    return request.user; // Об'єкт { sub, email, role } з JWT payload
  },
);
```

**Використання:**
```typescript
@Get('me')
@UseGuards(JwtAuthGuard)
getMe(@CurrentUser() user: JwtPayload) {
  // user.sub — UUID користувача
  // user.email — email
  // user.role — роль (admin/analyst/viewer)
  return this.authService.getProfile(user.sub);
}
```
