import { 
    Link,
    Container, 
    Heading, 
    SimpleGrid,  
    Box, 
    useColorModeValue, 
    chakra,
    shouldForwardProp
  } from '@chakra-ui/react'
import NextLink from 'next/link'
  
  
const Rest = () => (
    <Container>
  
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h3" variant="section-title">
              Django Rest API
            </Heading>
          </Box>
        </Box>
        
        No demo avalible yet
        <br></br>

        <NextLink href="https://github.com/akumar23/django-rest" passHref scroll={false}>
            <Link>Link to code I've written so far</Link>
          </NextLink>
        
    </Container>
)

export default Rest
export {getServerSideProps} from '../../components/chakra'