import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Head from 'next/head'
import Image from 'next/image';
import React from 'react'

interface Column {
  id: 'nama' | 'nilai' | 'rank';
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
    id: 'nilai',
    label: 'Nilai SAW',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'rank',
    label: 'Ranking',
    minWidth: 170,
    align: 'center',
  },
];

interface Data {
  nama: string;
  nilai: number;
  rank: number | string;
}

function createData(
  nama: string,
  nilai: number,
  rank: number | string
): Data {
  return { nama, nilai, rank };
}

const rows = [
  createData('Harga Sewa', 0.0643, 1),
  createData('Harga Sewa', 0.0643, 2),
  createData('Harga Sewa', 0.0643, 3),
  createData('Harga Sewa', 0.0643, 4),
  createData('Harga Sewa', 0.0643, 5),
  createData('Harga Sewa', 0.0643, 6),
  createData('Harga Sewa', 0.0643, 7),
  createData('Harga Sewa', 0.0643, 8),
  createData('Harga Sewa', 0.0643, 9),
  createData('Harga Sewa', 0.0643, 10),
  createData('Harga Sewa', 0.0643, 10),
];

const Hasil = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Coscision - Hasil</title>
      </Head>
      <Box sx={{ px: 5, py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h4' fontWeight={600} sx={{}}>Hasil Analisa</Typography>
        </Box>
        {/* Table Kostum */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: { mobile: 400, laptop: 310, desktop: 500 } }}>
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow 
                        hover={rowIndex >= 0 && rowIndex <= 2 ? false : true} 
                        key={rowIndex}
                        sx={rowIndex === 0 && rowsPerPage*page+rowIndex+1 === 1 ? 
                          {background: '#dcaf53', height: 80}:
                          rowIndex === 1 && rowsPerPage*page+rowIndex+1 === 2 ?
                          {background: '#b8b8b8', height: 70}:
                          rowIndex === 2 && rowsPerPage*page+rowIndex+1 === 3 ?
                          {background: '#805334', height: 60}:undefined
                        }
                      >
                        {columns.map((column, index) => {
                          const value = row[column.id];
                          return (
                            <>
                              {index === 0 ? <TableCell key={index} align='center'>{rowsPerPage*page+rowIndex+1}</TableCell> : undefined}
                              <TableCell 
                                align={column.align} 
                                sx={rowIndex === 0 && rowsPerPage*page+rowIndex+1 === 1 ? 
                                  { fontSize: 30, fontWeight: 700, p: 0 } : 
                                  rowIndex === 1 && rowsPerPage*page+rowIndex+1 === 2 ? 
                                  { fontSize: 25, fontWeight: 600, p: 0 } :
                                  rowIndex === 2 && rowsPerPage*page+rowIndex+1 === 3 ?
                                  { fontSize: 20, fontWeight: 500, p: 0} : undefined
                                }
                              >
                                { index === 2 && rowIndex === 0 && rowsPerPage*page+rowIndex+1 === 1? 
                                  <Image src={`/assets/rank${value}.png`} alt='rank' width={1000} height={1000} style={{ width: '15%', height: 'auto' }} /> : 
                                  index === 2 && rowIndex === 1 && rowsPerPage*page+rowIndex+1 === 2?
                                  <Image src={`/assets/rank${value}.png`} alt='rank' width={1000} height={1000} style={{ width: '12%', height: 'auto' }} /> : 
                                  index === 2 && rowIndex === 2 && rowsPerPage*page+rowIndex+1 === 3?
                                  <Image src={`/assets/rank${value}.png`} alt='rank' width={1000} height={1000} style={{ width: '10%', height: 'auto' }} /> : 
                                  value
                                }
                              </TableCell>
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

export default Hasil