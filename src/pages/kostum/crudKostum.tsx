import { Box, Button, TextField } from '@mui/material'
import Head from 'next/head'
import React from 'react'

const CrudKostum = () => {
  return (
    <>
      <Head>
        <title>Coscision - Kostum</title>
      </Head>
      <Box sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField fullWidth label="Asal" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} />
        <TextField fullWidth label="Preferensi" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} />
        <TextField fullWidth label="Set" id="fullWidth" rows={4} multiline sx={{ background: 'white', borderRadius: 1 }} />
        <TextField fullWidth label="Link" id="fullWidth" sx={{ background: 'white', borderRadius: 1 }} />
        <input type="file" accept='image/*'/>
        <Box display={'flex'} gap={1} justifyContent={'end'} mt={3}>
          <Button variant='contained' color='error'>Cancel</Button>
          <Button variant='contained' color='primary'>Submit</Button>
        </Box>
      </Box>
    </>
  )
}

export default CrudKostum