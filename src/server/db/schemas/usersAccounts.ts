import { createId } from "@paralleldrive/cuid2";
import {
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
    id: text("id")
        .$defaultFn(() => createId())
        .notNull()
        .primaryKey(),
    created: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updated: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export const userSchema = createSelectSchema(users);
export const newUserSchema = createInsertSchema(users);

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    }),
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    }),
);
