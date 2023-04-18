export interface UserBase {
  fullName: string;
  shortName: string;
  email: string;
  dob: number;
  address: UserAddress;
}

export interface UserAddress {
  street: string;
  street2?: string;
  city: string;
  postal: string;
  country: string;
}

export type UserCreateRequest = UserBase;

export type UserUpdateRequest = Partial<UserBase>;

export interface UserResponse extends UserBase {
  id: number;
}
