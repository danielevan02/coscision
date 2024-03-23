import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sawRouter = createTRPCRouter({
    selectCostum: protectedProcedure.input(z.object({
        kostum_id: z.number(),
        subkriteria_id: z.number(),
    })).mutation(({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, subkriteria_id } }) => 
        db.rvalues.create({
            data: {
                user_id,
                kostum_id,
                subkriteria_id,
            },
        }),
    ),
    deleteSelection: protectedProcedure.input(z.object({
        kostum_id: z.number(),
        subkriteria_id: z.number(),
    })).mutation(({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, subkriteria_id } }) =>
        db.rvalues.delete({
            where: {
                user_id_kostum_id_subkriteria_id: {
                    user_id,
                    kostum_id,
                    subkriteria_id,
                }
            }
        }),
    ),
    deleteAll: protectedProcedure.mutation(({ ctx: { db, session: { user: { id: user_id } } } }) => 
        db.rvalues.deleteMany({
            where: { user_id, },
        }),
    ),
    getSelected: protectedProcedure.input(z.object({
        kostum_id: z.number().optional(),
        kriteria_id: z.number().optional(),
    }).default({})).query(async ({ ctx: { db, session: { user: { id: user_id } } }, }) => {
        // kostum -> kriteria -> subkriteria
        // kostum: kriteria -> subkriteria
        // kriteria: kostum, subkriteria

        const groups = (await db.rvalues.groupBy({
            by: "kostum_id",
            where: { user_id },
        })).map(x => x.kostum_id);

        const kostums = await db.kostum.findMany({
            where: {
                id: {
                    in: groups,
                },
            },
            include: {
                rvalues: {
                    include: {
                        // subkriteria
                    }
                }
            },
        });

        const _kostums = await db.kostum.findMany({
            where: {
                rvalues: {
                    every: {
                        user_id,
                    }
                }
            },
        });

        return null;
    }),
    getCurrentSaw: protectedProcedure.query(({ ctx: { db, session: { user } }, }) => 0),
});