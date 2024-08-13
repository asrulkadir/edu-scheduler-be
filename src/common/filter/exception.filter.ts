/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error('ExceptionFilter', exception);

    if (exception instanceof HttpException) {
      // handle HttpException
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        timestamp: new Date().toISOString(),
        message: exception.message,
        error: true,
      });
    } else if (exception instanceof ZodError) {
      // handle ZodError
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        error: true,
        // custom error message
        message: exception.errors.map((error) => error.message)?.[0],
        errors: exception.errors,
      });
    } else {
      // handle other exceptions
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        message: 'Internal Server Error',
        error: true,
      });
    }
  }
}
