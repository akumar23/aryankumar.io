import { 
    Container, 
    Heading, 
    SimpleGrid,  
    Box, 
    useColorModeValue, 
    chakra,
    shouldForwardProp
  } from '@chakra-ui/react'
  
  
  
const Fast = () => (
    <Container>
  
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h3" variant="section-title">
              Fast Pages: Online Library System
            </Heading>
          </Box>
        </Box>

        <video autoPlay loop muted playsInline className='absolute w-ful h-full object-cover'>
            <source src="/static/fastPages-short.mp4" type="video/mp4"/>
        </video>
        
    </Container>
)

export default Fast
export {getServerSideProps} from '../../components/chakra'