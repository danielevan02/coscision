import { Box, Button, MenuItem, TextField, Snackbar } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { api } from '~/utils/api'

type NilaiForm = {
	nama: string
	harga: string
	kualitas: string
	desain: string
	fleksibilitas: string
	popularitas: string
}

const AddNilai = () => {
	const router = useRouter()
	const { data: nilai } = api.kriteria.getKriteriasIncludeSub.useQuery()
	const [open, setOpen] = React.useState(false)
  const { 
    register, 
    handleSubmit,
  } = useForm< NilaiForm>()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onError = (errors: FieldErrors< NilaiForm>) => {
    if(errors){
      alert("Harap isi semua data dengan benar")
    }
  }

  const onSubmit = async (data:  NilaiForm) => {
    console.log(data)
    setOpen(true)
		await router.push('/nilai')
  }

	return (
		<>
			<Head>
				<title>Coscision - Nilai</title>
			</Head>
			<Box sx={{ px: 5, py: 3 }}>
				<form style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onSubmit={handleSubmit(onSubmit, onError)}>
					{nilai?.map((item, index) => {
						return (
							<TextField fullWidth key={index} size='small' sx={{ background: 'white', borderRadius: 1}} select label={item.name} {...register(item.name.toLowerCase().split(" ")[0] as 'nama'|'harga'|'fleksibilitas'|'desain'|'popularitas'|'kualitas', {required: true})}>
								<MenuItem value=""><em>None</em></MenuItem>
								{item.subkriteria.map((list, index) => (
									<MenuItem key={index} value={list.skvalue}>{`${list.name} - (${list.skvalue})`}</MenuItem>
								))}
							</TextField>
						)
					})}
					<Box display={'flex'} gap={1} justifyContent={'end'} mt={3}>
						<Link href={'/nilai'}>
							<Button variant='contained' color='error'>Cancel</Button>
						</Link>
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

export default AddNilai