import { Add, Cancel, Info } from '@mui/icons-material';
import { Backdrop, Box, Button, Fade, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, type SelectChangeEvent } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { env } from '~/env';
import { api } from '~/utils/api';

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

const Kostum = () => {
	const { data: session } = useSession()
	const author = session?.user.level === "Admin" ? 'admin' : 'user'
	const [id, setId] = useState(1)
	const { data } = api.kostum.getKostum.useQuery(id)
	const { data: kostum, refetch } = api.kostum.getKostums.useQuery()
	const { mutateAsync: deleteKostum } = api.kostum.deleteKostum.useMutation()

	const [nama, setNama] = useState('')
	const [asal, setAsal] = useState('')
	const [preferensi, setPreferensi] = useState('')
	const [list, setList] = useState('')
	const [link, setLink] = useState('')
	const [gambar, setGambar] = useState('')
	const [filter, setAge] = React.useState('');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		if (data) {
			setNama(data.name)
			setAsal(data.origin)
			setGambar(data.image)
			setLink(data.link)
			setPreferensi(data.preference)
			setList(data.kset)
			setOpen(true)
		}
	}

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
					{/* Filter Button */}
					<FormControl sx={{ minWidth: 120 }} size="small">
						<InputLabel id="demo-select-small-label">Filter</InputLabel>
						<Select
							sx={{ background: 'white' }}
							labelId="demo-select-small-label"
							id="demo-select-small"
							value={filter}
							label="Age"
							onChange={handleChange}
						>
							<MenuItem value={'Game'}>Game</MenuItem>
							<MenuItem value={'Vtuber'}>Vtuber</MenuItem>
							<MenuItem value={'Anime'}>Anime</MenuItem>
						</Select>
					</FormControl>
					{/* Add Button */}
					<Link href={'/kostum/add/addKostum'} style={{ textDecoration: 'none' }}>
						<Button variant='contained' sx={{ width: '100%', height: '80%', display: author === 'admin' ? 'flex' : 'none', gap: 1 }}>
							<Add />
							Add
						</Button>
					</Link>
				</Box>
				{/* Search Bar */}
				<TextField fullWidth label='Search' size='small' sx={{ background: 'white', borderRadius: 1 }} />
				{/* Table Kostum */}
				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer sx={{ maxHeight: { mobile: 400, laptop: 280, desktop: 500 } }}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align='center'>No</TableCell>
									{columns.map((column) => (
										<TableCell
											key={column.id}
											align='center'
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									))}
									{author === 'admin' ?
										<TableCell width={150} align='center'>Opsi</TableCell>
										:
										<TableCell width={150} align='center'>Info</TableCell>
									}
								</TableRow>
							</TableHead>
							<TableBody>
								{kostum?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, rowIndex) => {
										const result = Object.values(row)
										return (
											<TableRow key={rowIndex}>
												{result.slice(1, 5).map((column, index) => (
													<>
														{index === 0 ?
															<TableCell align='center'>{rowsPerPage * page + rowIndex + 1}</TableCell>
															: undefined
														}
														{index === 3 ?
															<TableCell align='center' sx={{ p: 1 }}>
																<Image src={`${env.NEXT_PUBLIC_UPLOAD_BASE}${column}`} alt='gambar' width={1000} height={1000} style={{ width: '30%', height: 'auto', borderRadius: 10 }} />
															</TableCell>
															:
															<TableCell align='center'>{column}</TableCell>
														}
														{index === 3 ?
															<>
																<TableCell align='center' sx={{ display: author === 'admin' ? undefined : 'none' }}>
																	<Box sx={{ display: 'flex', gap: 1 }}>
																		<Link href={`/kostum/edit/${result[0]}`}>
																			<Button variant='contained' color='warning'>UBAH</Button>
																		</Link>
																		<Button
																			variant='contained'
																			color='error'
																			onClick={()=> deleteKostum(result[0] as number).then(()=> refetch())}
																		>
																			HAPUS
																		</Button>
																	</Box>
																</TableCell>
																<TableCell align='center' sx={{ display: author === 'user' ? undefined : 'none' }}>
																	<IconButton onClick={handleOpen} onMouseEnter={()=>setId(result[0] as number)}>
																		<Info />
																	</IconButton>
																</TableCell>
															</>
															: undefined
														}
													</>
												))}
											</TableRow>
										)
									})
								}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component="div"
						count={kostum ? kostum.length : 10}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					open={open}
					onClose={() => setOpen(false)}
					closeAfterTransition
					slots={{ backdrop: Backdrop }}
					slotProps={{
						backdrop: {
							timeout: 500,
						},
					}}
				>
					<Fade in={open}>
						<Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { mobile: '70%', tablet: '50%', laptop: '30%' }, height: '60%', background: `linear-gradient(rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.8) 70%), url(${env.NEXT_PUBLIC_UPLOAD_BASE}${gambar})`, backgroundSize: 'contain', backgroundPosition: 'center', border: '1px solid #000', boxShadow: 24, p: 4, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
							<IconButton sx={{ position: 'absolute', right: 5, top: 5 }} color='error' onClick={() => setOpen(false)}>
								<Cancel fontSize='large' />
							</IconButton>
							<Typography id="transition-modal-title" variant="h6" component="h2" fontWeight={700}>
								{nama}
							</Typography>
							<Typography id="transition-modal-description" sx={{ mt: 2 }}>
								Asal : {asal}
							</Typography>
							<Typography id="transition-modal-description">
								Preferensi : {preferensi}
							</Typography>
							<Typography id="transition-modal-description">
								Set :
							</Typography>
							<Typography component={'ul'} id="transition-modal-description" sx={{ ml: 3 }}>
								{list.split("\n").map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</Typography>
							<Typography id="transition-modal-description">
								Link : <a href={link} target='_blank' style={{ color: 'rgba(66, 188, 245)' }}>{link}</a>
							</Typography>
						</Box>
					</Fade>
				</Modal>
			</Box>
		</>
	)
}

export default Kostum
