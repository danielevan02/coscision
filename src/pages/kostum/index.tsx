import { Add, Cancel, Info } from '@mui/icons-material';
import { Backdrop, Box, Button, Fade, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, type SelectChangeEvent } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { env } from 'process';
import React from 'react'
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
	const author = session?.user.level === "Admin" ? 'admin':'user'
	const { data: kostum } = api.kostum.getKostums.useQuery()
	console.log(env.NEXT_PUBLIC_UPLOAD_BASE)
	const [filter, setAge] = React.useState('');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [open, setOpen] = React.useState(false);

	const handleOpen = (target: string) => {
		console.log(target)
		setOpen(true)
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
					<Link href={'/kostum/add/addKostum'} style={{ textDecoration: 'none'}}>
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
                  <TableCell width={150} align='center' sx={{ display: author === 'admin' ? undefined : 'none' }}>Opsi</TableCell>
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
                              :undefined
                            }
                            {index === 3 ?
                              <TableCell align='center' sx={{p:1}}>
                                <Image src={`/upload/${column}`} alt='gambar' width={1000} height={1000} style={{width: '30%', height: 'auto', borderRadius: 10}} />
                              </TableCell>
                              : 
															<TableCell align='center'>{column}</TableCell>
                            }
                            {index === 3 ?
                              <TableCell align='center' sx={{ display: author === 'admin' ? undefined : 'none' }}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <Link href={`/kriteria/edit/${result[0]}`}>
                                    <Button variant='contained' color='warning'>UBAH</Button>
                                  </Link>
                                  <Button
                                    variant='contained'
                                    color='error'
																	>
                                    HAPUS
                                  </Button>
                                </Box>
                              </TableCell>
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
			</Box>
		</>
	)
}

export default Kostum
