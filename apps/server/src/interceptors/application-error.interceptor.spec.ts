import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { ApplicationErrorInterceptor } from './application-error.interceptor';
import { BaseApplicationError } from '../errors/base-application.error';

describe('ApplicationErrorInterceptor', () => {
  let interceptor: ApplicationErrorInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationErrorInterceptor],
    }).compile();

    interceptor = module.get<ApplicationErrorInterceptor>(ApplicationErrorInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept', () => {
    let context: ExecutionContext;
    let next: CallHandler;

    beforeEach(() => {
      context = {} as ExecutionContext;
      next = {
        handle: jest.fn(),
      };
    });

    it('should return formatted error object when BaseApplicationError is thrown', (done) => {
      const error = new BaseApplicationError('Test error message');
      jest.spyOn(next, 'handle').mockReturnValue(throwError(() => error));

      interceptor.intercept(context, next).subscribe({
        next: (result) => {
          expect(result).toEqual({
            message: 'Test error message',
            __typename: 'ApplicationError',
          });
          done();
        },
        error: (err) => {
          done(err);
        },
      });
    });

    it('should re-throw error when non-BaseApplicationError is thrown', (done) => {
      const error = new Error('Regular error');
      jest.spyOn(next, 'handle').mockReturnValue(throwError(() => error));

      interceptor.intercept(context, next).subscribe({
        next: () => {
          done(new Error('Should have thrown an error'));
        },
        error: (err) => {
          expect(err).toBe(error);
          done();
        },
      });
    });

    it('should pass through successful result', (done) => {
      const result = { data: 'success' };
      jest.spyOn(next, 'handle').mockReturnValue(of(result));

      interceptor.intercept(context, next).subscribe({
        next: (res) => {
          expect(res).toEqual(result);
          done();
        },
        error: (err) => {
          done(err);
        },
      });
    });
  });
});
