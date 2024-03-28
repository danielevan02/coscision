import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'

//INI ADALAH HOME PAGE
const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Coscision - Home</title>
      </Head>
      <Box sx={{position:'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant='h1' sx={{ fontWeight: 800, color: 'white', fontSize: 'clamp(1.5rem, 4vw, 5rem)' }}>WELCOME TO</Typography>
        <Typography variant='h1' sx={{ fontWeight: 800, color: 'white', fontSize: 'clamp(3.5rem, 7vw, 10rem)', mb: 5 }}>COSCISION</Typography>
        <Typography variant='h1' sx={{ fontWeight: 800, color: 'white', fontSize: 'clamp(2rem, 4vw, 5rem)', textAlign: 'center' }}>{`WHAT'S IN YOUR MIND?`}</Typography>
      </Box>
    </>
  )
}

export default LandingPage