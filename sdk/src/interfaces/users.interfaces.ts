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

export interface UserCreateRequest extends UserBase {}

export interface UserUpdateRequest extends Partial<UserBase> {}

export interface UserResponse extends UserBase {
  id: number;
}
