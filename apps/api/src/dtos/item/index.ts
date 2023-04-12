import { MIN } from "@/utils";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const ItemSchema = z.object({
  plaidAccessToken: z.string().describe("Plaid API authentication token"),
  plaidItemId: z.string().describe("Plaid Item (institution login) ID"),
  plaidInstitutionId: z.string().describe("Plaid institution ID"),
  status: z.string().describe("Object with Plaid Item status info"),
  userId: z.number().min(1, MIN("ID")).describe("FK user ID"),
});

export class ItemDto extends createZodDto(ItemSchema) {}
