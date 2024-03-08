import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AccountAvatar from './AccountAvatar'

const Navbar = () => {
	const menuList: string[] = ['HOME', 'ABOUT', 'KOSTUM', 'KRITERIA', 'NILAI', 'METODE', 'HASIL']
	const router = useRouter()
	return (
		<>
			<Box sx={{ position: 'sticky', top: 0, width: '100%', display: 'flex', background: 'rgba(246, 162, 162, 0.8)', py: 1, backdropFilter: 'blur(8px)' }}>
				<Container sx={{ width: '95%', m: 'auto', display: 'flex', justifyContent: 'space-between' }}>
					<Image src={'/assets/coscision-logo.png'} width={2000} height={2000} alt='logo' style={{ width: 80, height: 80 }} />
					<Box width={'50%'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						{menuList.map((item, index) => {
							const href = item === 'HOME' ? '/' : `/${item.toLocaleLowerCase()}`
							const active = router.route === href ? 'active' : 'nav-link'
							return (
								<Link href={href} className={active} key={index}>{item}</Link>
							)
						})}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0cfcf', height: '30%', my: 'auto', py: 1, px: 2, borderRadius: 10 }}>
						<Box sx={{}}>
							<Typography sx={{fontSize: '12px'}}>Welcome back,</Typography>
							<Typography sx={{fontSize: '12px'}}>User1</Typography>
						</Box>
						<AccountAvatar />
					</Box>
				</Container>
			</Box>
		</>
	)
}

export default Navbar