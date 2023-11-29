import { pgEnum } from "drizzle-orm/pg-core";

export const transTypeEnum = pgEnum("trans_type", [
  "deposit",
  "withdrawal",
  "payment",
  "charge",
]);

export type TransType = typeof transTypeEnum.enumValues;
