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
  createData('Harga Sewa', 0.0643, 'rank1.png'),
  createData('Harga Sewa', 0.0643, 2),
  createData('Harga Sewa', 0.0643, 3),
  createData('Harga Sewa', 0.0643, 4),
  createData('Harga Sewa', 0.0643, 5),
  createData('Harga Sewa', 0.0643, 6),
  createData('Harga Sewa', 0.0643, 7),
  createData('Harga Sewa', 0.0643, 8),
  createData('Harga Sewa', 0.0643, 9),
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
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow hover={rowIndex === 0 ? false:true} role="checkbox" tabIndex={-1} key={rowIndex} sx={{ background: rowIndex === 0 ? '#dcaf53':undefined, height: rowIndex === 0 ? 100:undefined }}>
                        {columns.map((column, index) => {
                          const value = row[column.id];
                          return (
                            <>
                              {index === 0 ? <TableCell key={index}>{rowIndex + 1}</TableCell> : undefined}
                              <TableCell align={column.align} sx={rowIndex === 0 ? {fontSize: 30, fontWeight: 600}:undefined}>{index === 2 && rowIndex === 0 ? <Image src={`/assets/${value}`} alt='rank1' width={1000} height={1000} style={{width: '20%', height: 'auto'}}/>:value}</TableCell>
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