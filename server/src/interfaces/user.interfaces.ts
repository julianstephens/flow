import { Prisma } from "@prisma/client";
import { IOrderByFilter } from "./common.interfaces";

export const UserNotFoundDesc = "User(s) not found.";

export interface IUserSearchFilters {
  limit?: number;
  orderBy?: IOrderByFilter;
  email?: string;
  shortName?: string;
  fullName?: string;
}

export const UserSearchParamsExample = {
  email: "test@test.com",
  limit: 3,
  orderBy: "asc",
  shortName: "Shinji",
};

export interface IUserInput {
  fullName: string;
  shortName: string;
  email: string;
}

export const UserCreateExample = {
  fullName: "Shinji Ikari",
  shortName: "Shinji",
  email: "shinji.ikari@xyz.com",
};

export const UserSelectProfile: Prisma.UserSelect = {
  id: true,
  email: true,
  fullName: true,
  shortName: true,
};
