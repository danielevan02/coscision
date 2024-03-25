import { completeMultipartUpload, createMultipartUpload, createMultipartUploader, uploadPart } from "@vercel/blob";
import { copy, del, getDownloadUrl, head, list, put, } from "@vercel/blob";
import { env } from "~/env";

const longDiv = () => console.log("===== ========== ========== ========== ========== =====");
const shortDiv = () => console.log("===== ==========");

async function list_all() {
    const list_expanded = await list({
        mode: "expanded",
    });

    console.log(list_expanded);

    shortDiv();
    const list_folded = await list({
        mode: "folded",
    });

    console.log(list_folded);
}

async function delAll() {
    const list_expanded = await list({
        mode: "expanded",
    });

    for (const file of list_expanded.blobs) {
        await del(file.url);
    }
}

async function get_head() {
    // const filename_a = "/upload/temp/1711352035308-3402_3911356_cb8d8ea5-089b-4cb1-bc67-9776ed7b210b_710_710-5rIFSmGtC9AfaWVPM0tKuvnJVsPPGj.jpg";
    // const filename_a = "https://hfgjqu51hy01xqh3.public.blob.vercel-storage.com/upload/temp/1711352035308-3402_3911356_cb8d8ea5-089b-4cb1-bc67-9776ed7b210b_710_710-5rIFSmGtC9AfaWVPM0tKuvnJVsPPGj.jpg";
    const filename_a = env.NEXT_PUBLIC_UPLOAD_BASE + "temp/1711352035308-3402_3911356_cb8d8ea5-089b-4cb1-bc67-9776ed7b210b_710_710-5rIFSmGtC9AfaWVPM0tKuvnJVsPPGj.jpg";

    const filename_b = "/upload/temp/1711350372889-1944_3911356_cb8d8ea5-089b-4cb1-bc67-9776ed7b210b_710_710.jpg";

    console.log(filename_a);

    const file_a = await head(filename_a);
    
    // console.log(env.NEXT_PUBLIC_UPLOAD_BASE + "temp/1711352035308-3402_3911356_cb8d8ea5-089b-4cb1-bc67-9776ed7b210b_710_710.jpg");
    console.log(file_a);
}

(async () => {
    await list_all();
    await delAll();
    await list_all();
    // await get_head();
})();