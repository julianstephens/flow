import { MIN } from "@/utils";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const UserSchema = z.object({
  email: z.string().email().describe("User's email address"),
  password: z
    .password()
    .min(8)
    .max(100)
    .atLeastOne("digit", { message: MIN("digit") })
    .atLeastOne("special", { message: MIN("special character") })
    .atLeastOne("lowercase", { message: MIN("uppercase character") })
    .atLeastOne("uppercase", { message: MIN("uppercase character") })
    .describe("User's password"),
  fname: z.string().nullish().describe("User's first name"),
  lname: z.string().nullish().describe("User's last name"),
});

export class UserDto extends createZodDto(UserSchema) {}
