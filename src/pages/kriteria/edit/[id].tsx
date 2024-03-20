import { Box, Button, TextField, MenuItem, Snackbar } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { type FieldErrors, useForm } from 'react-hook-form';
import { api } from '~/utils/api';

type KriteriaForm = {
	nama: string
	bobot: number
	tipe: 'Cost' | 'Benefit'
}

const CrudKriteria = () => {
	const router = useRouter()
  const id = parseInt(router.query.id as unknown as string)
  console.log(router.query.id)
	const [open, setOpen] = React.useState(false)
  const { data } = api.kriteria.getKriteria.useQuery(parseInt(id), {enabled: !!router.query.id})
	const { mutate } = api.kriteria.updateKriteria.useMutation()
	const {
		register,
		handleSubmit,
		getValues,
    setValue
	} = useForm<KriteriaForm>()

  if(data){
    setValue('nama', data.name)
    setValue('bobot', data.weight)
    setValue('tipe', data.ktype)
  }

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const onError = (errors: FieldErrors<KriteriaForm>) => {
		if (errors) {
			alert("Harap isi semua data dengan benar")
		}
	}

	const onSubmit = async () => {
		try {
			mutate({
				name: getValues('nama'),
				weight: getValues('bobot').toString(),
				ktype: getValues('tipe'),
        id: id
			})
			setOpen(true)
			await router.push('/kriteria')
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
				<form style={{ display: 'flex', flexDirection: 'column', gap: 5 }} onSubmit={handleSubmit(onSubmit, onError)}>
					<TextField fullWidth label="Nama Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} {...register('nama', { required: true })} />
					<TextField type='number' fullWidth label="Bobot Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} {...register('bobot', { required: true })} />
					<TextField fullWidth value={data?.ktype === 'Cost' ? 'Cost':'Benefit'} label="Bobot Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} select {...register('tipe', { required: true })}>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'Cost'}>Cost</MenuItem>
						<MenuItem value={'Benefit'}>Benefit</MenuItem>
					</TextField>
					<Box display={'flex'} gap={1} justifyContent={'end'} mt={3}>
						<Link href={'/kriteria'}>
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