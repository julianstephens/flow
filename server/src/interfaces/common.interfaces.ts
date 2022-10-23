export enum OrderBy {
  ASC = "asc",
  DESC = "desc",
}
export interface IOrderByFilter {
  prop: string;
  direction: OrderBy;
}
