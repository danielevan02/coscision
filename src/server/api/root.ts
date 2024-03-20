import { kostumRouter } from "~/server/api/routers/kostum";
import { kriteriaRouter } from "~/server/api/routers/kriteria";
import { universalRouter } from "~/server/api/routers/universal";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    kostum: kostumRouter,
    kriteria: kriteriaRouter,
    user: userRouter,
    universal: universalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
