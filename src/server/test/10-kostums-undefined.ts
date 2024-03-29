import { env } from "~/env";
import { db } from "~/server/db";

const longDiv = () => console.log("===== ========== ========== ========== ========== =====");
const shortDiv = () => console.log("===== ==========");

async function list_kostums() {
    const user_id = 3;
    const [kostum_id, kriteria_id, with_norm] = [undefined, undefined, false];

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

    console.log(kostums);
}

(async () => {
    await list_kostums();
})();