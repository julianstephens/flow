export enum ORDER_BY {
  ASC = "asc",
  DESC = "desc",
}
export interface IOrderByFilter {
  prop: string;
  direction: ORDER_BY;
}
