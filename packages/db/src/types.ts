import { UserSchema } from "./generated";
import { z } from "zod";

export type ValidatedUser = z.infer<typeof UserSchema>;