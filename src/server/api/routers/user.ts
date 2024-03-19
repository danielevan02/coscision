import { z } from "zod";
import { createTRPCRouter, guestProcedure } from "~/server/api/trpc";
import { hash } from "~/server/utils";

export const userRouter = createTRPCRouter({
    register: guestProcedure.input(z.object({
            name: z.string(),
            username: z.string(),
            password: z.string(),
        })).mutation(async ({ ctx: { db }, input: { name, username, password } }) => db.user.create({
            data: {
                name,
                username,
                password: await hash(password),
            }
        })),
});