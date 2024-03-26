/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { User, kostum } from "@prisma/client";
import { db } from "~/server/db";
import { hash } from "~/server/utils";

async function upsert() {
    const puser: Pick<User, "password" | "level" | "image"> = {
        password: await hash("12345"),
        level: "User",
        image: "user.png"
    };
    await db.user.createMany({
        data: [
            ...(Array(4).fill(null).map((_, i) => ({
                id: i + 2, // i=0 + 2 -> 2, 3, 4, 5
                name: `User ${i + 2}`,
                username: `${i + 2}User`,
                ...puser,
            }))),
        ],
    });

    const pkostum: Pick<kostum, "image" | "kset" | "link" | "origin" | "preference"> = {
        image: "a-file.png",
        kset: "armor, hat, sword",
        link: "https://",
        origin: "anywhere",
        preference: "Anime",
    };
    await db.kostum.createMany({
        data: [
            ...([
                [1, 'Raiden Shogun'],
                [5, 'Zhongli'],
                [6, 'Childe'],
                [7, 'Power'],
                [8, 'Chainsaw Man'],
                [9, 'Ai Hoshino'],
                [10, 'Vestia Zeta'],
                [11, 'Gawr Gura'],
                [12, 'Kobo Kanaeru'],
                [13, 'Kizuna AI'],
                [14, 'Kostum A'],
            ].map((x) => ({
                id: x[0] as number,
                name: x[1] as string,
                ...pkostum,
            }))),
        ],
    });

    await db.rvalues.createMany({
        data: [
            ...([
                [5, 9],
                [5,  3],
                [5,  14],
                [5,  18],
                [5,  24],
                [6,  9],
                [6,  2],
                [6,  13],
                [6,  19],
                [6,  23],
                [7,  10],
                [7,  1],
                [7,  12],
                [7,  20],
                [7,  23],
                [8,  6],
                [8,  5],
                [8,  15],
                [8,  16],
                [8,  24],
                [9,  9],
                [9,  2],
                [9,  13],
                [9,  18],
                [9,  23],
                [10, 9],
                [10, 3],
                [10, 14],
                [10, 17],
                [10, 23],
                [11, 10],
                [11, 1],
                [11, 13],
                [11, 20],
                [11, 23],
                [12, 9],
                [12, 3],
                [12, 13],
                [12, 17],
                [12, 24],
                [13, 8],
                [13, 4],
                [13, 13],
                [13, 18],
                [13, 22],
                [1, 8],
                [1, 4],
                [1, 15],
                [1, 17],
                [1, 25]
            ].map(x => ({
                user_id: 3,
                kostum_id: x[0] as number,
                subkriteria_id: x[1] as number,
            }))),
        ],
    });
}

void upsert();