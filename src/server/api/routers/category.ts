import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { categories, newCategorySchema } from "~/server/db/schemas";

export const categoryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    return await db.query.categories.findMany();
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id } }) => {
      return await db.query.categories.findFirst({
        where: eq(categories.id, id),
      });
    }),
  create: protectedProcedure
    .input(newCategorySchema)
    .mutation(async ({ input }) => {
      return db.insert(categories).values(input);
    }),
  update: protectedProcedure
    .input(newCategorySchema.required({ id: true }))
    .mutation(async ({ input: { id, ...rest } }) => {
      return db.update(categories).set(rest).where(eq(categories.id, id));
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input: { id } }) => {
      return db.delete(categories).where(eq(categories.id, id));
    }),
});
