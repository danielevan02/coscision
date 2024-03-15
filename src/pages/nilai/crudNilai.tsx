import { Box, Button, MenuItem, TextField, Snackbar } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
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

const CrudNilai = () => {
	const [open, setOpen] = React.useState(false)
  const { 
    register, 
    handleSubmit,
  } = useForm< NilaiForm>()

	const list: { label: string, option: string[], regist: typeof register}[] = [
		{ label: 'Nama Kostum', option: ['Raiden Shogun', 'Zhongli', 'Power', 'Childe'], regist: register('nama') },
		{ label: 'Harga Sewa', option: ['> 500.000', '400.001 - 500.000', '300.001 - 400.000', '200.001 - 300.000', '100.001 - 200.000'], regist: register('harga') },
		{ label: 'Kualitas Kostum', option: ['Sangat Baik', 'Baik', 'Cukup', 'Buruk'], regist: register('kualitas') },
		{ label: 'Desain Kostum', option: ['Sangat Menarik', 'Menarik', 'Biasa Saja', 'Kurang Menarik', 'Tidak Menarik'], regist: register('desain') },
		{ label: 'Fleksibilitas Kostum', option: ['Sangat Nyaman Dipakai', 'Nyaman Dipakai', 'Netral', 'Kurang Nyaman Dipakai', 'Tidak Nyaman Dipakai'], regist: register('fleksibilitas') },
		{ label: 'Popularitas Karakter', option: ['Sangat Terkenal', 'Terkenal', 'Biasa Saja', 'Kurang Terkenal', 'Tidak Terkenal'], regist: register('popularitas') },
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

  const onSubmit = (data:  NilaiForm) => {
    console.log(data)
    setOpen(true)
  }

	return (
		<>
			<Head>
				<title>Coscision - Nilai</title>
			</Head>
			<Box sx={{ px: 5, py: 3 }}>
				<form style={{ display: 'flex', flexDirection: 'column', gap: 5 }} onSubmit={handleSubmit(onSubmit, onError)}>
					{list.map((item, index) => {
						return (
							<TextField fullWidth key={index} select label={item.label}>
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

export default CrudNilai