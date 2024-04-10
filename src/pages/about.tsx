import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

const About = () => {
	return (
		<>
		<Head>
			<title>Coscision - About</title>
		</Head>
			<Box sx={{ px: 5, py: 2, display: 'flex', flexDirection: 'column', gap: 5 }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { mobile: 'column-reverse', laptop: 'row' } }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: { mobile: '100%', laptop: '70%' } }}>
						{/* WHAT IS COSCISION */}
						<Typography variant='h5' sx={{ fontWeight: '600', textAlign: { mobile: 'center', laptop: 'start' } }}>What is Coscision?</Typography>
						<Typography sx={{ textAlign: { mobile: 'center', laptop: 'start' } }}>
							Coscision merupakan sebuah sistem dalam bentuk website yang akan merekomendasikan kostum sesuai dengan keinginan dan kebutuhan cosplayer. Kostum yang direkomendasikan ini akan diurutkan berdasarkan kebutuhan cosplayer dalam memilih kostum.
						</Typography>
					</Box>
					<Box sx={{ width: { mobile: '60%', laptop: '15%' }, margin: 'auto' }}>
						<Image src={'/assets/coscision-logo.png'} alt='logo' width={2000} height={2000} style={{ width: '100%', height: '100%', margin: 'auto' }} />
					</Box>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { mobile: 'column', laptop: 'row' } }}>
					<Box sx={{ width: { mobile: '60%', laptop: '15%' }, margin: 'auto' }}>
						<Image src={'/assets/about2.jpg'} alt='logo' width={2000} height={2000} style={{ width: '100%', height: '100%', margin: 'auto', borderRadius: 50 }} />
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: {mobile: '100%', laptop: '70%'} }}>
						{/* WHAT WILL YOU DO */}
						<Typography variant='h5' sx={{ fontWeight: '600', textAlign: { mobile: 'center', laptop: 'right' } }}>What will you get?</Typography>
						<Typography sx={{ textAlign: { mobile: 'center', laptop: 'right' } }}>
							Sistem ini akan mewajibkan pengguna untuk mengisi nilai kostum berdasarkan kriteria yang telah disediakan. Pada setiap kriteria, pengguna memasukkan nilai sesuai dengan kondisi kostum yang dibutuhkan. Setelah pengguna memberikan penilaian, maka data akan diproses kemudian hasil rekomendasi akan diurutkan dari nilai tertinggi sebagai kostum yang sangat direkomendasikan.
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { mobile: 'column-reverse', laptop: 'row' } }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: { mobile: '100%', laptop: '70%' } }}>
						{/* ABOUT SAW */}
						<Typography variant='h5' sx={{ fontWeight: '600', textAlign: { mobile: 'center', laptop: 'start' } }}>About SAW Method</Typography>
						<Typography sx={{ textAlign: { mobile: 'center', laptop: 'start' } }}>
							Metode Simple Additive Weighting (SAW) merupakan salah satu metode yang digunakan dalam proses pengambilan suatu keputusan. Metode ini membantu pengguna untuk membuat keputusan saat pengguna memiliki beberapa pilihan dan banyak faktor yang perlu dipertimbangkan. Metode SAW membantu pengguna dalam mengurutkan pilihan-pilihan berdasarkan pada faktor-faktor yang telah ditetapkan, dengan mempertimbangkan seberapa penting setiap faktor tersebut. Sebagai contoh, pengguna menilai setiap pilihan (misalnya, setiap smartphone) berdasarkan faktor-faktor seperti harga, kualitas kamera, dan lain - lain. Misalnya, untuk smartphone A, harganya rendah, tetapi kualitas kameranya tidak sebaik yang diinginkan. Setelah semua pilihan dinilai, maka dilakukan perhitungan nilai - nilai untuk setiap faktor yang memengaruhi. 
						</Typography>
					</Box>
					<Box sx={{ width: { mobile: '60%', laptop: '15%' }, margin: 'auto' }}>
						<Image src={'/assets/about3.png'} alt='logo' width={2000} height={2000} style={{ width: '100%', height: '100%', margin: 'auto', borderRadius: '50%' }} />
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default About
