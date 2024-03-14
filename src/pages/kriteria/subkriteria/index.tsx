import { Add, ArrowBack } from '@mui/icons-material';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'

interface Column {
  id: 'nama' | 'nilai';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'nama',
    label: 'Nama Subkriteria',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'nilai',
    label: 'Nilai',
    minWidth: 170,
    align: 'center',
  },
];

interface Data {
  nama: string;
  nilai: number;
}

function createData(
  nama: string,
  nilai: number
): Data {
  return { nama, nilai };
}

const rows = [
  createData('> 500.000', 1),
  createData('400.001 - 500.000', 2),
  createData('300.001 - 400.000', 3),
  createData('200.001 - 300.000', 4),
  createData('100.001 - 200.000', 5),
];

const Subkriteria = () => {
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
          <Link href={'/kriteria/subkriteria/crudSub'} style={{ textDecoration: 'none', display: author === 'admin' ? undefined : 'none' }}>
            <Button variant='contained' sx={{ height: '80%', display: author === 'admin' ? 'flex' : 'none', gap: 1 }}>
              <Add />
              Add
            </Button>
          </Link>
          <Link href={'/kriteria'} style={{textDecoration: 'none'}}>
            <Button variant='contained' color='info' sx={{ display: 'flex', gap: 1}}>
              <ArrowBack/>
              Back
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
                              {index === 0 ? <TableCell key={index} align='center'>{rowIndex + 1}</TableCell> : undefined}
                              <TableCell align={column.align}>{value}</TableCell>
                              {index === 1 ?
                                <TableCell align={column.align} sx={{ display: author === 'admin' ? undefined : 'none'}}>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Link href={'/kriteria/subkriteria/crudSub'}>
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

export default Subkriteria