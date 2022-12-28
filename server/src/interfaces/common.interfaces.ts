export enum OrderBy {
  ASC = "asc",
  DESC = "desc",
}
export interface IOrderByFilter {
  prop: string;
  direction: OrderBy;
}
export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  ERROR = 500,
}
