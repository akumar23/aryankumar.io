import {
    Link,
    Container,
    Heading,
    Box,
    SimpleGrid,
    Button,
    List,
    ListItem,
    useColorModeValue,
    chakra,
    Tab,
    Center
  } from '@chakra-ui/react'

import '../styles/Home.module.css'
import NextLink from 'next/link'
  
const Contact = () => (
    <Container>

        <br></br>
  
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h3" variant="section-title">
              Contact
            </Heading>
          </Box>
        </Box>
        
        <br></br>
        Email: kumar.aryan@gmail.com 
        <br></br>

        <NextLink href="https://www.linkedin.com/in/aryan-kumar-9640b4150/" passHref scroll={false}>
            <Link>LinkedIn</Link>
          </NextLink>
        
    </Container>
)

export default Contact
export {getServerSideProps} from '../components/chakra'