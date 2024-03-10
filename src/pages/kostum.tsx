import { Add } from '@mui/icons-material';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, type SelectChangeEvent } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react'

interface Column {
	id: 'kostum' | 'asal' | 'preferensi' | 'gambar';
	label: string;
	minWidth?: number;
	align?: 'center';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'kostum', label: 'Kostum', minWidth: 100 },
	{
		id: 'asal',
		label: 'Asal',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'preferensi',
		label: 'Preferensi',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'gambar',
		label: 'Gambar',
		minWidth: 170,
		align: 'center',
	},
];

interface Data {
	kostum: string;
	asal: string;
	preferensi: string;
	gambar: string;
}

function createData(
	kostum: string,
	asal: string,
	preferensi: string,
	gambar: string,
): Data {

	return { kostum, asal, preferensi, gambar };
}

const rows = [
	createData('Raiden Shogun', 'Genshin Impact', 'Game', '/assets/raiden.jpg'),
	createData('Zhong Li', 'Genshin Impact', 'Game', '/assets/zhongli.jpg'),
	createData('Power', 'Chainsaw Man', 'Anime', '/assets/power.jpg'),
];

const Kostum = () => {
	const [filter, setAge] = React.useState('');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value);
	};
	return (
		<>
			<Head>
				<title>Coscision - Kostum</title>
			</Head>
			<Box sx={{ px: 5, py: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
						<InputLabel id="demo-select-small-label">Filter</InputLabel>
						<Select
							sx={{ background: 'white' }}
							labelId="demo-select-small-label"
							id="demo-select-small"
							value={filter}
							label="Age"
							onChange={handleChange}
						>
							<MenuItem value={10}>Game</MenuItem>
							<MenuItem value={20}>Vtuber</MenuItem>
							<MenuItem value={30}>Anime</MenuItem>
						</Select>
					</FormControl>
					<Button variant='contained' sx={{ height: '80%', display: 'flex', gap: 1 }}>
						<Add />
						Add
					</Button>
				</Box>
				<TextField fullWidth label='Search' size='small' sx={{ background: 'white', borderRadius: 1 }} />
				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer sx={{ maxHeight: {mobile: 350, laptop: 260, desktop: 450} }}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>No</TableCell>
									{columns.map((column) => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									))}
									<TableCell width={150} align='center'>Opsi</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, rowIndex) => {
										return (
											<TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
												{columns.map((column, index) => {
													const value = row[column.id];
													return (
														<>
															{index === 0 ? <TableCell>{rowIndex + 1}</TableCell> : undefined}
															<TableCell key={column.id} align={column.align}>
																{index === 3 ? <Image src={value} alt='gambar' width={1000} height={1000} style={{ width: 100, height: '50%', borderRadius: 10 }} /> : value}
															</TableCell>
															{index === 3 ?
																<TableCell>
																	<Box display={'flex'} gap={1} flexDirection={'column'}>
																		<Button variant='contained' color='warning'>Edit</Button>
																		<Button variant='contained' color='error'>Delete</Button>
																	</Box>
																</TableCell>
																: undefined}
														</>
													);
												})}
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component="div"
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
		</>
	)
}

export default Kostum