import { IOrderByFilter } from "./common.interfaces";

export const UserNotFoundDesc = "User(s) not found.";

export interface IUserSearchParams {
  limit?: number;
  orderBy?: IOrderByFilter;
  email?: string;
  shortName?: string;
  fullName?: string;
}

export interface IUserInput {
  fullName: string;
  shortName: string;
  email: string;
  password: string;
}

export const UserCreateExample = {
  fullName: "Shinji Ikari",
  shortName: "Shinji",
  email: "shinji.ikari@xyz.com",
  // password: "1234567",
};
