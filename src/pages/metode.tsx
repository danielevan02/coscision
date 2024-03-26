import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react'
import Slider from 'react-slick';
import { api } from '~/utils/api';

interface Column {
	id: 'nama' | 'harga' | 'kualitas' | 'desain' | 'fleksibilitas' | 'popularitas';
	label: string;
	minWidth?: number;
	align?: 'center';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{
		id: 'nama',
		label: 'Nama Kostum',
		minWidth: 100,
		align: 'center'
	},
	{
		id: 'harga',
		label: 'Harga Sewa',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'kualitas',
		label: 'Kualitas Kostum',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'desain',
		label: 'Desain Kostum',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'fleksibilitas',
		label: 'Fleksibilitas Kostum',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'popularitas',
		label: 'Popularitas Karakter',
		minWidth: 100,
		align: 'center',
	},
];

const Metode = () => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const { data } = api.saw.getSelected.useQuery({ with_norm: true })
	console.log(data)
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const list = ['Nilai Keputusan', 'Konversi Nilai Keputusan', 'Normalisasi Matriks', 'Normalisasi Bobot']

	return (
		<>
			<Head>
				<title>Coscision - Nilai</title>
			</Head>
			<Box sx={{ px: 5, py: 2 }}>
				<Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
					{list.map((item, index) => {
						return (
							<Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
								<Box display={'flex'} width={'100%'} mb={1}>
									<Typography variant='h5' fontWeight={600}>{item.toUpperCase()}</Typography>
								</Box>
								{/* Table Kostum */}
								<Paper sx={{ width: '100%', overflow: 'hidden' }}>
									<TableContainer sx={{ maxHeight: { mobile: 400, laptop: 310, desktop: 500 }, height: { mobile: 400, laptop: 310, desktop: 500 } }}>
										<Table stickyHeader aria-label="sticky table">
											<TableHead>
												<TableRow>
													<TableCell align='center'>No</TableCell>
													{columns.map((column) => (
														<TableCell
															key={column.id}
															align={column.align}
															style={{ minWidth: column.minWidth }}
														>
															{column.label}
														</TableCell>
													))}
												</TableRow>
											</TableHead>
											<TableBody>
												{data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
													.map((row, rowIndex) => {
														const data = list[index]?.toLowerCase()
														return (
															<TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
																<TableCell align='center'>{rowsPerPage * page + rowIndex + 1}</TableCell>
																<TableCell align='center'>{row.name}</TableCell>
																{row.rvalues.map((list, index) => {
																	return (
																		<TableCell key={index} align='center'>
																			{
																				data === 'nilai keputusan' ? list.subkriteria.name :
																				data === 'konversi nilai keputusan' ? list.subkriteria.skvalue :
																				data === 'normalisasi matriks' ? list.subkriteria.kriteria.norm_matrix.toFixed(2) :
																				list.subkriteria.kriteria.norm_weight.toFixed(2)
																			}
																		</TableCell>
																	)
																})}

															</TableRow>
														);
													})
												}
											</TableBody>
											{item.toLowerCase() === 'konversi nilai keputusan' ?
												<TableFooter sx={{ background: 'white', border: '1px solid black' }}>
													<TableRow>
														<TableCell colSpan={2} align='center' sx={{ p: 0 }}>Nilai Max</TableCell>
														{data?.map((list, index) => {
															return (
																<>
																	<TableCell key={index} align='center' sx={{ p: 0 }}>{list.rvalues[index]?.subkriteria.kriteria.skmax}</TableCell>
																</>
															)
														})
														}
													</TableRow>
													<TableRow>
														<TableCell colSpan={2} align='center' sx={{ p: 0 }}>Nilai Min</TableCell>
														{data?.map((list, index) => {
															return (
																<>
																	<TableCell key={index} align='center' sx={{ p: 0 }}>{list.rvalues[index]?.subkriteria.kriteria.skmin}</TableCell>
																</>
															)
														})
														}
													</TableRow>
												</TableFooter>
												: undefined
											}
										</Table>
									</TableContainer>
									<TablePagination
										rowsPerPageOptions={[10, 25, 100]}
										component="div"
										count={data ? data.length : 10}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</Paper>
							</Box>
						)
					})}
				</Slider>
			</Box>
		</>
	)
}

export default Metode