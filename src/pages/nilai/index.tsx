import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'

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

interface Data {
  nama: string;
  harga: string;
  kualitas: string;
  desain: string;
  fleksibilitas: string;
  popularitas: string;
}

function createData(
  nama: string,
  harga: string,
  kualitas: string,
  desain: string,
  fleksibilitas: string,
  popularitas: string
): Data {
  return { nama, harga, kualitas, desain, fleksibilitas, popularitas };
}

const rows = [
  createData('Raiden Shogun', '300.001 - 400.000', 'Baik', 'Sangat Menarik', 'Kurang Nyaman Dipakai', 'Sangat Terkenal'),
  createData('Raiden Shogun', '300.001 - 400.000', 'Baik', 'Sangat Menarik', 'Kurang Nyaman Dipakai', 'Sangat Terkenal'),
  createData('Raiden Shogun', '300.001 - 400.000', 'Baik', 'Sangat Menarik', 'Kurang Nyaman Dipakai', 'Sangat Terkenal'),
];

const Nilai = () => {
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
        <title>Coscision - Nilai</title>
      </Head>
      <Box sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Add Button */}
          <Link href={'/nilai/crudNilai'} style={{ textDecoration: 'none' }}>
            <Button variant='contained' sx={{ height: '80%', display: 'flex', gap: 1 }}>
              <Add />
              Add
            </Button>
          </Link>
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
                              {index === 0 ? <TableCell key={index} align='center'>{rowIndex + 1}</TableCell> : undefined}
                              <TableCell align={column.align}>{value}</TableCell>
                              {index === 5 ?
                                <TableCell align={column.align}>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Link href={'/nilai/crudNilai'}>
                                      <Button variant='contained' color='warning'>UBAH</Button>
                                    </Link>
                                    <Button variant='contained' color='error'>HAPUS</Button>
                                  </Box>
                                </TableCell>
                                : undefined
                              }
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

export default Nilai