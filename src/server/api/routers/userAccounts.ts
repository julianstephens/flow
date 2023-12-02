import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { newUserSchema, users } from "~/server/db/schemas";

export const userAccountRouter = createTRPCRouter({
    getByEmail: protectedProcedure
        .input(z.object({ email: z.string().email() }))
        .query(async ({ input: { email } }) => {
            return (
                await db.select().from(users).where(eq(users.email, email))
            )[0];
        }),
    create: protectedProcedure
        .input(newUserSchema)
        .mutation(async ({ input }) => {
            return (await db.insert(users).values(input).returning())[0];
        }),
    update: protectedProcedure
        .input(newUserSchema.required({ id: true }))
        .mutation(async ({ input: { id, ...rest } }) => {
            return await db.update(users).set(rest).where(eq(users.id, id));
        }),
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id } }) => {
            return await db.delete(users).where(eq(users.id, id));
        }),
});
