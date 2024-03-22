import { Box, Button, MenuItem, Snackbar, TextField } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { type ChangeEvent, useState } from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { env } from '~/env'
import { api } from '~/utils/api'

type KostumForm = {
  asal: string
  preferensi: 'Game' | 'Vtuber' | 'Anime'
  set: string
  link: string
  nama: string
  gambar: string
}

const AddKostum = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string)
  const { data } = api.kostum.getKostum.useQuery(id)
  const { mutate } = api.kostum.updateKostum.useMutation()
  const [file, setFile] = useState('')
  const [preview, setPreview] = useState('')
  const [counter, setCounter] = useState(false)

  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<KostumForm>()

  if (data) {
    setValue('asal', data.origin)
    setValue('gambar', data.image)
    setValue('link', data.link)
    setValue('nama', data.name)
    setValue('preferensi', data.preference)
    setValue('set', data.kset)
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0]
      setFile(image as unknown as string)
      setPreview(URL.createObjectURL(image!))
    }
    setCounter(true)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onError = (errors: FieldErrors<KostumForm>) => {
    if (errors) {
      alert("Harap isi semua data dengan benar")
    }
  }

  const onSubmit = async () => {
    try {
      if (counter) {
        if (!file) {
          alert("File is not exist")
          return
        }
        const formData = new FormData()
        formData.append('file', file)

        await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        }).then((res) => res.json())
          .then((data) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            setValue('gambar', data.nama as string)
            mutate({
              name: getValues('nama'),
              kset: getValues('set'),
              link: getValues('link'),
              origin: getValues('asal'),
              preference: getValues('preferensi'),
              image: getValues('gambar'),
              id: id
            })
          })
      } else {
        mutate({
          name: getValues('nama'),
          kset: getValues('set'),
          link: getValues('link'),
          origin: getValues('asal'),
          preference: getValues('preferensi'),
          id: id
        })
      }
      await router.push('/kostum')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Coscision - Kostum</title>
      </Head>
      <Box sx={{ px: 5, py: 3 }}>
        <form id='formKostum' onSubmit={handleSubmit(onSubmit, onError)} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <TextField fullWidth InputLabelProps={{ shrink: true }} label="Nama Kostum" sx={{ background: 'white', borderRadius: 1 }} {...register('nama', { required: true })} />
          <TextField fullWidth InputLabelProps={{ shrink: true }} label="Asal" sx={{ background: 'white', borderRadius: 1 }} {...register('asal', { required: true })} />
          <TextField fullWidth InputLabelProps={{ shrink: true }} value={getValues('preferensi')} label="Preferensi" sx={{ background: 'white', borderRadius: 1 }} {...register('preferensi', { required: true })} select>
            <MenuItem value={""}><em>None</em></MenuItem>
            <MenuItem value={"Game"}>Game</MenuItem>
            <MenuItem value={"Anime"}>Anime</MenuItem>
            <MenuItem value={"Vtuber"}>Vtuber</MenuItem>
          </TextField>
          <TextField fullWidth InputLabelProps={{ shrink: true }} label="Set" rows={3} multiline sx={{ background: 'white', borderRadius: 1 }} {...register('set', { required: true })} />
          <TextField fullWidth InputLabelProps={{ shrink: true }} label="Link" sx={{ background: 'white', borderRadius: 1 }} {...register('link', { required: true })} />
        </form>
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          <label style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 600, marginTop: 10, marginBottom: 5 }}>Gambar Kostum</label>
          <Box sx={{ display: 'flex', flexDirection: { mobile: 'column', laptop: 'row' } }}>
            <input type="file" accept='image/*' style={{ width: '15%' }} onChange={handleFileChange} />
            {preview ?
              <Box sx={{ width: { mobile: '40%', laptop: '20%' } }}>
                <Image src={preview} alt='gambar' width={800} height={800} style={{ width: '100%', height: 'auto', borderRadius: 20 }} />
              </Box>
              : 
              <Box sx={{ width: { mobile: '40%', laptop: '20%' } }}>
                <Image src={`${env.NEXT_PUBLIC_UPLOAD_BASE}${getValues('gambar')}`} alt='gambar' width={800} height={800} style={{ width: '100%', height: 'auto', borderRadius: 20 }} />
              </Box>
            }
          </Box>
        </Box>
        <Box display={'flex'} gap={1} mt={5} justifyContent={'end'}>
          <Link href={'/kostum'}>
            <Button variant='contained' color='error'>Cancel</Button>
          </Link>
          <Button variant='contained' form='formKostum' color='primary' type='submit'>Submit</Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Submit Success"
            sx={{ width: '20%' }}
          />
        </Box>
      </Box>
    </>
  )
}

export default AddKostum