import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Head from 'next/head'
import Image from 'next/image';
import React, { useState } from 'react'
import { api } from '~/utils/api';

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

const Hasil = () => {
  const { data } = api.saw.getSelected.useQuery({with_norm: true})
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', opacity: 0.5, alignItems: 'center' }}>
          <Typography variant='h5' mb={2} fontWeight={800} sx={{}}>HASIL ANALISA METODE SAW</Typography>
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
                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    const numbering = page * rowsPerPage + rowIndex + 1
                    return (
                      <TableRow 
                        hover={rowIndex >= 0 && rowIndex <= 2 ? false : true} 
                        key={rowIndex}
                        sx={
                          rowIndex === 0 ? 
                          {background: '#dcaf53', height: 80}:
                          rowIndex === 1 ?
                          {background: '#b8b8b8', height: 70}:
                          rowIndex === 2 ?
                          {background: '#805334', height: 60}:undefined
                        }
                      >
                        <TableCell align='center'>{numbering}</TableCell>
                        <TableCell 
                          align='center'
                          sx={
                            rowIndex === 0 ? 
                            { fontSize: 30, fontWeight: 700, p: 0 } : 
                            rowIndex === 1 ? 
                            { fontSize: 25, fontWeight: 600, p: 0 } :
                            rowIndex === 2 ?
                            { fontSize: 20, fontWeight: 500, p: 0} : undefined
                          }
                        >
                          {row.name}
                        </TableCell>
                        <TableCell 
                          align='center'
                          sx={
                            rowIndex === 0 ? 
                            { fontSize: 30, fontWeight: 700, p: 0 } : 
                            rowIndex === 1 ? 
                            { fontSize: 25, fontWeight: 600, p: 0 } :
                            rowIndex === 2 ?
                            { fontSize: 20, fontWeight: 500, p: 0} : undefined
                          }
                        >
                          {row.saw.toFixed(3)}
                        </TableCell>
                        <TableCell align='center'>
                          { rowIndex === 0 ? 
                            <Image src={`/assets/rank${numbering}.png`} alt='rank' width={1000} height={1000} style={{ width: '15%', height: 'auto' }} /> : 
                            rowIndex === 1 ?
                            <Image src={`/assets/rank${numbering}.png`} alt='rank' width={1000} height={1000} style={{ width: '12%', height: 'auto' }} /> : 
                            rowIndex === 2 ?
                            <Image src={`/assets/rank${numbering}.png`} alt='rank' width={1000} height={1000} style={{ width: '10%', height: 'auto' }} /> : 
                            numbering
                          }
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
            count={data ? data.length : 10}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  )
}

export default Hasil