import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const kriteriaRouter = createTRPCRouter({
    addKriteria: adminProcedure.input(z.object({
            name: z.string(),
            weight: z.number(),
            ktype: z.enum(["Cost", "Benefit"]),
        })).mutation(({ ctx: { db, }, input }) => db.kriteria.create({
            data: {
                ...input,
            }
        })),
    updateKriteria: adminProcedure.input(z.object({
            id: z.number(),
            name: z.string().optional(),
            weight: z.number().optional(),
            ktype: z.enum(["Cost", "Benefit"]).optional(),
        })).mutation(({ ctx: { db, }, input: { id, ...input } }) => db.kriteria.update({
            where: { id, },
            data: {
                ...input,
            }
        })),
    deleteKriteria: adminProcedure.input(z.number())
        .mutation(({ ctx: { db }, input }) => db.kriteria.findFirstOrThrow({
            where: { id: input, },
        })),

    addSubkriteria: adminProcedure.input(z.object({
            kriteria_id: z.number(),
            name: z.string(),
            skvalue: z.number(),
        })).mutation(({ ctx: { db }, input }) => db.subkriteria.create({
            data: {
                ...input,
            },
        })),
    /**
     * cannot update kriteria_id. It should be deleted and add new subkriteria.
     */
    updateSubkriteria: adminProcedure.input(z.object({
            id: z.number(),
            name: z.string().optional(),
            skvalue: z.number().optional(),
        })).mutation(({ ctx: { db, }, input: { id, ...input } }) => db.subkriteria.update({
            where: { id, },
            data: {
                ...input,
            },
        })),
    deleteSubkriteria: adminProcedure.input(z.number())
        .mutation(({ ctx: { db }, input }) => db.subkriteria.delete({
            where: { id: input, },
        })),

    getKriterias: publicProcedure.input(z.object({
            //
        }).nullish().or(z.void()))
        .query(({ ctx: { db }, }) => db.kriteria.findMany({
            include: { subkriteria: true, },
        })),
    getKriteria: publicProcedure.input(z.number())
        .query(({ ctx: { db }, input }) => db.kriteria.findFirstOrThrow({
            where: { id: input, },
            include: { subkriteria: true, },
        })),
    getSubkriteria: publicProcedure.input(z.number())
        .query(({ ctx: { db }, input }) => db.subkriteria.findFirstOrThrow({
            where: { id: input, },
            include: { kriteria: true, },
        })),
});