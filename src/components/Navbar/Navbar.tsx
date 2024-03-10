import { Box, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AccountAvatar from './AccountAvatar'
import { AppRegistration, AssignmentTurnedIn, Checkroom, Home, Info, Science, Score, Menu } from '@mui/icons-material'

const Navbar = () => {
	const router = useRouter()
	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer =
		(anchor: 'left', open: boolean) =>
			(event: React.KeyboardEvent | React.MouseEvent) => {
				if (
					event.type === 'keydown' &&
					((event as React.KeyboardEvent).key === 'Tab' ||
						(event as React.KeyboardEvent).key === 'Shift')
				) {
					return;
				}

				setState({ ...state, [anchor]: open });
			};

	const menu = [
		{ name: 'HOME', logo: <Home /> },
		{ name: 'ABOUT', logo: <Info /> },
		{ name: 'KOSTUM', logo: <Checkroom /> },
		{ name: 'KRITERIA', logo: <AppRegistration /> },
		{ name: 'NILAI', logo: <Score /> },
		{ name: 'METODE', logo: <Science /> },
		{ name: 'HASIL', logo: <AssignmentTurnedIn /> },
	]

	const list = (anchor: 'left') => (
		<Box
			sx={{ width: 250, p: 0 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{menu.map((item, index) => {
					const href: string = item.name === 'HOME' ? '/' : `/${item.name.toLocaleLowerCase()}`
					const active = router.route === href ? 'active' : 'nav-link'
					return (
						<ListItem key={index} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{item.logo}
								</ListItemIcon>
								<Link href={href} className={active}>{item.name}</Link>
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
		</Box>
	);

	return (
		<>
			<Box sx={{ position: 'sticky', top: 0, width: '100%', display: 'flex', background: 'rgba(246, 162, 162, 0.8)', py: 1, backdropFilter: 'blur(8px)', zIndex: 99	 }}>
				<Container sx={{ width: '95%', m: 'auto', display: 'flex', justifyContent: 'space-between' }}>
					<Image src={'/assets/coscision-logo.png'} width={2000} height={2000} alt='logo' style={{ width: 80, height: 80 }} />
					<Box width={'50%'} sx={{ display: { mobile: 'none', laptop: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
						{menu.map((item, index) => {
							const href = item.name === 'HOME' ? '/' : `/${item.name.toLocaleLowerCase()}`
							const active = router.route === href ? 'active' : 'nav-link'
							return (
								<Link href={href} className={active} key={index}>{item.name}</Link>
							)
						})}
					</Box>
					<Box sx={{ display: { mobile: 'flex', laptop: 'none' }, alignItems: 'center' }}>
						<IconButton onClick={toggleDrawer('left', true)}>
							<Menu />
						</IconButton>
						<Drawer
							anchor={'left'}
							open={state.left}
							onClose={toggleDrawer('left', false)}
							sx={{ padding: 0 }}
						>
							{list('left')}
						</Drawer>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0cfcf', height: '30%', my: 'auto', py: 1, px: 2, borderRadius: 10 }}>
						<Box sx={{ display: { mobile: 'none', tablet: 'flex' }, flexDirection: 'column' }}>
							<Typography sx={{ fontSize: '12px' }}>Welcome back,</Typography>
							<Typography sx={{ fontSize: '12px' }}>User1</Typography>
						</Box>
						<AccountAvatar />
					</Box>
				</Container>
			</Box>
		</>
	)
}

export default Navbar