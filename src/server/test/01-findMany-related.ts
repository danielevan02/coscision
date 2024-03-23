import { db } from "~/server/db";

async function testFindManyRelated() {
    const kostums = db.kostum.findMany({
        where: {
            rvalues: {
                every: {
                    user_id: 1,
                }
            }
        },
    });
}

void testFindManyRelated();