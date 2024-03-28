import { Box, Button, MenuItem, Snackbar, TextField } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { type ChangeEvent, useState } from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { api } from '~/utils/api'

type KostumForm = {
  asal: string
  preferensi: 'Game' | 'Vtuber' | 'Anime'
  set: string
  link: string
  nama: string
}

const AddKostum = () => {
  const router = useRouter()
  const [file, setFile] = useState('')
  const [preview, setPreview] = useState('')
  const { mutate } = api.kostum.addKostum.useMutation()
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    getValues
  } = useForm<KostumForm>()

  // UNTUK HANDLE GAMBAR
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0]
      setFile(image as unknown as string)
      setPreview(URL.createObjectURL(image!))
    }
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
      if (!file) {
        alert("File gambar tidak ada  ")
        return
      }
      const formData = new FormData()
      formData.append('file', file)

      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json())
        .then((data) => {
          mutate({
            name: getValues('nama'),
            kset: getValues('set'),
            link: getValues('link'),
            origin: getValues('asal'),
            preference: getValues('preferensi'),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            image: data.name as string
          })
        })
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
          <TextField fullWidth label="Nama Kostum" sx={{ background: 'white', borderRadius: 1 }} {...register('nama', { required: true })} />
          <TextField fullWidth label="Asal" sx={{ background: 'white', borderRadius: 1 }} {...register('asal', { required: true })} />
          <TextField fullWidth label="Preferensi" sx={{ background: 'white', borderRadius: 1 }} {...register('preferensi', { required: true })} select>
            <MenuItem value={""}><em>None</em></MenuItem>
            <MenuItem value={"Game"}>Game</MenuItem>
            <MenuItem value={"Anime"}>Anime</MenuItem>
            <MenuItem value={"Vtuber"}>Vtuber</MenuItem>
          </TextField>
          <TextField fullWidth label="Set" rows={3} multiline sx={{ background: 'white', borderRadius: 1 }} {...register('set', { required: true })} />
          <TextField fullWidth label="Link" sx={{ background: 'white', borderRadius: 1 }} {...register('link', { required: true })} />
        </form>
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          <label style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 600, marginTop: 10, marginBottom: 5 }}>Gambar Kostum</label>
          <Box sx={{ display: 'flex', flexDirection: { mobile: 'column', laptop: 'row' } }}>
            <input type="file" accept='image/*' style={{ width: '15%' }} onChange={handleFileChange} />
            {preview ?
              <Box sx={{ width: { mobile: '40%', laptop: '20%' } }}>
                <Image src={preview} alt='gambar' width={800} height={800} style={{ width: '100%', height: 'auto', borderRadius: 20 }} />
              </Box>
              : undefined
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

/**
 * import { Box, Button, MenuItem, Snackbar, TextField } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { type ChangeEvent, useState } from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
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
  const [file, setFile] = useState('')
  const [validate, setValidate] = useState<boolean>(false)
  const [preview, setPreview] = useState('')
  const { mutate } = api.kostum.addKostum.useMutation()
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    setValue
  } = useForm<KostumForm>()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0]
      setFile(image as unknown as string)
      setPreview(URL.createObjectURL(image!))
    }
  }

  const handleImageUpload = async () => {
    if (!file) {
      alert("File gambar tidak tersedia")
      return
    }
    const formData = new FormData()
    formData.append('file', file)

    const filename = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const json = await filename.json() as string
    //@ts-expect-error can't type assertion name
    const name = json.name as string
    setValue('gambar', name, { shouldDirty: true, shouldTouch: true })
    setValidate(true)
    setOpen1(true)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleClose1 = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  const onError = (errors: FieldErrors<KostumForm>) => {
    if (errors) {
      alert("Harap isi semua data dengan benar")
    }
  }

  const onSubmit = async () => {
    try {
      if (!file || validate === false) {
        alert("File gambar tidak tersedia atau anda belum klik tombol SELECT")
        return
      }
      mutate({
        name: getValues('nama'),
        kset: getValues('set'),
        link: getValues('link'),
        origin: getValues('asal'),
        preference: getValues('preferensi'),
        image: getValues('gambar')
      })
      setOpen(true)
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
          <TextField fullWidth label="Nama Kostum" sx={{ background: 'white', borderRadius: 1 }} {...register('nama', { required: true })} />
          <TextField fullWidth label="Asal" sx={{ background: 'white', borderRadius: 1 }} {...register('asal', { required: true })} />
          <TextField fullWidth label="Preferensi" sx={{ background: 'white', borderRadius: 1 }} {...register('preferensi', { required: true })} select>
            <MenuItem value={""}><em>None</em></MenuItem>
            <MenuItem value={"Game"}>Game</MenuItem>
            <MenuItem value={"Anime"}>Anime</MenuItem>
            <MenuItem value={"Vtuber"}>Vtuber</MenuItem>
          </TextField>
          <TextField fullWidth label="Set" rows={3} multiline sx={{ background: 'white', borderRadius: 1 }} {...register('set', { required: true })} />
          <TextField fullWidth label="Link" sx={{ background: 'white', borderRadius: 1 }} {...register('link', { required: true })} />
        </form>
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          <label style={{ color: 'rgba(0, 0, 0, 0.8)', fontWeight: 600, marginTop: 10, marginBottom: 5 }}>Gambar Kostum</label>
          <Box sx={{ display: 'flex', flexDirection: { mobile: 'column', laptop: 'row' }}} gap={1}>
            <Box width={'15%'} display={'flex'} flexDirection={'column'} gap={1}>
              <input type="file" accept='image/*' onChange={handleFileChange} />
              {file ? <Button onClick={handleImageUpload} variant='contained'>select</Button>:undefined}
            </Box>
            {preview ?
              <Box sx={{ width: { mobile: '40%', laptop: '20%' } }}>
                <Image src={preview} alt='gambar' width={800} height={800} style={{ width: '100%', height: 'auto', borderRadius: 20 }} />
              </Box>
              : undefined
            }
          </Box>
        </Box>
        <Box display={'flex'} gap={1} mt={5} justifyContent={'end'}>
          <Link href={'/kostum'}>
            <Button variant='contained' color='error'>Cancel</Button>
          </Link>
          <Button variant='contained' form='formKostum' color='primary' type='submit'>Submit</Button>
        </Box>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Submit Success"
            sx={{ width: '20%' }}
          />
          <Snackbar
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose1}
            message="Image selected!"
            sx={{ width: '20%' }}
          />
      </Box>
    </>
  )
}

export default AddKostum
 */