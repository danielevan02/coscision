import { kriteria } from "@prisma/client";
import { db } from "~/server/db";

const longDiv = () => console.log("===== ========== ========== ========== ========== =====");
const shortDiv = () => console.log("===== ==========");

async function testSawProcess() {
    const user_id = 3;

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
                kostum_id: parseInt(kostum_id),
                saw: saw!,
            }))),
        ],
    });

    return true;
}

(async () => {
    await testSawProcess();
})();