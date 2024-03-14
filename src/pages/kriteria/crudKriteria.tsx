import { Box, Button, type SelectChangeEvent, TextField, InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import Head from 'next/head'
import React from 'react'

const CrudKriteria = () => {
	const [tipe, setTipe] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setTipe(event.target.value);
	};
	return (
		<>
			<Head>
				<title>Coscision - Kostum</title>
			</Head>
			<Box sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
				<TextField fullWidth label="Nama Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} />
				<TextField fullWidth label="Bobot Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} />
				<FormControl sx={{ background: 'white', borderRadius: 1 }}>
					<InputLabel id="demo-simple-select-autowidth-label">Tipe Kriteria</InputLabel>
					<Select
						labelId="demo-simple-select-autowidth-label"
						id="demo-simple-select-autowidth"
						value={tipe}
						onChange={handleChange}
						label="Tipe Kriteria"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'cost'}>Cost</MenuItem>
						<MenuItem value={'benefit'}>Benefit</MenuItem>
					</Select>
				</FormControl>
				<Box display={'flex'} gap={1} justifyContent={'end'} mt={3}>
					<Button variant='contained' color='error'>Cancel</Button>
					<Button variant='contained' color='primary'>Save</Button>
				</Box>
			</Box>
		</>
	)
}

export default CrudKriteria