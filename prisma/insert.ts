/* eslint-disable @typescript-eslint/ban-ts-comment */

import { db } from "~/server/db";
import bcrypt from "bcrypt";

const hash = async (password: string) => bcrypt.hash(password, await bcrypt.genSalt(10));

async function upsert() {
    await db.user.createMany({
        data: [
            {
                id: 1,
                name: "Administrator",
                username: "Admin",
                password: await hash("12345"),
                level: "Admin",
            },
        ],
    });
}

void upsert();