export class AppError<T> {
  message!: string;
  status!: number;
  additionalInfo: T;

  constructor(message: string, status: number = 500, additionalInfo: T = null) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}
