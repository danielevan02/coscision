import { Box, Button, Snackbar, TextField } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'

type SubkriteriaForm = {
	nama: string
	nilai: number
}

const CrudKriteria = () => {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)
	const {
		register,
		handleSubmit,
	} = useForm<SubkriteriaForm>()

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

	const onSubmit = async (data: SubkriteriaForm) => {
		console.log(data)
		setOpen(true)
		await router.push('/kriteria/subkriteria')
	}
	
	return (
		<>
			<Head>
				<title>Coscision - Kostum</title>
			</Head>
			<Box sx={{ px: 5, py: 3 }}>
				<form style={{ display: 'flex', flexDirection: 'column', gap: 6 }} onSubmit={handleSubmit(onSubmit, onError)}>
					<TextField fullWidth label="Nama Subkriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} {...register('nama', {required: true})} />
					<TextField fullWidth type='number' label="Nilai" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} {...register('nilai', {required: true})} />
					<Box display={'flex'} gap={1} justifyContent={'end'} mt={3}>
						<Link href={'/kriteria/subkriteria'}>
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

export default CrudKriteria