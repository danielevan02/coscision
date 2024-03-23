import { db } from "~/server/db";

async function testFindManyRelatedInclude() {
    const kostums = await db.kostum.findMany({
        where: {
            rvalues: {
                some: {
                    kostum_id: 2,
                    subkriteria: {
                        kriteria_id: 3,
                    },
                    user_id: 1,
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
}

void testFindManyRelatedInclude();