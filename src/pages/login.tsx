import Head from 'next/head'
import React from 'react'
import { Box, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<>
			<Head>
				<title>Coscision - Login</title>
			</Head>
			<Box sx={{ width: '40%', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={3}>
				<Image src={"/assets/coscision-logo.png"} width={2000} height={2000} style={{ width: '30%', height: '30%' }} alt='logo' />
				<Box width={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
					<TextField label='Username' sx={{ background: 'white', borderRadius: 3, '& .MuiInputBase-root': { borderRadius: 3 }, width: '80%', margin: 'auto' }} />
					<FormControl sx={{ width: '80%', margin: 'auto' }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
						<OutlinedInput
							sx={{ background: 'white', borderRadius: 3 }}
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
					<Box width={'80%'} margin={'auto'} display={'flex'} justifyContent={'space-between'}>
						<Button variant='contained' sx={{ background: '#8156FA', ':hover': { background: '#3e297a' }, width: '48%' }}>Login User</Button>
						<Button variant='contained' sx={{ background: 'black', ':hover': { background: 'black' }, width: '48%' }}>Login Admin</Button>
					</Box>
					<Divider sx={{ width: '80%', margin: 'auto', my: 2 }}>{`Don't have Account?`}</Divider>
					<Link href={'/signup'} style={{ width: '80%', margin: 'auto' }}>
						<Button variant='contained' sx={{ width: '100%' }}>Sign Up</Button>
					</Link>
				</Box>
			</Box>
		</>
	)
}

export default Login