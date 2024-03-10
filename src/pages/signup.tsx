import Head from 'next/head'
import React from 'react'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'

const SignUp = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<>
			<Head>
				<title>Coscision - Sign Up</title>
			</Head>
			<Box sx={{ width: { mobile: '90%', laptop: '40%' }, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={1}>
				<Box sx={{ width: { mobile: '25%', laptop: '15%' } }}>
					<Image src={"/assets/logo-head.png"} width={2000} height={2000} style={{ width: '100%', height: '100%' }} alt='logo' />
				</Box>
				<Typography sx={{ fontWeight: '700', mb: 3 }} variant='h4'>Sign Up</Typography>
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
					<FormControl sx={{ width: '80%', margin: 'auto' }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Re-type Password</InputLabel>
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
							label="Re-type Password"
						/>
					</FormControl>
					<Link href={'/signup'} style={{ width: '80%', margin: 'auto' }}>
						<Button variant='contained' sx={{ background: '#8156FA', ':hover': { background: '#3e297a' }, width: '100%', mt: 2 }}>Register</Button>
					</Link>
					<Typography sx={{ width: '80%', margin: 'auto' }}>Already have account? <Link href={'/login'} style={{ color: 'blue' }}>Login</Link></Typography>
				</Box>
			</Box>
		</>
	)
}

export default SignUp