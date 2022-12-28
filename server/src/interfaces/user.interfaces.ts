export const UserNotFoundDesc = "User(s) not found.";
export const UserExistsDesc = "User already exists with this email.";

export interface IUserSearchFilters {
  email?: string;
  fullName?: string;
}

export const UserSearchParamsExample = {
  email: "test@test.com",
  limit: 3,
  orderBy: "asc",
  shortName: "Shinji",
};

export interface IUserInput {
  fullName?: string;
  shortName?: string;
  email?: string;
  dob?: number;
  address?: {
    streetAddress?: string;
    streetAddress2?: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
  };
}

export const UserCreateExample = {
  fullName: "Shinji Ikari",
  shortName: "Shinji",
  email: "shinji.ikari@xyz.com",
  dob: 991428224,
  address: {
    streetAddress: "123 ABC Lane",
    streetAddress2: "Unit 4",
    city: "Tokyo",
    region: "Kanto",
    country: "JPN",
    postalCode: "021",
  },
};

export const UserUpdateExample = {
  fullName: "Shinji Ikari",
  shortName: "Shinji",
  email: "shinji.ikari@xyz.com",
  dob: 991428224,
};

export const UserSelectProfile = ["id", "fullName", "shortName", "email", "dob"];
