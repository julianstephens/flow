import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { transTypeEnum } from "./enums";

const numericOpts = { precision: 10, scale: 2 };

const metadata = {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  created: timestamp("created_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated: timestamp("updated_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
};

export const financeAccounts = pgTable("finance_account", {
  ...metadata,
  name: text("name").notNull(),
  balance: numeric("balance", numericOpts).notNull(),
  limit: numeric("limit", numericOpts),
});

export type FinanceAccount = typeof financeAccounts.$inferSelect;
export type NewFinanceAccount = typeof financeAccounts.$inferInsert;
export const financeAccountSchema = createSelectSchema(financeAccounts);
export const newFinanceAccountSchema = createInsertSchema(financeAccounts);

export const ledgers = pgTable("ledger", {
  ...metadata,
  accountId: text("account_id")
    .notNull()
    .references(() => financeAccounts.id, { onDelete: "cascade" }),
  transType: transTypeEnum("trans_type").notNull(),
  amount: numeric("amount", numericOpts).notNull(),
});

export type Ledger = typeof ledgers.$inferSelect;
export type NewLedger = typeof ledgers.$inferInsert;
export const ledgerSchema = createSelectSchema(ledgers);
export const newLedgerSchema = createInsertSchema(ledgers);

export const categories = pgTable("category", {
  ...metadata,
  id: serial("id").notNull().primaryKey(),
  name: text("name").notNull(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export const categorySchema = createSelectSchema(categories);
export const newCategorySchema = createInsertSchema(categories);
