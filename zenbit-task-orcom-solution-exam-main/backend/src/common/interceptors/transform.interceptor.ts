/**
 * TransformInterceptor
 *
 * Wraps all successful responses in a consistent envelope:
 *
 * {
 *   data: <original response body>,
 *   statusCode: 200,
 *   timestamp: "2024-03-01T10:00:00.000Z"
 * }
 *
 * This makes the frontend's ApiResponse<T> type always match.
 *
 * NOTE: This interceptor is NOT applied globally in this project.
 * It is registered here as a reference. To apply globally,
 * add to app.module.ts providers:
 *   { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
 *
 * We skip the global wrapper for now because some endpoints
 * (like Presidio proxies) return arrays directly.
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        data,
        statusCode,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
