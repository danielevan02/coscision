import { Box, Button, Snackbar, TextField } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { api } from '~/utils/api'

type SubkriteriaForm = {
  nama: string
  nilai: number
}

const EditSubkriteria = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string)
  const { mutate } = api.kriteria.updateSubkriteria.useMutation()
  const { data } = api.kriteria.getSubkriteria.useQuery(id)
  const [open, setOpen] = React.useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    setValue
  } = useForm<SubkriteriaForm>()

  if(data){
    setValue('nama', data.name)
    setValue('nilai', data.skvalue)
  }
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const onError = (errors: FieldErrors<SubkriteriaForm>) => {
    if (errors) {
      alert("Harap isi semua data dengan benar")
    }
  }

  const onSubmit = () => {
    try {
      mutate({
        name: getValues('nama'),
        skvalue: parseInt(getValues('nilai').toString()),
        id: id
      })
      setOpen(true)
      router.back()
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
        <form style={{ display: 'flex', flexDirection: 'column', gap: 6 }} onSubmit={handleSubmit(onSubmit, onError)}>
          <TextField fullWidth InputLabelProps={{shrink: true}} label="Nama Subkriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} {...register('nama', { required: true })} />
          <TextField fullWidth InputLabelProps={{shrink: true}} type='number' label="Nilai" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} {...register('nilai', { required: true })} />
          <Box display={'flex'} gap={1} justifyContent={'end'} mt={3}>
            <Button variant='contained' color='error' onClick={() => router.back()}>Cancel</Button>
            <Button variant='contained' color='primary' type='submit'>Submit</Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Submit Success"
              sx={{ width: '20%' }}
            />
          </Box>
        </form>
      </Box>
    </>
  )
}

export default EditSubkriteria