export class AppError<T> {
  message!: string;

  status!: number;

  additionalInfo?: T;

  constructor(message: string, additionalInfo?: T, status = 500) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo || undefined;
  }
}
