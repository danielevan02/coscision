import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const universalRouter = createTRPCRouter({
    groupProps: publicProcedure.input(z.enum(["kostum_origin", "kostum_preference", "kostum_kset", "kriteria_ktype"]))
        .query(() => []),
});