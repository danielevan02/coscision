import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, Button, ListItemIcon, MenuItem, Skeleton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { Add, Delete, Edit } from '@mui/icons-material';
import Link from 'next/link';
import Head from 'next/head';
import { type Decimal } from '@prisma/client/runtime/library';

type Kriteria = {
  id: number
  name: string
  ktype: string
  weight: Decimal
};

const Kriteria = () => {
  const { data: session } = useSession()
  const { data: kriteria, refetch } = api.kriteria.getKriterias.useQuery()
  const { mutateAsync: deleteKriteria } = api.kriteria.deleteKriteria.useMutation()
  const author = session?.user.level === "Admin" ? 'admin' : 'user'

  const columns = useMemo<MRT_ColumnDef<Kriteria>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nama Kriteria',
      },
      {
        accessorKey: 'weight',
        header: 'Bobot',
      },
      {
        accessorKey: 'ktype',
        header: 'Tipe',
        filterVariant: 'multi-select'
      },
      {
        accessorKey: 'id',
        header: 'Subkriteria',
        Cell: ({ row }) => (
          <Link href={`/kriteria/subkriteria/view/${row.original.id}`}>
            <Button variant='contained'>
              lihat
            </Button>
          </Link>
        ),
        enableColumnDragging: false,
        enableGlobalFilter: false,
        enableSorting: false,
        enableColumnFilter: false,
        enableGrouping: false
      }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: kriteria ? kriteria:[],
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
    enableRowActions: author === 'admin' ? true:false,
    initialState: {
      density: 'compact',
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <Link key={0} href={`/kriteria/edit/${row.original.id}`} style={{ color: 'black', textDecoration: 'none' }}>
        <MenuItem key={0} onClick={()=>closeMenu()}>
          <ListItemIcon><Edit /></ListItemIcon>
          UBAH
        </MenuItem>
      </Link>,
      <MenuItem
        key={0}
        onClick={async ()=>{
          await deleteKriteria(row.original.id).then(() => refetch())
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
        <Link href={'/kriteria/add'} style={{ textDecoration: 'none' }}>
          <Button variant='contained' sx={{ display: author === 'admin' ? 'flex' : 'none', gap: 1 }}>
            <Add />
            Add
          </Button>
        </Link>
        <Typography 
          variant='h5' 
          fontWeight={100} 
          sx={{ display: author === 'user' ? 'flex' : 'none', position: 'absolute', left: 10 }}
        >
          TABEL KRITERIA
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
      {kriteria ?
				<Box p={1}>
					<MaterialReactTable table={table} />
				</Box>:
				<Skeleton variant='rounded' animation='wave' sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90vw', height: '50vh'}} />
			}
    </>
  );
};

export default Kriteria;