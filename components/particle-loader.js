import {forwardRef} from 'react'
import {Box, Center, Heading, Spinner, Button, Container} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

export const ParticleSpin = () => {
    <Spinner
        size="xl"
        position="absolute"
        left="50%"
        top="50%"
        mi="calc(0px - var(--spinner-sie)/2)"
        mt="calc(0px - var(--spinner-size))"
    />
    
}

export const ParticleContainer = forwardRef(({children}, ref) => (

        <Box
            ref={ref}
            className="particle"
            m="auto"
            mt={['-20px', '-60px', '-120px']}
            mb={['-40px', '-140px', '-200px']}
            w={[280, 480, 640]}
            h={[280, 480, 640]}
            position="relative"
        >

            <NextLink href="/home" passHref scroll={false}>
                <Center>
                    <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                        Enter my site
                    </Button>
                </Center>
            </NextLink>
            {children}

        </Box>

))

const Loader = () => {
    return (
        <ParticleContainer>
            <ParticleSpin />
        </ParticleContainer>
    )
}
export default Loader