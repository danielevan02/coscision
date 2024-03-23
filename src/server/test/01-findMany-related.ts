import { db } from "~/server/db";

async function testFindManyRelated() {
    const kostums = await db.kostum.findMany({
        where: {
            rvalues: {
                every: {
                    kostum_id: 2,
                    subkriteria_id: 7,
                    user_id: 1,
                }
            }
        },
    });
}

void testFindManyRelated();