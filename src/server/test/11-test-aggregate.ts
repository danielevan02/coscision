import { env } from "~/env";
import { db } from "~/server/db";

const longDiv = () => console.log("===== ========== ========== ========== ========== =====");
const shortDiv = () => console.log("===== ==========");

async function list_kostums() {
    const a = await db.kriteria.aggregate({
        _sum: {
            weight: true,
        },
    })
    console.log(a);
    console.log(a._sum.weight);
    console.log(99 / a._sum.weight!.toNumber());
}

(async () => {
    await list_kostums();
})();