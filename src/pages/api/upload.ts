import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import formidable from "formidable";
import crypto from "crypto";
import { dirname, join } from "path";
import { renameSync } from "fs";
import { env } from "~/env";

/**
 * upload to a file field name `file`.
 */
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const form = formidable({});
    const [, files] = await form.parse(req);

    const file = files.file?.[0];
    if (!file) return res.status(400).json({ name: null });

    const newName = `${new Date().getTime() + (3 * 60 * 60)}-${crypto.randomInt(1000, 9999)}_${file.originalFilename}`;
    if (env.UPLOAD_STORAGE.startsWith("local-")) 
        renameSync(file.filepath, join(process.cwd(), `public/upload/${newName}`));

    res.json({ name: newName });
}


export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};