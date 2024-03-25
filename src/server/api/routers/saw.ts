import { kriteria, rank_saw } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

type DictSK = { kid: number; kweight: number; skmin: number; skmax: number; ktype: kriteria["ktype"] };

export const sawRouter = createTRPCRouter({
    selectCostum: protectedProcedure.input(z.object({
        kostum_id: z.number(),
        subkriteria_id: z.number(),
    })).mutation(async ({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, subkriteria_id } }) => {
        let subkriteria;
        try {
            subkriteria = await db.subkriteria.findFirstOrThrow({
                select: {
                    kriteria_id: true,
                },
                where: {
                    id: subkriteria_id,
                },
            });
        } catch (e) {
            throw "subkriteria not exists";
        }

        const count_same_kriteria = await db.rvalues.count({
            where: {
                user_id, 
                subkriteria: {
                    kriteria_id: subkriteria.kriteria_id,
                },
            },
        });

        if (count_same_kriteria > 0) throw "kriteria duplicated";

        return await db.rvalues.create({
            data: {
                user_id,
                kostum_id,
                subkriteria_id,
            },
        });
    }),
    deleteSelection: protectedProcedure.input(z.object({
        kostum_id: z.number().optional(),
        subkriteria_ids: z.number().array().optional(),
    })).mutation(({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, subkriteria_ids } }) =>
        db.rvalues.deleteMany({
            where: {
                user_id,
                kostum_id,
                subkriteria_id: {
                    in: subkriteria_ids,
                },
            }
        }),
    ),
    getSelected: protectedProcedure.input(z.object({
        kostum_id: z.number().optional(),
        kriteria_id: z.number().optional(),
        with_norm: z.boolean().default(false),
    }).default({})).query(async ({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, kriteria_id, with_norm } }) => {
        // kostum -> kriteria -> subkriteria
        // kostum: kriteria -> subkriteria
        // kriteria: kostum, subkriteria
        // With mock, test `pnpx tsx ./src/server/test/04-findMany-selected.ts`

        const pos: Record<number, [number, rank_saw]> = {};
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

        let dictSK: Record<number, DictSK> | null = with_norm ? ((await db.$queryRaw`SELECT k.id AS kid,
            k.weight AS kweight,
            k.ktype AS ktype,
            MIN(sk.skvalue) as skmin,
            MAX(sk.skvalue) as skmax
        FROM kriteria k
        JOIN subkriteria sk ON sk.kriteria_id = k.id
        GROUP BY k.id`) as DictSK[]).reduce((obj: Record<number, DictSK>, item: DictSK) => Object.assign(obj, { [item.kid]: item }), {}) : null;

        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        for ( const i in rsaw )
            pos[rsaw[i]!.kostum_id] = [parseInt(i), rsaw[i]!];

        for (const kostum of kostums) {
            if (with_norm) {
                const kostum_norm = {...kostum};

                for (const rval of kostum_norm.rvalues) {
                    const tdict = dictSK![rval.subkriteria.kriteria_id]!;
                    const skval = rval.subkriteria.skvalue;

                    rval.subkriteria.kriteria = {
                        ...rval.subkriteria.kriteria, 
                        skmin: tdict.skmin, 
                        skmax: tdict.skmax,
                        norm_weight: null,
                        norm_max: null,
                    };
                }

                if ( (pos[kostum.id]?.[0] ?? -1) >= 0 ) sort[pos[kostum.id]![0]] = kostum_norm;
                else unkn.push(kostum_norm);
            } else if ( (pos[kostum.id]?.[0] ?? -1) >= 0 ) {
                sort[pos[kostum.id]![0]] = {...kostum, saw: pos[kostum.id]![1].saw};
            } else unkn.push(kostum);
        }
        
        return [...sort, ...unkn];
    }),
    processSaw: protectedProcedure.mutation(async ({ ctx: { db, session: { user: { id: user_id } } }, }) => {
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

        let dictSK: Record<number, DictSK> = ((await db.$queryRaw`SELECT k.id AS kid,
            k.weight AS kweight,
            k.ktype AS ktype,
            MIN(sk.skvalue) as skmin,
            MAX(sk.skvalue) as skmax
        FROM kriteria k
        JOIN subkriteria sk ON sk.kriteria_id = k.id
        GROUP BY k.id`) as DictSK[]).reduce((obj: Record<number, DictSK>, item: DictSK) => Object.assign(obj, { [item.kid]: item }), {});

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
    getSawNorm: protectedProcedure.query(async ({ ctx: { db } }) => {
        let dictSK: Record<number, DictSK> = ((await db.$queryRaw`SELECT k.id AS kid,
            k.weight AS kweight,
            k.ktype AS ktype,
            MIN(sk.skvalue) as skmin,
            MAX(sk.skvalue) as skmax
        FROM kriteria k
        JOIN subkriteria sk ON sk.kriteria_id = k.id
        GROUP BY k.id`) as DictSK[]).reduce((obj: Record<number, DictSK>, item: DictSK) => Object.assign(obj, { [item.kid]: item }), {});

        return {
            norm_weight: {},
            norm_matrix: {},
        };
    }),
});