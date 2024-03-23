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
        kostum_id: z.number().optional(),
        subkriteria_id: z.number().optional(),
    })).mutation(({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, subkriteria_id } }) =>
        db.rvalues.deleteMany({
            where: {
                user_id,
                kostum_id,
                subkriteria_id,
            }
        }),
    ),
    getSelected: protectedProcedure.input(z.object({
        kostum_id: z.number().optional(),
        kriteria_id: z.number().optional(),
    }).default({})).query(({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, kriteria_id } }) => (
        // kostum -> kriteria -> subkriteria
        // kostum: kriteria -> subkriteria
        // kriteria: kostum, subkriteria
        // With mock, test `pnpx tsx ./src/server/test/04-findMany-selected.ts`

        db.kostum.findMany({
            where: {
                id: kostum_id,
                rvalues: {
                    some: {
                        user_id,
                    }
                }
            },
            include: {
                rvalues: {
                    where: kriteria_id ? {
                        subkriteria: {
                            kriteria_id,
                        },
                    } : undefined,
                    include: {
                        subkriteria: {
                            include: {
                                kriteria: true,
                            }
                        }
                    }
                },
            },
        })
    )),
    getCurrentSaw: protectedProcedure.query(async ({ ctx: { db, session: { user: { id: user_id } } }, }) => {
        const kostums = await db.kostum.findMany({
            where: {
                rvalues: {
                    some: {
                        user_id,
                    }
                }
            },
            include: {
                rvalues: {
                    include: {
                        subkriteria: {
                            include: {
                                kriteria: true,
                            }
                        }
                    }
                },
            },
        });

        // kostum[i]!.rvalues[j]!.subkriteria.skvalue
        // kostum[i]!.rvalues[j]!.subkriteria.kriteria.weight

        const x = await db.$queryRaw`SELECT rv.kostum_id AS kostum_id, 
            k.id AS kriteria_id,
            k.weight AS kweight,
            MAX(sk.skvalue) AS skmax,
            MIN(sk.skvalue) AS skmin
        FROM rvalues rv
            JOIN subkriteria sk ON sk.id = rv.subkriteria_id
            JOIN kriteria k ON k.id = sk.kriteria_id
        WHERE rv.user_id = ${ user_id }
        GROUP BY k.id`;

        for (const kostum of kostums) {
            // kostum_id, category weight, max sub, min sub
            // get each category -> max sub, min sub, ktype
            // get
            for (const rval of kostum.rvalues) {
                const ktype = rval.subkriteria.kriteria.ktype
            }
        }

        return 0;
    }),
});