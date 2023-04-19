import { UserSchema } from "db";
import { createZodDto } from "nestjs-zod";

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  plaidUID: true,
});
export const UpdateUserScheam = CreateUserSchema.partial();

export class UserDto extends createZodDto(UserSchema) {}
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class UpdateUserDto extends createZodDto(UpdateUserScheam) {}
