import Head from 'next/head'
import React from 'react'
import { Alert, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

const signupSchema = z
	.object({
		name: z.string().min(1, "Nama tidak boleh kosong"),
		username: z.string().min(2, "Username minimal 2 huruf"),
		password: z.string().min(4, "Password minimal 4 karakter"),
		rpass: z.string()
	}).refine((data) => data.password === data.rpass, { message: 'Retype Password tidak sama dengan password', path: ['rpass'] })

type SignupForm = z.infer<typeof signupSchema>

const SignUp = () => {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)
	const [showPassword, setShowPassword] = React.useState(false);
	const [showRpass, setShowRpass] = React.useState(false);

	const { mutate } = api.user.register.useMutation()
	const {
		register, 
		handleSubmit, 
		formState: { errors },
		getValues
	} = useForm<SignupForm>({ resolver: zodResolver(signupSchema) })

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowRpass = () => setShowRpass((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const handleMouseDownRpass = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	
	const onSubmit = async () => {
		setOpen(true)
		mutate({
			name: getValues('name'),
			password: getValues('password'),
			username: getValues('username')
		})
		await router.push('/login')
	}

	return (
		<>
			<Head>
				<title>Coscision - Sign Up</title>
			</Head>
			<Box sx={{ width: { mobile: '90%', laptop: '40%' }, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
				<form action="" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }} onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ width: { mobile: '25%', laptop: '15%' } }}>
						<Image src={"/assets/logo-head.png"} width={2000} height={2000} style={{ width: '100%', height: '100%' }} alt='logo' />
					</Box>
					<Typography sx={{ fontWeight: '700', mb: 3 }} variant='h4'>Sign Up</Typography>
					<Box width={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
						<Box display={'flex'} flexDirection={'column'} width={'80%'} m={'auto'}>
							<TextField label='Name' size='small' sx={{ background: 'white', borderRadius: 3, '& .MuiInputBase-root': { borderRadius: 3 } }} {...register('name', { required: true })} />
							{errors.name && <Typography variant='caption' sx={{ color: 'red' }}>{errors.name.message}</Typography>}
						</Box>
						<Box display={'flex'} flexDirection={'column'} width={'80%'} m={'auto'}>
							<TextField label='Username' size='small' sx={{ background: 'white', borderRadius: 3, '& .MuiInputBase-root': { borderRadius: 3 } }} {...register('username', { required: true })} />
							{errors.username && <Typography variant='caption' sx={{ color: 'red' }}>{errors.username.message}</Typography>}
						</Box>
						<Box display={'flex'} flexDirection={'column'} width={'80%'} m={'auto'}>
							<FormControl variant="outlined" size='small'>
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
									{...register('password', { required: true })}
								/>
							</FormControl>
							{errors.password && <Typography variant='caption' sx={{ color: 'red' }}>{errors.password.message}</Typography>}
						</Box>
						<Box display={'flex'} flexDirection={'column'} width={'80%'} m={'auto'}>
							<FormControl variant="outlined" size='small'>
								<InputLabel htmlFor="outlined-adornment-password">Re-type Password</InputLabel>
								<OutlinedInput
									sx={{ background: 'white', borderRadius: 3 }}
									type={showRpass ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowRpass}
												onMouseDown={handleMouseDownRpass}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
									label="Re-type Password"
									{...register('rpass', { required: true })}
								/>
							</FormControl>
							{errors.rpass && <Typography variant='caption' sx={{ color: 'red' }}>{errors.rpass.message}</Typography>}
						</Box>
						<Button variant='contained' sx={{ background: '#8156FA', ':hover': { background: '#3e297a' }, width: '80%', mt: 2, margin: 'auto' }} type='submit' >Register</Button>
						<Typography sx={{ width: '80%', margin: 'auto' }}>Already have account? <Link href={'/login'} style={{ color: 'blue' }}>Login</Link></Typography>
					</Box>
				</form>
			</Box>
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				sx={{width: '30%' }}
			>
				<Alert onClose={handleClose} severity='success' variant='filled'>
					Akun berhasil dibuat!
				</Alert>
			</Snackbar>
		</>
	)
}

export default SignUp