export class AppError<T> {
  message!: string;

  status!: number;

  additionalInfo?: T;

  constructor(message: string, status = 500, additionalInfo?: T) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo || undefined;
  }
}
