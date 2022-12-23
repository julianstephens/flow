export interface UserBase {
  fullName: string;
  shortName: string;
  email: string;
  dob: number;
  address: Record<string, string>;
  roles: string[];
}

export interface UserCreateRequest extends UserBase {}
export interface UserUpdateRequest extends Partial<UserBase> {}
export interface UserResponse extends UserBase {
  id: number;
}
