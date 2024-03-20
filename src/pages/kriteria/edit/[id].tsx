import { Box, Button, TextField, MenuItem, Snackbar } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react'
import { type FieldErrors, useForm } from 'react-hook-form';
import { api } from '~/utils/api';

type KriteriaForm = {
	nama: string
	bobot: number
	tipe: 'Cost' | 'Benefit'
}

const UpdateKriteria = () => {
	const router = useRouter()
  const id = parseInt(router.query.id as unknown as string)
  const { data } = api.kriteria.getKriteria.useQuery(id, {enabled: !!router.query.id})
	const [open, setOpen] = React.useState(false)
	const [tipe, setTipe] = useState(data?.ktype === 'Benefit' ? 'Benefit':'Cost')
	const { mutate } = api.kriteria.updateKriteria.useMutation()
	const {
		register,
		handleSubmit,
		getValues,
    setValue,
		watch
	} = useForm<KriteriaForm>()

	useEffect(() => {
    const sub = watch((val, { name }) => {
      if (name == "tipe") setTipe(val.tipe!);
    });
    return () => sub.unsubscribe();
  }, [watch]);

  if(data){
    setValue('nama', data.name)
    setValue('bobot', data.weight as unknown as number)
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
				weight: parseInt(getValues('bobot').toString()),
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
					<TextField fullWidth InputLabelProps={{shrink: true}} label="Nama Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} {...register('nama', { required: true })} />
					<TextField type='number' InputLabelProps={{shrink: true}} fullWidth label="Bobot Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} {...register('bobot', { required: true })} />
					<TextField fullWidth value={tipe} label="Bobot Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} select {...register('tipe', { required: true })} >
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

export default UpdateKriteria