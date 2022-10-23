import { NotFound } from "@tsed/exceptions";
import { IOrderByFilter } from "./common.interfaces";

export const UserNotFoundDesc = "User(s) not found.";
export const UserNotFound = () => new NotFound(UserNotFoundDesc);
export interface IUserSearchParams {
  limit?: number;
  orderBy?: IOrderByFilter;
  email?: string;
  shortName?: string;
  fullName?: string;
}
