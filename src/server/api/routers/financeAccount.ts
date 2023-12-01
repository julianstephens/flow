import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import {
    WhereIdSchema,
    financeAccounts,
    newFinanceAccountSchema,
} from "~/server/db/schemas";

export const financeAccountRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    return await db.query.financeAccounts.findMany();
  }),
  getById: protectedProcedure
    .input(WhereIdSchema)
    .query(async ({ input: { id } }) => {
      return await db.query.financeAccounts.findFirst({
        where: eq(financeAccounts.id, id),
      });
    }),
  create: protectedProcedure
    .input(newFinanceAccountSchema)
    .mutation(async ({ input }) => {
      return db.insert(financeAccounts).values(input);
    }),
  update: protectedProcedure
    .input(newFinanceAccountSchema.required({ id: true }))
    .mutation(async ({ input: { id, ...rest } }) => {
      return db
        .update(financeAccounts)
        .set(rest)
        .where(eq(financeAccounts.id, id));
    }),
  delete: protectedProcedure
    .input(WhereIdSchema)
    .mutation(async ({ input: { id } }) => {
      return db.delete(financeAccounts).where(eq(financeAccounts.id, id));
    }),
});
