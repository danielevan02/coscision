/* eslint-disable @typescript-eslint/ban-ts-comment */

import { User, kostum } from "@prisma/client";
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
                id: i + 2, // i=0 + 2 -> 2++
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
}

void upsert();