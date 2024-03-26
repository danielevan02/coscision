import { useMemo, useState } from 'react';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef,
} from 'material-react-table';
import { Backdrop, Box, Button, Fade, IconButton, ListItemIcon, MenuItem, Modal, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import Image from 'next/image';
import { env } from '~/env';
import { Add, Cancel, Delete, Edit, Info } from '@mui/icons-material';
import Link from 'next/link';
import Head from 'next/head';

type Kostum = {
	id: number
	name: string
	kset: string
	link: string
	image: string
	preference: string
	origin: string
};

const Kostum = () => {
	const { data: session } = useSession()
	const author = session?.user.level === "Admin" ? 'admin' : 'user'
	const [id, setId] = useState(1)
	const { data: kostum } = api.kostum.getKostum.useQuery(id)
	const { data: kostums, refetch } = api.kostum.getKostums.useQuery()
	const { mutateAsync: deleteKostum } = api.kostum.deleteKostum.useMutation()

	const [nama, setNama] = useState('')
	const [asal, setAsal] = useState('')
	const [preferensi, setPreferensi] = useState('')
	const [list, setList] = useState('')
	const [link, setLink] = useState('')
	const [gambar, setGambar] = useState('')
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		if (kostum) {
			setNama(kostum.name)
			setAsal(kostum.origin)
			setGambar(kostum.image)
			setLink(kostum.link)
			setPreferensi(kostum.preference)
			setList(kostum.kset)
			setOpen(true)
		}
	}

	const columns = useMemo<MRT_ColumnDef<Kostum>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Nama',
			},
			{
				accessorKey: 'origin',
				header: 'Asal',
				filterVariant: 'multi-select'
			},
			{
				accessorKey: 'preference',
				header: 'Preferensi',
				filterVariant: 'multi-select'
			},
			{
				accessorKey: 'image',
				header: 'Gambar',
				Cell: ({ row }) => (
					<Image priority src={`${env.NEXT_PUBLIC_UPLOAD_BASE}${row.original.image}`} alt='gambar' width={500} height={500} style={{ width: 100, height: 'auto', borderRadius: 10 }} />
				),
				enableGlobalFilter: false,
				enableSorting: false,
				enableColumnFilter: false
			}
		],
		[],
	);

	const table = useMaterialReactTable({
		columns,
		data: kostums ? kostums : [],
		muiTableContainerProps: {
			sx: {
				maxHeight: {mobile: '55vh', laptop: 320, desktop: 500}
			}
		},
		enableColumnFilterModes: true,
		enableColumnOrdering: true,
		enableGrouping: true,
		enableColumnPinning: true,
		enableStickyHeader: true,
		enableRowNumbers: true,
		enableFacetedValues: true,
		enableRowActions: true,
		initialState: {
			density: 'compact',
			columnPinning: {
				right: ['mrt-row-actions'],
			},
		},
		renderRowActionMenuItems: ({ closeMenu, row }) => [
			<MenuItem
				key={0}
				onMouseEnter={() => setId(row.original.id)}
				onClick={() => {
					handleOpen()
					closeMenu()
				}}
				sx={{ display: author === 'user' ? undefined : 'none' }}
			>
				<ListItemIcon><Info /></ListItemIcon>
				Information
			</MenuItem>,
			<Link key={0} href={`/kostum/edit/${row.original.id}`} style={{ color: 'black', textDecoration: 'none' }}>
				<MenuItem
					key={0}
					sx={{ display: author === 'admin' ? undefined : 'none' }}
				>
					<ListItemIcon><Edit /></ListItemIcon>
					UBAH
				</MenuItem>
			</Link>,
			<MenuItem
				key={0}
				onMouseEnter={() => setId(row.original.id)}
				onClick={() => deleteKostum(row.original.id).then(() => refetch())}
				sx={{ display: author === 'admin' ? undefined : 'none' }}
			>
				<ListItemIcon><Delete /></ListItemIcon>
				DELETE
			</MenuItem>,
		],
		renderTopToolbarCustomActions: () => (
			<>
				<Link href={'/kostum/add'} style={{ textDecoration: 'none' }}>
					<Button variant='contained' sx={{ display: author === 'admin' ? 'flex' : 'none', gap: 1 }}>
						<Add />
						Add
					</Button>
				</Link>
				<Typography variant='h5' fontWeight={100} sx={{ display: author === 'user' ? 'flex' : 'none', position: 'absolute', left: 10 }}>TABEL KOSTUM</Typography>
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
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { mobile: '70%', tablet: '50%', laptop: '30%' }, height: '60%', background: `linear-gradient(rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.8) 70%), url(${env.NEXT_PUBLIC_UPLOAD_BASE}${gambar})`, backgroundSize: 'contain', backgroundPosition: 'center', border: '1px solid #000', boxShadow: 24, p: 4, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
						<IconButton sx={{ position: 'absolute', right: 5, top: 5 }} color='error' onClick={() => setOpen(false)}>
							<Cancel fontSize='large' />
						</IconButton>
						<Typography id="transition-modal-title" variant="h6" component="h2" fontWeight={700}>
							{nama}
						</Typography>
						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
							Asal : {asal}
						</Typography>
						<Typography id="transition-modal-description">
							Preferensi : {preferensi}
						</Typography>
						<Typography id="transition-modal-description">
							Set :
						</Typography>
						<Typography component={'ul'} id="transition-modal-description" sx={{ ml: 3 }}>
							{list.split("\n").map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</Typography>
						<Typography id="transition-modal-description">
							Link : <a href={link} target='_blank' style={{ color: 'rgba(66, 188, 245)' }}>{link}</a>
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</>
	);
};

export default Kostum;
