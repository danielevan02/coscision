import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { Add, ArrowBack, Delete, Edit } from '@mui/icons-material';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Subkriteria = {
  id: number
  name: string
  kriteria_id: number
  skvalue: number
};

const Subkriteria = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string)
  const { data: subkriteria, refetch } = api.kriteria.getSubkriterias.useQuery(id)
  const { mutateAsync: deleteSubkriteria } = api.kriteria.deleteSubkriteria.useMutation()
  const { data: kriteria } = api.kriteria.getKriteria.useQuery(id)
  const { data: session } = useSession()
  const author = session?.user.level === "Admin" ? 'admin' : 'user'

  const columns = useMemo<MRT_ColumnDef<Subkriteria>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nama Subkriteria',
      },
      {
        accessorKey: 'skvalue',
        header: 'Nilai',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: subkriteria ? subkriteria : [],
    muiTableContainerProps: {
      sx: {
        maxHeight: { mobile: '55vh', laptop: 320, desktop: 500 }
      }
    },
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableStickyHeader: true,
    enableRowNumbers: true,
    enableFacetedValues: true,
    enableRowActions: author === 'admin' ? true : false,
    initialState: {
      density: 'spacious',
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <Link key={0} href={`/kriteria/subkriteria/edit/${row.original.id}`} style={{ color: 'black', textDecoration: 'none' }}>
        <MenuItem key={0} onClick={() => closeMenu()}>
          <ListItemIcon><Edit /></ListItemIcon>
          UBAH
        </MenuItem>
      </Link>,
      <MenuItem
        key={0}
        onClick={async () => {
          await deleteSubkriteria(row.original.id).then(() => refetch())
          closeMenu()
        }}
        sx={{ display: author === 'admin' ? undefined : 'none' }}
      >
        <ListItemIcon><Delete /></ListItemIcon>
        DELETE
      </MenuItem>,
    ],
    renderTopToolbarCustomActions: () => (
      <>
        <Box display={'flex'} gap={1}>
          <Link href={`/kriteria/subkriteria/add/${id}`} style={{ textDecoration: 'none' }}>
            <Button variant='contained' sx={{ display: author === 'admin' ? 'flex' : 'none', gap: 1 }}>
              <Add />
              Add
            </Button>
          </Link>
          <Link href={'/kriteria'} style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='info' sx={{ display: 'flex', gap: author === 'admin' ? 1:0 }}>
              <ArrowBack />
              Back
            </Button>
          </Link>
        </Box>
        <Typography variant='h5' fontWeight={100}>
          {`TABEL SUBKRITERIA ${kriteria?.name.toUpperCase()}`}
        </Typography>
      </>
    ),
    muiTableBodyCellProps: {
      align: 'center'
    },
    muiTableHeadCellProps: {
      align: 'center'
    }
  });

  return (
    <>
      <Head>
        <title>Coscision - Kostum</title>
      </Head>
      <Box p={1}>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
};

export default Subkriteria;