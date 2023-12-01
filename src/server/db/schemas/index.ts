import { z } from "zod";

export * from "./financeAccounts";
export * from "./usersAccounts";

export const WhereIdSchema = z.object({
  id: z.string(),
});
