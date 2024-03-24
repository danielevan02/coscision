import { kriteria } from "@prisma/client";
import { db } from "~/server/db";

const longDiv = () => console.log("===== ========== ========== ========== ========== =====");
const shortDiv = () => console.log("===== ==========");

async function testShowBase() {
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
    console.log(kostums);
    shortDiv();
    
    console.log(kostums[2]);
    shortDiv();

    console.log(kostums[2]?.rvalues);
    shortDiv();
}

async function testReducer() {
    type DictSK = { kid: number; kweight: number; skmin: number; skmax: number; ktype: kriteria["ktype"] };
        let dictSK: DictSK[] | Record<number, DictSK> = (await db.$queryRaw`SELECT k.id AS kid,
            k.weight AS kweight,
            k.ktype AS ktype,
            MIN(sk.skvalue) as skmin,
            MAX(sk.skvalue) as skmax
        FROM kriteria k
        JOIN subkriteria sk ON sk.kriteria_id = k.id
        GROUP BY k.id`);

        console.log(dictSK);
        shortDiv();

        dictSK = (dictSK as DictSK[]).reduce((obj: Record<number, DictSK>, item: DictSK) => Object.assign(obj, { [item.kid]: item }), {});
        console.log(dictSK);
}

(async () => {
    await testShowBase();
    // longDiv();
    // await testReducer();
})();
