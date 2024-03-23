import { db } from "~/server/db";

async function testFindManyRelatedConsidered() {
    const kostums = await db.kostum.findMany({
        where: {
            rvalues: {
                some: {
                    user_id: 3,
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
    console.log("===== ========== ========== ========== ========== =====");
    console.log((await db.kostum.findMany({
        where: {
            rvalues: {
                some: {
                    kostum_id: kostums[2]!.id,
                    user_id: 3,
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
    }))[0]);
}

void testFindManyRelatedConsidered();