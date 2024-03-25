import { Add } from '@mui/icons-material';
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react'
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

const Nilai = () => {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { mutateAsync: deleteTable } = api.saw.deleteSelection.useMutation()
  const { data: listNilai, refetch, isFetched } = api.saw.getSelected.useQuery()
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const deleteAll = async ()=>{
    await deleteTable().then(()=> refetch())
    setOpen(false)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Coscision - Nilai</title>
      </Head>
      <Box sx={{ px: 5, py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Add Button */}
          <Link href={'/nilai/add/addNilai'} style={{ textDecoration: 'none' }}>
            <Button variant='contained' sx={{ height: '80%', display: 'flex', gap: 1 }}>
              <Add />
              Add
            </Button>
          </Link>
          <Button variant='contained' color='success'>process data</Button>
          <Button variant='contained' color='error' onClick={()=>setOpen(true)}>delete all</Button>
          <Modal open={open} onClose={()=>setOpen(false)}>
            <Box 
              sx={{
                position: 'absolute', 
                top: '50%',
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 200,
                textAlign: 'center', 
                bgcolor: 'background.paper', 
                boxShadow: 24, 
                borderRadius: 5,
                p: 4
              }}
            >
              Apakah anda ingin menghapus semua nilai?
              <Box width={'100%'} display={'flex'} justifyContent={'space-between'} mt={3}>
                <Button variant='contained' color='success' onClick={deleteAll}>ya</Button>
                <Button variant='contained' color='error' onClick={()=>setOpen(false)}>tidak</Button>
              </Box>
            </Box>
          </Modal>
        </Box>
        {/* Table Kostum */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer
            sx={{
              maxHeight: { mobile: 400, laptop: 310, desktop: 500 },
              height: { mobile: 400, laptop: 310, desktop: 500 }
            }}
          >
            {isFetched ?
              listNilai!.length === 0 || listNilai!.length === undefined ?
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontWeight: 600, color: 'rgba(0, 0, 0, 0.5)',
                    fontSize: 30
                  }}
                >
                  Tidak ada nilai, silahkan tambahkan nilai baru
                </Typography>
                : undefined
              : undefined
            }
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
                {listNilai?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                        <TableCell align='center'>{rowsPerPage * page + rowIndex + 1}</TableCell>
                        <TableCell align='center'>{row.name}</TableCell>
                        {row.rvalues.map((list, index) => {
                          return (
                            <TableCell key={index} align='center'>{list.subkriteria.name}</TableCell>
                          )
                        })}
                        <TableCell align='center'>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Link href={`/nilai/edit/${row.id}`}>
                              <Button variant='contained' color='warning'>UBAH</Button>
                            </Link>
                            <Button
                              variant='contained'
                              color='error'
                              onClick={() => deleteTable({ kostum_id: row.id }).then(() => refetch())}
                            >
                              HAPUS
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={listNilai ? listNilai.length : 10}
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