/* eslint-disable @typescript-eslint/ban-ts-comment */

import { db } from "~/server/db";
import { hash } from "~/server/utils";

async function upsert() {
    await db.user.createMany({
        data: [
            {
                name: "Administrator",
                username: "Admin",
                password: await hash("12345"),
                level: "Admin",
                image: "admin.png"
            },
        ],
    });

    await db.kriteria.createMany({
        data: [
            {
                id: 2,
                name: "Harga Sewa",
                ktype: "Cost",
                weight: 35,
            },
            {
                id: 3,
                name: "Kualitas Kostum",
                ktype: "Benefit",
                weight: 20,
            },
            {
                id: 4,
                name: "Desain Kostum",
                ktype: "Benefit",
                weight: 20,
            },
            {
                id: 5,
                name: "Fleksibilitas Kostum",
                ktype: "Benefit",
                weight: 15,
            },
            {
                id: 7,
                name: "Popularitas Karakter",
                ktype: "Benefit",
                weight: 10,
            },
        ],
    });

    await db.subkriteria.createMany({
        data: [
            { id: 1, kriteria_id: 3, name: "Sangat Buruk", skvalue: 1 },
            { id: 2, kriteria_id: 3, name: "Buruk", skvalue: 2 },
            { id: 3, kriteria_id: 3, name: "Cukup", skvalue: 3 },
            { id: 4, kriteria_id: 3, name: "Baik", skvalue: 4 },
            { id: 5, kriteria_id: 3, name: "Sangat Baik", skvalue: 5 },
            { id: 6, kriteria_id: 2, name: "> 500.000", skvalue: 1 },
            { id: 7, kriteria_id: 2, name: "400.001 - 500.000", skvalue: 2 },
            { id: 8, kriteria_id: 2, name: "300.001 - 400.000", skvalue: 3 },
            { id: 9, kriteria_id: 2, name: "200.001 - 300.000", skvalue: 4 },
            { id: 10, kriteria_id: 2, name: "< 200.000", skvalue: 5 },
            { id: 11, kriteria_id: 4, name: "Tidak Menarik", skvalue: 1 },
            { id: 12, kriteria_id: 4, name: "Kurang Menarik", skvalue: 2 },
            { id: 13, kriteria_id: 4, name: "Biasa Saja", skvalue: 3 },
            { id: 14, kriteria_id: 4, name: "Menarik", skvalue: 4 },
            { id: 15, kriteria_id: 4, name: "Sangat Menarik", skvalue: 5 },
            { id: 16, kriteria_id: 5, name: "Tidak Nyaman Dipakai", skvalue: 1 },
            { id: 17, kriteria_id: 5, name: "Kurang Nyaman Dipakai", skvalue: 2 },
            { id: 18, kriteria_id: 5, name: "Netral", skvalue: 3 },
            { id: 19, kriteria_id: 5, name: "Nyaman Dipakai", skvalue: 4 },
            { id: 20, kriteria_id: 5, name: "Sangat Nyaman Dipakai", skvalue: 5 },
            { id: 21, kriteria_id: 7, name: "Tidak Terkenal", skvalue: 1 },
            { id: 22, kriteria_id: 7, name: "Kurang Terkenal", skvalue: 2 },
            { id: 23, kriteria_id: 7, name: "Biasa Saja", skvalue: 3 },
            { id: 24, kriteria_id: 7, name: "Cukup Terkenal", skvalue: 4 },
            { id: 25, kriteria_id: 7, name: "Sangat Terkenal", skvalue: 5 }
        ],
    });
}

void upsert();