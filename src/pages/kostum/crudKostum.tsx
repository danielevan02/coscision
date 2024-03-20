import { Box, Button, MenuItem, Snackbar, TextField } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { api } from '~/utils/api'

type KostumForm = {
  asal: string
  preferensi: 'Game' | 'Vtuber' | 'Anime'
  set: string
  gambar: string
  link: string
  nama: string
}

const CrudKostum = () => {
  const router = useRouter()
  const { mutate } = api.kostum.addKostum.useMutation()
  const [open, setOpen] = useState(false)
  const { 
    register, 
    handleSubmit,
    getValues
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

  const onSubmit = async () => {
    try {
      mutate({
        name: getValues('nama'),
        image: getValues('gambar'),
        kset: getValues('set'),
        link: getValues('link'),
        origin: getValues('asal'),
        preference: getValues('preferensi')
      })
    } catch (error) {
      console.log(error)
    }
    // await router.push('/kostum')
  }
  
  return (
    <>
      <Head>
        <title>Coscision - Kostum</title>
      </Head>
      <Box sx={{ px: 5, py: 3 }}>
        <form onSubmit={handleSubmit(onSubmit, onError)} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <TextField fullWidth size='small' label="Nama Kostum" sx={{ background: 'white', borderRadius: 1 }} {...register('nama', {required: true})} />
          <TextField fullWidth size='small' label="Asal" sx={{ background: 'white', borderRadius: 1 }} {...register('asal', {required: true})} />
          <TextField fullWidth size='small' label="Preferensi" sx={{ background: 'white', borderRadius: 1 }} {...register('preferensi', {required: true})} select>
            <MenuItem value={""}><em>None</em></MenuItem>
            <MenuItem value={"Game"}>Game</MenuItem>
            <MenuItem value={"Anime"}>Anime</MenuItem>
            <MenuItem value={"Vtuber"}>Vtuber</MenuItem>
          </TextField>
          <TextField fullWidth label="Set" rows={3} multiline sx={{ background: 'white', borderRadius: 1 }} {...register('set', {required: true})} />
          <TextField fullWidth size='small' label="Link" sx={{ background: 'white', borderRadius: 1 }} {...register('link', {required: true})} />
          <label style={{color: 'rgba(0, 0, 0, 0.8)', fontWeight: 600}}>Gambar Kostum</label>
          <Box display={'flex'} gap={1} justifyContent={'end'}>
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
      <input type="file" accept='image/*' {...register('gambar', {required: true})} />
      </Box>
    </>
  )
}

export default CrudKostum