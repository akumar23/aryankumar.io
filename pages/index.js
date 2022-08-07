import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  Container,
  chakra,
  Center
} from '@chakra-ui/react'
import ParticleLoader from '../components/particle-loader'

const LoadParticles = dynamic(() => import('../components/particles'), {
    ssr:false,
    loading: () => <ParticleLoader />
})

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Index = () => (
    
    <Container>
      
        <Center><canvas id="webgl"></canvas></Center>
        <LoadParticles />

    </Container>
)
export default Index
export { getServerSideProps } from '../components/chakra'