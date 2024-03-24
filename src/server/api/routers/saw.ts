import { kriteria } from "@prisma/client";
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
    }).default({})).query(async ({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, kriteria_id } }) => {
        // kostum -> kriteria -> subkriteria
        // kostum: kriteria -> subkriteria
        // kriteria: kostum, subkriteria
        // With mock, test `pnpx tsx ./src/server/test/04-findMany-selected.ts`

        const pos: Record<number, number> = {};
        const sort = [];
        const unkn = [];

        const kostums = await db.kostum.findMany({
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
        });


        if ( kostum_id ) return kostums;

        const rsaw = await db.rank_saw.findMany({
            where: { user_id, },
            orderBy: {
                saw: "desc"
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        for ( const i in rsaw )
            pos[rsaw[i]!.kostum_id] = parseInt(i);

        for (const kostum of kostums) {
            if ( (pos[kostum.id] ?? -1) >= 0 ) sort[pos[kostum.id]!] = kostum;
            else unkn.push(kostum);
        }
        
        return [...sort, ...unkn];
    }),
    processSaw: protectedProcedure.query(async ({ ctx: { db, session: { user: { id: user_id } } }, }) => {
        const kostums = await db.kostum.findMany({
            where: {
                rvalues: {
                    some: {
                        user_id,
                    },
                },
            },
            select: {
                id: true,
                rvalues: {
                    select: {
                        subkriteria: {
                            select: {
                                id: true,
                                kriteria_id: true,
                                skvalue: true,
                            },
                        },
                    },
                },
            },
        });

        // kostum[i]!.rvalues[j]!.subkriteria.skvalue
        // kostum[i]!.rvalues[j]!.subkriteria.kriteria.weight

        type DictSK = { kid: number; kweight: number; skmin: number; skmax: number; ktype: kriteria["ktype"] };
        let dictSK: DictSK[] | Record<number, DictSK> = (await db.$queryRaw`SELECT k.id AS kid,
            k.weight AS kweight,
            k.ktype AS ktype,
            MIN(sk.skvalue) as skmin,
            MAX(sk.skvalue) as skmax
        FROM kriteria k
        JOIN subkriteria sk ON sk.kriteria_id = k.id
        GROUP BY k.id`);
        dictSK = (dictSK as DictSK[]).reduce((obj: Record<number, DictSK>, item: DictSK) => Object.assign(obj, { [item.kid]: item }), {});

        const tkostums: Record<number, number | undefined> = {};

        for (const kostum of kostums) {
            // kostum_id, category weight, max sub, min sub
            // get each category -> max sub, min sub, ktype

            for (const rval of kostum.rvalues) {
                const tdict = dictSK[rval.subkriteria.kriteria_id]!;
                const skval = rval.subkriteria.skvalue;

                let val = 0;
                if (tdict.ktype == "Benefit") val = skval / tdict.skmax;
                else if (tdict.ktype == "Cost") val = tdict.skmin / skval;

                val = val * tdict.kweight / 100;
                tkostums[kostum.id] ??= 0;
                tkostums[kostum.id]! += val;
            }
        }

        await db.rank_saw.deleteMany({
            where: {
                user_id,
            },
        });
        await db.rank_saw.createMany({
            data: [
                ...(Object.entries(tkostums).map(([kostum_id, saw]) => ({
                    user_id,
                    kostum_id: kostum_id as unknown as number,
                    saw: saw!,
                }))),
            ],
        });

        return true;
    }),
});