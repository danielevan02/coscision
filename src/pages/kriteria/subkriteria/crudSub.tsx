import { Box, Button, TextField} from '@mui/material'
import Head from 'next/head'
import React from 'react'

const CrudKriteria = () => {
	return (
		<>
			<Head>
				<title>Coscision - Kostum</title>
			</Head>
			<Box sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
				<TextField fullWidth label="Nama Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} />
				<TextField fullWidth label="Bobot Kriteria" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} />
				<Box display={'flex'} gap={1} justifyContent={'end'} mt={3}>
					<Button variant='contained' color='error'>Cancel</Button>
					<Button variant='contained' color='primary'>Save</Button>
				</Box>
			</Box>
		</>
	)
}

export default CrudKriteria