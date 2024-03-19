import { Box, Button, MenuItem, Snackbar, TextField } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'

type KostumForm = {
  asal: string
  preferensi: string
  set: string
  gambar: string
  link: string
}

const CrudKostum = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { 
    register, 
    handleSubmit,
  } = useForm<KostumForm>()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onError = (errors: FieldErrors<KostumForm>) => {
    if(errors){
      alert("Harap isi semua data dengan benar")
    }
  }

  const onSubmit = async (data: KostumForm) => {
    console.log(data)
    setOpen(true)
    await router.push('/kostum')
  }
  
  return (
    <>
      <Head>
        <title>Coscision - Kostum</title>
      </Head>
      <Box sx={{ px: 5, py: 3 }}>
        <form onSubmit={handleSubmit(onSubmit, onError)} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <TextField fullWidth label="Asal" sx={{ background: 'white', borderRadius: 1 }} {...register('asal', {required: true})} />
          <TextField fullWidth label="Preferensi" sx={{ background: 'white', borderRadius: 1 }} {...register('preferensi', {required: true})} select>
            <MenuItem value={""}><em>None</em></MenuItem>
            <MenuItem value={"game"}>Game</MenuItem>
            <MenuItem value={"anime"}>Anime</MenuItem>
            <MenuItem value={"vtuber"}>Vtuber</MenuItem>
          </TextField>
          <TextField fullWidth label="Set" rows={4} multiline sx={{ background: 'white', borderRadius: 1 }} {...register('set', {required: true})} />
          <TextField fullWidth label="Link" sx={{ background: 'white', borderRadius: 1 }} {...register('link', {required: true})} />
          <input type="file" accept='image/*' {...register('gambar', {required: true})} />
          <Box display={'flex'} gap={1} justifyContent={'end'} mt={3}>
            <Link href={'/kostum'}>
              <Button variant='contained' color='error'>Cancel</Button>
            </Link>
            <Button variant='contained' color='primary' type='submit'>Submit</Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Submit Success"
              sx={{width: '20%'}}
            />
          </Box>
        </form>
      </Box>
    </>
  )
}

export default CrudKostum