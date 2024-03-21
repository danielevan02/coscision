import { Box, Button, MenuItem, TextField, Snackbar } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'

type  NilaiForm = {
	nama: string
	harga: string
	kualitas: string
	desain: string
	fleksibilitas: string
	popularitas: string
}

const UpdateNilai = () => {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)
  const { 
    register, 
    handleSubmit,
  } = useForm< NilaiForm>()

	const list: { label: string, option: string[], regist: 'nama'|'harga'|'kualitas'|'desain'|'fleksibilitas'|'popularitas'}[] = [
		{ label: 'Nama Kostum', option: ['Raiden Shogun', 'Zhongli', 'Power', 'Childe'], regist: 'nama' },
		{ label: 'Harga Sewa', option: ['> 500.000', '400.001 - 500.000', '300.001 - 400.000', '200.001 - 300.000', '100.001 - 200.000'], regist: 'harga' },
		{ label: 'Kualitas Kostum', option: ['Sangat Baik', 'Baik', 'Cukup', 'Buruk'], regist: 'kualitas'},
		{ label: 'Desain Kostum', option: ['Sangat Menarik', 'Menarik', 'Biasa Saja', 'Kurang Menarik', 'Tidak Menarik'], regist: 'desain' },
		{ label: 'Fleksibilitas Kostum', option: ['Sangat Nyaman Dipakai', 'Nyaman Dipakai', 'Netral', 'Kurang Nyaman Dipakai', 'Tidak Nyaman Dipakai'], regist: 'fleksibilitas'},
		{ label: 'Popularitas Karakter', option: ['Sangat Terkenal', 'Terkenal', 'Biasa Saja', 'Kurang Terkenal', 'Tidak Terkenal'], regist: 'popularitas' },
	]

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
					{list.map((item, index) => {
						return (
							<TextField fullWidth key={index} size='small' sx={{ background: 'white', borderRadius: 1}} select label={item.label} {...register(`${item.regist}`, {required: true})}>
								<MenuItem value=""><em>None</em></MenuItem>
								{item.option.map((listOption, index) => (
									<MenuItem key={index} value={listOption.toLowerCase()}>{listOption}</MenuItem>
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

export default UpdateNilai