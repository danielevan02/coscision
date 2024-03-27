import { type NextApiRequest, type NextApiResponse, type PageConfig } from "next";
import formidable from "formidable";
import crypto from "crypto";
import { basename, join } from "path";
import { rename, rm, readFile } from "fs/promises";
import { env } from "~/env";
import os from "os";
import { put } from '@vercel/blob';

/**
 * upload to a file field name `file`.
 */
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    // if (req.method.toLowerCase() != "POST".toLowerCase()) return res.status(405);

    const ret: Record<string, unknown> = {};

    const form = formidable({
        uploadDir: env.UPLOAD_STORAGE == "vercel-storage" ? os.tmpdir() : join(process.cwd(), `public/upload/temp`),
        // uploadDir: join(process.cwd(), `public/upload/temp`),
    });
    const [, files] = await form.parse(req);

    const file = files.file?.[0];
    if (!file) return res.status(400).json({ name: null });

    const newName = `${new Date().getTime() + (3 * 60 * 60)}-${crypto.randomInt(1000, 9999)}_${file.originalFilename}`;
    if (env.UPLOAD_STORAGE.startsWith("local-")) {
        await rename(file.filepath, join(process.cwd(), `public/upload/temp`, newName));
        ret.name = newName;
    }
    else if (env.UPLOAD_STORAGE == "vercel-storage") {
        const hasPut = await put(join(`upload/temp`, newName).replaceAll("\\", "/"), await readFile(file.filepath), {
            access: "public"
        });
        ret.blob = hasPut;
        ret._name = newName;

        const url = new URL(hasPut.url);
        ret.name = basename(url.pathname);
        ret._url = url;

        await rm(join(file.filepath));
    }
    res.json(ret);
}


export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};
