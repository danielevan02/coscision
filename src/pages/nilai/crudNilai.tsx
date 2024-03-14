import { Box, Button, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField } from '@mui/material'
import Head from 'next/head'
import React from 'react'

const CrudNilai = () => {
	const [nama, setNama] = React.useState('nama');
	const [harga, setHarga] = React.useState('');
	const [kualitas, setKualitas] = React.useState('');
	const [desain, setDesain] = React.useState('');
	const [fleksibilitas, setFleksibilitas] = React.useState('');
	const [popularitas, setPopularitas] = React.useState('');

	const list: { label: string, value?: string, option: string[] }[] = [
		{ label: 'Nama Kostum', value: Object.keys({nama})[0], option: ['Raiden Shogun', 'Zhongli', 'Power', 'Childe'] },
		{ label: 'Harga Sewa', value: Object.keys({harga})[0], option: ['> 500.000', '400.001 - 500.000', '300.001 - 400.000', '200.001 - 300.000', '100.001 - 200.000'] },
		{ label: 'Kualitas Kostum', value: Object.keys({kualitas})[0], option: ['Sangat Baik', 'Baik', 'Cukup', 'Buruk'] },
		{ label: 'Desain Kostum', value: Object.keys({desain})[0], option: ['Sangat Menarik', 'Menarik', 'Biasa Saja', 'Kurang Menarik', 'Tidak Menarik'] },
		{ label: 'Fleksibilitas Kostum', value: Object.keys({fleksibilitas})[0], option: ['Sangat Nyaman Dipakai', 'Nyaman Dipakai', 'Netral', 'Kurang Nyaman Dipakai', 'Tidak Nyaman Dipakai'] },
		{ label: 'Popularitas Karakter', value: Object.keys({popularitas})[0], option: ['Sangat Terkenal', 'Terkenal', 'Biasa Saja', 'Kurang Terkenal', 'Tidak Terkenal'] },
	]

	const handleChange = (event: SelectChangeEvent, type: string) => {
		if (type === 'nama') {
			setNama(event.target.value);
		} else if (type === 'harga') {
			setHarga(event.target.value);
		} else if (type === 'kualitas') {
			setKualitas(event.target.value);
		} else if (type === 'desain') {
			setDesain(event.target.value);
		} else if (type === 'fleksibilitas') {
			setFleksibilitas(event.target.value);
		} else if (type === 'popularitas') {
			setPopularitas(event.target.value);
		}
	};
	return (
		<>
			<Head>
				<title>Coscision - Nilai</title>
			</Head>
			<Box sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
				{list.map((item, index) => {
					return (
						<FormControl key={index} sx={{ background: 'white', borderRadius: 1 }} size="small">
							<InputLabel id="demo-select-small-label">{item.label}</InputLabel>
							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								value={item.value}
								onChange={(event) => { handleChange(event, item.value!)}}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{item.option.map((list, index) => (
									<MenuItem key={index} value={list.toLocaleLowerCase()}>{list}</MenuItem>
								))}
							</Select>
						</FormControl>
					)
				})}
			</Box>
		</>
	)
}

export default CrudNilai