import { BadRequest } from "@tsed/exceptions";

export enum OrderBy {
  ASC = "asc",
  DESC = "desc",
}
export interface IOrderByFilter {
  prop: string;
  direction: OrderBy;
}
export class IDFormatException extends BadRequest {
  constructor() {
    super("ID format is not valid");
  }
}
export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  ERROR = 500,
}
