import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error.js";

export default function handleError(
  err: TypeError | AppError<any>,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  let appError = err;

  if (!(err instanceof AppError)) {
    appError = new AppError("Uh oh something went wrong");
    appError.additionalInfo = err;
  }

  res.status((appError as AppError<any>).status).send(appError);
}
