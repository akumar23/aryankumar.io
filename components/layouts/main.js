import Head from 'next/head'
import dynamic from 'next/dynamic'
import {Box, Container} from '@chakra-ui/react'
import NavBar from '../navbar'
import ParticleLoader from '../particle-loader'

const LoadParticles = dynamic(() => import('../particles'), {
    ssr:false,
    loading: () => <ParticleLoader />
})

const Main = ({children, router}) => {
    return (
        <Box as="main" pb={8}>

            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title> aryankumar.io </title>
            </Head>
            
            <NavBar path={router.asPath} />
            <canvas id="webgl"></canvas>
            <Container maxW="container.md" pt={14}>
                <LoadParticles />
                {children}
            </Container>

        </Box>
    )
}
export default Main 