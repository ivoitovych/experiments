/**
 * HttpExceptionFilter
 *
 * Global exception filter that catches all HttpExceptions thrown anywhere
 * in the NestJS app and formats them into a consistent JSON response:
 *
 * {
 *   statusCode: 400,
 *   message: "Validation failed",
 *   error: "Bad Request",
 *   timestamp: "2024-03-01T10:00:00.000Z",
 *   path: "/api/de-identification/analyze"
 * }
 *
 * Without this filter, NestJS returns its own default format.
 * This filter ensures the frontend's ApiError type always matches.
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as { message: string | string[] }).message;

    const errorBody = {
      statusCode: status,
      message,
      error: HttpStatus[status] ?? 'Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log 5xx errors as errors, 4xx as warnings
    if (status >= 500) {
      this.logger.error(`[${status}] ${request.method} ${request.url}`, exception.stack);
    } else {
      this.logger.warn(`[${status}] ${request.method} ${request.url}`);
    }

    response.status(status).json(errorBody);
  }
}
