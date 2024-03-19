/* eslint-disable @typescript-eslint/ban-ts-comment */

import { db } from "~/server/db";
import { hash } from "~/server/utils";

async function upsert() {
    await db.user.createMany({
        data: [
            {
                id: 1,
                name: "Administrator",
                username: "Admin",
                password: await hash("12345"),
                level: "Admin",
                image: "admin.png"
            },
        ],
    });
}

void upsert();