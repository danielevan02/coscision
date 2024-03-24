import { kriteria } from "@prisma/client";
import { db } from "~/server/db";

const longDiv = () => console.log("===== ========== ========== ========== ========== =====");
const shortDiv = () => console.log("===== ==========");

async function testSortKostum() {
    const kostum = await db.kostum.findMany({
        where: {
            rank_saw: {
                every: {
                    user_id: 3,
                }
            }
        },
        orderBy: {
            rank_saw: {
                saw: "ASC",
            }
        },
    });
}

(async () => {
    await testSortKostum();
})();