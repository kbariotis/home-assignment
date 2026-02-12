import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseApplicationError } from '../errors/base-application.error';

@Injectable()
export class ApplicationErrorInterceptor implements NestInterceptor {
  // eslint-disable-next-line -- Allow any response type
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BaseApplicationError) {
          return of({
            message: error.message,
            __typename: 'ApplicationError', // Help GraphQL resolve the type
          });
        }
        return throwError(() => error);
      }),
    );
  }
}
