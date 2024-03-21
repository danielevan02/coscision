import { type NextApiRequest, type NextApiResponse, type PageConfig } from "next";
import formidable from "formidable";
import crypto from "crypto";
import { join } from "path";
import { renameSync } from "fs";
import { env } from "~/env";

/**
 * upload to a file field name `file`.
 */
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") return res.status(405);

    const form = formidable({
        uploadDir: join(process.cwd(), `public/upload/temp`)
    });
    const [, files] = await form.parse(req);

    const file = files.file?.[0];
    if (!file) return res.status(400).json({ name: null });

    const newName = `${new Date().getTime() + (3 * 60 * 60)}-${crypto.randomInt(1000, 9999)}_${file.originalFilename}`;
    if (env.UPLOAD_STORAGE.startsWith("local-")) 
        renameSync(file.filepath, join(process.cwd(), `public/upload/temp`, newName));

    res.json({ name: newName });
}


export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};