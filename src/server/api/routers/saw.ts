import type { kostum, kriteria, rank_saw, rvalues, subkriteria } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export type DictSK = { kid: number; kweight: number; skmin: number; skmax: number; ktype: kriteria["ktype"] };
export type ExtendedKostum = kostum & {
    rvalues: (rvalues & {
        subkriteria: subkriteria & {
            kriteria: kriteria & {
                skmin?: number;
                skmax?: number;
                norm_matrix?: number;
                norm_weight?: number;
            };
        };
    })[];
    saw?: number;
};

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
                kostum_id,
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
    }).default({})).mutation(async ({ ctx: { db, session: { user: { id: user_id } } }, input: { kostum_id, subkriteria_ids } }) => {
        await db.rvalues.deleteMany({
            where: {
                user_id,
                kostum_id,
                subkriteria_id: {
                    in: subkriteria_ids,
                },
            }
        });

        const rvalues = await db.rvalues.findMany({
            select: {
                kostum_id: true,
            },
            where: {
                user_id,
            },
        });

        await db.rank_saw.deleteMany({
            where: {
                user_id,
                kostum_id: {
                    notIn: rvalues.map(rv => rv.kostum_id),
                },
            }
        });
        return true;
    }),
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
        const sort: ExtendedKostum[] = [];
        const unkn: ExtendedKostum[] = [];

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
                    where: {
                        subkriteria: kriteria_id ? {
                            kriteria_id,
                        } : undefined,
                        user_id,
                    },
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
        JOIN rvalues rv ON rv.subkriteria_id = sk.id
        WHERE rv.user_id = ${ user_id }
        GROUP BY k.id`) as DictSK[]).reduce((obj: Record<number, DictSK>, item: DictSK) => Object.assign(obj, { [item.kid]: item }), {}) : null;

        const sumKWeight = (await db.kriteria.aggregate({
            _sum: {
                weight: true,
            }
        }))._sum.weight!.toNumber();

        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        for ( const i in rsaw )
        {
            // console.log(i, parseInt(rsaw[i]!.kostum_id as unknown as string));
            pos[rsaw[i]!.kostum_id] = [parseInt(i), rsaw[i]!];
        }

        // console.log({user_id, kostum_id, kriteria_id, with_norm});

        for (const kostum of (kostums as unknown as ExtendedKostum[])) {
            console.log(kostum.id, pos[kostum.id]?.[0]);

            if (with_norm) {
                // return null;

                let saw = 0;
                for (const rval of kostum.rvalues) {
                    const tdict = dictSK![rval.subkriteria.kriteria_id]!;
                    const skval = rval.subkriteria.skvalue;
                    //normalisasi matrix
                    let norm_matrix = 0;
                    if (tdict.ktype == "Benefit") norm_matrix = skval / tdict.skmax;
                    else if (tdict.ktype == "Cost") norm_matrix = tdict.skmin / skval;
                    //normalisasi bobot
                    const norm_weight = norm_matrix * tdict.kweight / sumKWeight;
                    saw += norm_weight;

                    rval.subkriteria.kriteria = {
                        ...rval.subkriteria.kriteria, 
                        skmin: tdict.skmin, 
                        skmax: tdict.skmax,
                        norm_matrix,
                        norm_weight,
                    };
                }

                kostum.saw = saw;

                if ( (pos[kostum.id]?.[0] ?? -1) >= 0 ) sort[pos[kostum.id]![0]] = kostum;
                else unkn.push(kostum);
            } else if ( (pos[kostum.id]?.[0] ?? -1) >= 0 ) {
                sort[pos[kostum.id]![0]] = kostum;
                sort[pos[kostum.id]![0]]!.saw = pos[kostum.id]![1].saw as unknown as number
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
                    where: {
                        user_id,
                    },
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
        JOIN rvalues rv ON rv.subkriteria_id = sk.id
        WHERE rv.user_id = ${ user_id }
        GROUP BY k.id`) as DictSK[]).reduce((obj: Record<number, DictSK>, item: DictSK) => Object.assign(obj, { [item.kid]: item }), {});

        const sumKWeight = (await db.kriteria.aggregate({
            _sum: {
                weight: true,
            }
        }))._sum.weight!.toNumber();

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

                val = val * tdict.kweight / sumKWeight;
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
                    kostum_id: parseInt(kostum_id),
                    saw: saw!,
                }))),
            ],
        });

        return true;
    }),
});
