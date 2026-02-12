export class BaseApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BaseApplicationError';
  }
}
