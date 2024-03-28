import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { rename, stat, } from "fs/promises";
import { basename, join } from "path";
import { env } from "~/env";
import { copy, del, head } from '@vercel/blob';

export const kostumRouter = createTRPCRouter({
	//UNTUK ADD KOSTUM
	addKostum: adminProcedure.input(z.object({
		name: z.string(),
		image: z.string().refine(async (image) => {
			try {
				if (env.UPLOAD_STORAGE.startsWith("local-")) {
					const file = await stat(join(process.cwd(), `public/upload/temp`, image));
					if (file.isFile()) return true;
					else return false;
				} else if (env.UPLOAD_STORAGE == "vercel-storage") {
					// const url = new URL(name, env.NEXT_PUBLIC_UPLOAD_BASE + "temp/");
					// const filename = url.href.replaceAll(url.search, "").replaceAll(url.hash, "");
					const file = await head(env.NEXT_PUBLIC_UPLOAD_BASE + "temp/" + image);
					return true;
				}
			} catch (e) {
				return false;
			}
		}, {
			message: "upload file not found or error",
		}),
		link: z.string(),
		origin: z.string(),
		preference: z.enum(["Game", "Anime", "Vtuber"]),
		kset: z.string(),
	})).mutation(async ({ ctx: { db }, input: { ...input } }) => {
		if (env.UPLOAD_STORAGE.startsWith("local-")) {
			await rename(join(process.cwd(), "public/upload/temp", input.image), join(process.cwd(), "public/upload", input.image))
		} else if (env.UPLOAD_STORAGE == "vercel-storage") {
			const urlTemp = env.NEXT_PUBLIC_UPLOAD_BASE + "temp/" + input.image;
			const file = await copy(urlTemp, "upload/" + input.image, {
				access: "public",
			});
			const url = new URL(file.url);
        	input.image = basename(url.pathname);
			await del(urlTemp);
		}

		return await db.kostum.create({
			data: {
				...input,
			},
		});
	}),
	//UNTUK UPDATE KOSTUM
	updateKostum: adminProcedure.input(z.object({
		id: z.number(),
		name: z.string().optional(),
		image: z.string().refine(async (name) => {
			try {
				const file = await stat(join(process.cwd(), `public/upload/temp`, name));
				if (file.isFile()) return true;
				else return false;
			} catch (e) {
				return false;
			}
		}, {
			message: "upload file not found",
		}).optional(),
		link: z.string().optional(),
		origin: z.string().optional(),
		preference: z.enum(["Game", "Anime", "Vtuber"]).optional(),
		kset: z.string().optional(),
	})).mutation(async ({ ctx: { db }, input: { id, ...input } }) => {
			if (input.image && env.UPLOAD_STORAGE.startsWith("local-")) {
				await rename(join(process.cwd(), "public/upload/temp", input.image), join(process.cwd(), "public/upload", input.image))
		}
            return await db.kostum.update({
                where: { id, },
                data: {
                    ...input,
                },
            })
        }),
		//UNTUK DELETE KOSTUM
    deleteKostum: adminProcedure.input(z.number())
        .mutation(({ ctx: { db }, input }) => db.kostum.delete({
            where: { id: input, },
        })),
		//UNTUK MENGAMBIL DATA 1 KOSTUM BERDASARKAN ID
    getKostum: publicProcedure.input(z.number())
        .query(({ ctx: { db }, input }) => db.kostum.findFirstOrThrow({
            where: { id: input, },
        })),
		//UNTUK MENGAMBIL DATA SEMUA KOSTUM
    getKostums: publicProcedure.input(z.object({
            rank: z.boolean().default(false),
            name: z.string().optional(),
            link: z.string().optional(),
            origin: z.string().optional(),
        }).default({}))
        .query(({ ctx: { db }, }) => db.kostum.findMany({
						orderBy: {
							id: "asc"
						}
        })),
});