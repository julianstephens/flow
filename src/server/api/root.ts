import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "./routers/category";
import { financeAccountRouter } from "./routers/financeAccount";
import { ledgerRouter } from "./routers/ledger";
import { userAccountRouter } from "./routers/userAccounts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    financeAccount: financeAccountRouter,
    ledger: ledgerRouter,
    category: categoryRouter,
    users: userAccountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
