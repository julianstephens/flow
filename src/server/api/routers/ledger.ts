import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { WhereIdSchema, ledgers, newLedgerSchema } from "~/server/db/schemas";

export const ledgerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    return await db.query.ledgers.findMany();
  }),
  getById: protectedProcedure
    .input(WhereIdSchema)
    .query(async ({ input: { id } }) => {
      return await db.query.ledgers.findFirst({
        where: eq(ledgers.id, id),
      });
    }),
  create: protectedProcedure
    .input(newLedgerSchema)
    .mutation(async ({ input }) => {
      return db.insert(ledgers).values(input);
    }),
  update: protectedProcedure
    .input(newLedgerSchema.required({ id: true }))
    .mutation(async ({ input: { id, ...rest } }) => {
      return db.update(ledgers).set(rest).where(eq(ledgers.id, id));
    }),
  delete: protectedProcedure
    .input(WhereIdSchema)
    .mutation(async ({ input: { id } }) => {
      return db.delete(ledgers).where(eq(ledgers.id, id));
    }),
});
