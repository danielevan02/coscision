import { db } from "~/server/db";


const findCostum = (user_id: number, kostum_id?: number, kriteria_id?: number) => 
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
    });

const longDiv = () => console.log("===== ========== ========== ========== ========== =====");
const shortDiv = () => console.log("===== ==========");

async function testFindManyRelatedConsidered() {
    const user_id = 3;
    let [kostum_id, kriteria_id]: (number|undefined)[] = [undefined, undefined];

    const kostums = await findCostum(user_id);

    kostum_id = kostums[2]!.id;
    kriteria_id = kostums[2]!.rvalues[1]!.subkriteria.kriteria_id;

    longDiv();
    console.log("Full Search");
    const full = await findCostum(user_id, kostum_id, kriteria_id);
    console.log(full);
    console.log(full[0]);
    console.log(full[0]!.rvalues[0]);

    longDiv();
    console.log("Kostum ID only");
    const one_kostum = await findCostum(user_id, kostum_id);
    console.log(one_kostum);
    console.log(one_kostum[0]);
    console.log(one_kostum[0]!.rvalues[1]);

    longDiv();
    console.log("Kriteria ID only");
    const just_kriteria = await findCostum(user_id, undefined, kriteria_id);
    console.log(just_kriteria);
    console.log(just_kriteria[2]);
    console.log(just_kriteria[2]!.rvalues[0]);
}

void testFindManyRelatedConsidered();