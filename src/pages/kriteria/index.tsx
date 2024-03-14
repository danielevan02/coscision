import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'

interface Column {
  id: 'nama' | 'bobot' | 'tipe';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'nama',
    label: 'Nama Kriteria',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'bobot',
    label: 'Bobot',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'tipe',
    label: 'Tipe',
    minWidth: 170,
    align: 'center',
  },
];

interface Data {
  nama: string;
  bobot: number;
  tipe: string;
}

function createData(
  nama: string,
  bobot: number,
  tipe: string
): Data {
  return { nama, bobot, tipe };
}

const rows = [
  createData('Harga Sewa', 35, 'Cost'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Kualitas Kostum', 20, 'Benefit'),
  createData('Desain Kostum', 20, 'Benefit')
];

const Kriteria = () => {
  const author = 'admin'
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
        <title>Coscision - Kostum</title>
      </Head>
      <Box sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Add Button */}
          <Link href={'/crudKriteria'} style={{ textDecoration: 'none', display: author === 'admin' ? undefined : 'none' }}>
            <Button variant='contained' sx={{ height: '80%', display: author === 'admin' ? 'flex' : 'none', gap: 1 }}>
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
                  <TableCell width={150} align='center'>Subkriteria</TableCell>
                  <TableCell width={150} align='center' sx={{ display: author === 'admin' ? undefined : 'none'}}>Opsi</TableCell>
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
                              {index === 0 ? <TableCell key={index}>{rowIndex + 1}</TableCell> : undefined}
                              <TableCell align={column.align}>{value}</TableCell>
                              {index === 2 ?
                                <TableCell align={column.align}>
                                  <Link href={'/kriteria/subkriteria'}>
                                    <Button variant='contained'>LIHAT</Button>
                                  </Link>
                                </TableCell>
                                : undefined
                              }
                              {index === 2 ?
                                <TableCell align={column.align} sx={{ display: author === 'admin' ? undefined : 'none'}}>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Link href={'/kriteria/crudKriteria'}>
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

export default Kriteria