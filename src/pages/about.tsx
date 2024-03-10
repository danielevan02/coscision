import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const About = () => {
	return (
		<>
			<Box sx={{ px: 5, py: 2, display: 'flex', flexDirection: 'column', gap: 5 }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { mobile: 'column-reverse', laptop: 'row' } }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: { mobile: '100%', laptop: '70%' } }}>
						<Typography variant='h5' sx={{ fontWeight: '600', textAlign: { mobile: 'center', laptop: 'start' } }}>What is Conscision?</Typography>
						<Typography sx={{ textAlign: { mobile: 'center', laptop: 'start' } }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At blanditiis consequuntur ducimus aut ullam minima iure doloremque quo vero nihil ad cum voluptas itaque quam animi atque, voluptates, dolores rem! Tenetur error magnam fugit sequi nobis eaque veritatis, illo, non aliquid aspernatur facere impedit? Ad quae, aliquam placeat voluptatum consequatur asperiores expedita odit fugit voluptatem numquam, corrupti recusandae architecto, aut veritatis aperiam dolorem sequi id iure beatae. Magnam reprehenderit est deserunt asperiores maxime neque, accusamus, enim ex nemo esse aut.</Typography>
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
						<Typography variant='h5' sx={{ fontWeight: '600', textAlign: { mobile: 'center', laptop: 'right' } }}>What will you get?</Typography>
						<Typography sx={{ textAlign: { mobile: 'center', laptop: 'right' } }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At blanditiis consequuntur ducimus aut ullam minima iure doloremque quo vero nihil ad cum voluptas itaque quam animi atque, voluptates, dolores rem! Tenetur error magnam fugit sequi nobis eaque veritatis, illo, non aliquid aspernatur facere impedit? Ad quae, aliquam placeat voluptatum consequatur asperiores expedita odit fugit voluptatem numquam, corrupti recusandae architecto, aut veritatis aperiam dolorem sequi id iure beatae. Magnam reprehenderit est deserunt asperiores maxime neque, accusamus, enim ex nemo esse aut.</Typography>
					</Box>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { mobile: 'column-reverse', laptop: 'row' } }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: { mobile: '100%', laptop: '70%' } }}>
						<Typography variant='h5' sx={{ fontWeight: '600', textAlign: { mobile: 'center', laptop: 'start' } }}>About SAW Method</Typography>
						<Typography sx={{ textAlign: { mobile: 'center', laptop: 'start' } }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At blanditiis consequuntur ducimus aut ullam minima iure doloremque quo vero nihil ad cum voluptas itaque quam animi atque, voluptates, dolores rem! Tenetur error magnam fugit sequi nobis eaque veritatis, illo, non aliquid aspernatur facere impedit? Ad quae, aliquam placeat voluptatum consequatur asperiores expedita odit fugit voluptatem numquam, corrupti recusandae architecto, aut veritatis aperiam dolorem sequi id iure beatae. Magnam reprehenderit est deserunt asperiores maxime neque, accusamus, enim ex nemo esse aut.</Typography>
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