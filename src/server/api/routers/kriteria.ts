import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const kriteriaRouter = createTRPCRouter({
    addKriteria: adminProcedure.input(z.object({
            name: z.string(),
            weight: z.string(),
            ktype: z.enum(["Cost", "Benefit"]),
        })).mutation(({ ctx: { db, }, input }) => db.kriteria.create({
            data: {
                name: input.name,
                weight: parseInt(input.weight),
                ktype: input.ktype,
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
            kriteria_id: z.string(),
            name: z.string(),
            skvalue: z.string(),
        })).mutation(({ ctx: { db }, input }) => db.subkriteria.create({
            data: {
                name: input.name,
                skvalue: parseInt(input.skvalue),
                kriteria_id: parseInt(input.kriteria_id)
            },
        })),
    /**
     * cannot update kriteria_id. It should be deleted and add new subkriteria.
     */
    updateSubkriteria: adminProcedure.input(z.object({
            id: z.number(),
            name: z.string().optional(),
            skvalue: z.string().optional(),
        })).mutation(({ ctx: { db, }, input: { id, ...input } }) => db.subkriteria.update({
            where: { id, },
            data: {
                name: input.name,
                skvalue: parseInt(input.skvalue!)
            },
        })),
    deleteSubkriteria: adminProcedure.input(z.number())
        .mutation(({ ctx: { db }, input }) => db.subkriteria.delete({
            where: { id: input, },
        })),
    getKriterias: publicProcedure.input(z.object({
        }).nullish().or(z.void()))
        .query(({ ctx: { db }, }) => db.kriteria.findMany()),
    getKriteria: publicProcedure.input(z.number())
        .query(({ ctx: { db }, input }) => db.kriteria.findFirstOrThrow({
            where: { id: input, },
        })),
    getSubkriterias: publicProcedure.input(z.number())
        .query(({ ctx: { db }, input }) => db.subkriteria.findMany({
            where: { kriteria_id: input, },
            orderBy: {
                skvalue: "asc"
            }
        })),
    getSubkriteria: publicProcedure.input(z.number())
        .query(({ ctx: { db }, input }) => db.subkriteria.findFirstOrThrow({
            where: { id: input, }
        })), 
});