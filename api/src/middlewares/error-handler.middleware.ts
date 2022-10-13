import { AppError } from "@utils/error";
import type { NextFunction, Request, Response } from "express";

export default function handleError(
  err: TypeError | AppError<any>,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let appError = err;

  if (!(err instanceof AppError)) {
    appError = new AppError("Uh oh something went wrong");
  }

  res.status((appError as AppError<any>).status).send(appError);
}
