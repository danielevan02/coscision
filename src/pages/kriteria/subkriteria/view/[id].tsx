import { Add, ArrowBack } from '@mui/icons-material';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { api } from '~/utils/api';

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

const Subkriteria = () => {
  const router = useRouter()
  const id = router.query.id as unknown as string
  const { data } = api.kriteria.getSubkriterias.useQuery(parseInt(id))
  const { data: session } = useSession()
  const { mutate } = api.kriteria.deleteSubkriteria.useMutation()
  const author = session?.user.level === "Admin" ? 'admin' : 'user'
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id: number) => {
    mutate(id)
    
  }
  return (
    <>
      <Head>
        <title>Coscision - Kostum</title>
      </Head>
      <Box sx={{ px: 5, py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Add Button */}
          <Link href={`/kriteria/subkriteria/add/${id}`} style={{ textDecoration: 'none', display: author === 'admin' ? undefined : 'none' }}>
            <Button variant='contained' sx={{ height: '80%', display: author === 'admin' ? 'flex' : 'none', gap: 1 }}>
              <Add />
              Add
            </Button>
          </Link>
          <Link href={'/kriteria'} style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='info' sx={{ display: 'flex', gap: 1 }}>
              <ArrowBack />
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
                  <TableCell width={150} align='center' sx={{ display: author === 'admin' ? undefined : 'none' }}>Opsi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    const result = Object.values(row)
                    return (
                      <TableRow key={rowIndex}>
                        {result.slice(0, 4).map((column, index) => (
                          <>
                            { index === 0 && <TableCell key={index} align='center'>{rowsPerPage*page+rowIndex+1}</TableCell>}
                            { index === 0 || index === 1 ? undefined : <TableCell align='center'>{column}</TableCell>}
                            { index === 3 ?
                              <TableCell align='center' sx={{ display: author === 'admin' ? undefined : 'none' }}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <Link href={`/kriteria/subkriteria/edit/${result[0]}`}>
                                    <Button variant='contained' color='warning'>UBAH</Button>
                                  </Link>
                                  <Button variant='contained' color='error' onClick={() => handleDelete(result[0] as number)}>HAPUS</Button>
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
            count={data ? data.length : 10}
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