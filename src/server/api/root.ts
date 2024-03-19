import { kostumRouter } from "~/server/api/routers/kostum";
import { kriteriaRouter } from "~/server/api/routers/kriteria";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    kostum: kostumRouter,
    user: userRouter,
    kriteria: kriteriaRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
