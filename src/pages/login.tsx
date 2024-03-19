import Head from 'next/head'
import React from 'react'
import { Alert, Box, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { type FieldErrors, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

type LoginForm = {
	user: string
	password: string
}

const Login = () => {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)
	const [showPassword, setShowPassword] = React.useState(false);
	const { register, handleSubmit } = useForm<LoginForm>()
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const onError = (errors: FieldErrors<LoginForm>) => {
		if (errors) {
			alert("Harap isi username dan password")
		}
	}
	const onSubmit = async (data: LoginForm) => {
		console.log(data)
		try {
			const result = await signIn('credentials', { username: data.user, password: data.password, redirect: false })
			console.log(result)
			if (result?.status === 401) {
				setOpen(!open)
			} else {
				await router.push('/')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Head>
				<title>Coscision - Login</title>
			</Head>
			<Box sx={{ width: { mobile: '90%', laptop: '40%' }, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
				<form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }} onSubmit={handleSubmit(onSubmit, onError)} method='post' action="/api/auth/callback/credentials">
					<Box sx={{ width: { mobile: '50%', laptop: '30%' } }}>
						<Image src={"/assets/coscision-logo.png"} width={2000} height={2000} style={{ width: '100%', height: '100%' }} alt='logo' />
					</Box>
					<Box width={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
						<TextField label='Username' sx={{ background: 'white', borderRadius: 3, '& .MuiInputBase-root': { borderRadius: 3 }, width: '80%', margin: 'auto' }} {...register('user', { required: true })} />
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
								{...register('password', { required: true })}
							/>
						</FormControl>
						<Box width={'80%'} margin={'auto'} display={'flex'}>
							<Button variant='contained' sx={{ background: '#8156FA', ':hover': { background: '#3e297a' }, width: '100%' }} type='submit' >Login</Button>
						</Box>
						<Divider sx={{ width: '80%', margin: 'auto', my: 2 }}>{`Don't have Account?`}</Divider>
						<Link href={'/signup'} style={{ width: '80%', margin: 'auto' }}>
							<Button variant='contained' sx={{ width: '100%' }}>Sign Up</Button>
						</Link>
					</Box>
				</form>
			</Box>
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				sx={{width: '30%', }}
			>
				<Alert onClose={handleClose} severity='error' variant='filled'>
					Harap isi username dan password dengan benar
				</Alert>
			</Snackbar>
		</>
	)
}

export default Login