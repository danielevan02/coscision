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
            {
                id: 2,
                name: "A User",
                username: "AUser",
                ...puser,
            },
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
            {
                id: 1,
                name: "A Kostum A",
                ...pkostum,
            },
        ],
    }),
}

void upsert();