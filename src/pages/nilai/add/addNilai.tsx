import { Box, Button, MenuItem, TextField, Snackbar } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { api } from '~/utils/api'

type NilaiForm = {
	nama: number
	harga: number
	kualitas: number
	desain: number
	fleksibilitas: number
	popularitas: number
}

const AddNilai = () => {
	const router = useRouter()
	const { data: nilai } = api.kriteria.getKriteriasIncludeSub.useQuery()
	const { data: kostum } = api.kostum.getKostums.useQuery()
	const { mutateAsync: addNilai } = api.saw.selectCostum.useMutation()
	const [open, setOpen] = React.useState(false)
	const {
		register,
		handleSubmit,
		getValues
	} = useForm<NilaiForm>()

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const onError = (errors: FieldErrors<NilaiForm>) => {
		if (errors) {
			alert("Harap isi semua data dengan benar")
		}
	}

	const onSubmit = async () => {
		try {
			const listSub = getValues();
			
			for (const [key, val] of Object.entries(listSub)) {
				if(key === 'nama')continue;
				await addNilai({
					kostum_id: getValues('nama'),
					subkriteria_id: val
				})
			}
			setOpen(true)
			await router.push('/nilai')
		} catch (error) {
			console.log(error)
			alert("Kostum sudah ada nilai nya, pilih kostum yang belum ada nilai")
		}
	}

	return (
		<>
			<Head>
				<title>Coscision - Nilai</title>
			</Head>
			<Box sx={{ px: 5, py: 3 }}>
				<form style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onSubmit={handleSubmit(onSubmit, onError)}>
					<TextField fullWidth size='small' sx={{ background: 'white', borderRadius: 1 }} select label={'Nama Kostum'} {...register('nama', { required: true })}>
						<MenuItem value=''><em>None</em></MenuItem>
						{kostum?.map((item, index) => {
							return (
								<MenuItem key={index} value={item.id}>{item.name}</MenuItem>
							)
						})}
					</TextField>
					{nilai?.map((item, index) => {
						return (
							<TextField fullWidth key={index} size='small' sx={{ background: 'white', borderRadius: 1 }} select label={item.name} {...register(item.name.toLowerCase().split(" ")[0] as 'nama' | 'harga' | 'fleksibilitas' | 'desain' | 'popularitas' | 'kualitas', { required: true })}>
								<MenuItem value=""><em>None</em></MenuItem>
								{item.subkriteria.map((list, index) => (
									<MenuItem key={index} value={list.id}>{`${list.name} - (${list.skvalue})`}</MenuItem>
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