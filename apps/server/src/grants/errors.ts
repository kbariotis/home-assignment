import { BaseApplicationError } from '../errors/base-application.error';

export class SubmissionAlreadyExistsError extends BaseApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'SubmissionAlreadyExistsError';
  }
}
