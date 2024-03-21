import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { api } from "~/utils/api";

export default function TestUploadCostum() {
    const { register, watch, setValue, getValues } = useForm<{
        name: string;
        image: string;
        link: string;
        origin: string;
        preference: string;
        kset: string;
    }>();
    const [file, setFile] = useState<File>();

    const { mutateAsync: addKostum, status, ...resp } = api.kostum.addKostum.useMutation();

    useEffect(() => {
        console.log(file);
        const x = watch((val, {name, type: xtype}) => {
            console.log(val, name, xtype);
        });
        console.log(status, resp);
        () => x.unsubscribe();
    }, [file, watch, status]);

    const uploadFile = async () => {
        if (!file) alert("No Files");
        const data = new FormData();
        data.append("file", file!);
        try {
            const fe = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            const json = await fe.json();
            const name = json.name as string;
            console.log(name, json);
            setValue("image", name, { shouldDirty: true, shouldTouch: true });
        } catch (e) {
            console.log(e);
        }
    }

    return <>
        <Box sx={{ px: 5, py: 2, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Box sx={{ mt: 10, }}>
                <input type="file" onChange={(ev) => setFile(ev.target?.files?.[0])} />
                <Button variant="contained" onClick={uploadFile}>Send</Button>
            </Box>
            <Box sx={{ mt: 10, }}>
                <TextField id="outlined-basic" label="name" variant="outlined" { ...register("name") } />
                <TextField id="outlined-basic" label="image" variant="outlined" { ...register("image") } />
                <TextField id="outlined-basic" label="link" variant="outlined" { ...register("link") } />
                <TextField id="outlined-basic" label="origin" variant="outlined" { ...register("origin") } />
                <TextField id="outlined-basic" label="preference" variant="outlined" { ...register("preference") } />
                <TextField id="outlined-basic" label="kset" variant="outlined" { ...register("kset") } />
                <Button variant="contained" onClick={() => void addKostum({
                    image: getValues("image"),
                    kset: getValues("kset"),
                    link: getValues("link"),
                    name: getValues("name"),
                    origin: getValues("origin"),
                    preference: getValues("preference") as ("Game" | "Anime" | "Vtuber"),
                })}>Send</Button>
            </Box>
        </Box>
    </>;
}