import { KostumPreference } from "@prisma/client";
import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { stat } from "fs/promises";
import { join } from "path";

const x = Object.keys(KostumPreference);

export const kostumRouter = createTRPCRouter({
    addKostum: adminProcedure.input(z.object({
            name: z.string(),
            image: z.string().refine(async (name) => {
                try {
                    const file = await stat(join(process.cwd(), `public/upload/${name}`));
                    if (file.isFile()) return true;
                    else return false;
                } catch (e) {
                    return false;
                }
            }, {
                message: "upload file not found",
            }),
            link: z.string(),
            origin: z.string(),
            preference: z.enum(["Game", "Anime", "Vtuber"]),
            kset: z.string().array(),
        })).mutation(({ ctx: { db }, input }) => 
            db.kostum.create({
                data: {
                    ...input,
                    kset: JSON.stringify(input.kset),
                },
            })
        ),
    updateKostum: adminProcedure.input(z.void()).mutation(() => null),
    deleteKostum: adminProcedure.input(z.number())
        .mutation(({ ctx: { db }, input }) => db.kostum.delete({
            where: {
                id: input,
            },
        })),
    getKostum: publicProcedure.input(z.number())
        .mutation(({ ctx: { db }, input }) => db.kostum.findFirstOrThrow({
            where: {
                id: input,
            },
        })),
    getKostums: publicProcedure.input(z.object({
            //
        })).mutation(() => null),
});