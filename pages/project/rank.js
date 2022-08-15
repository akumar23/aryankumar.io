import { 
    Container, 
    Heading, 
    SimpleGrid,  
    Box, 
    useColorModeValue, 
    chakra,
    shouldForwardProp
  } from '@chakra-ui/react'
  
  
  
const Rank = () => (
    <Container>
  
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h3" variant="section-title">
              Character Rank
            </Heading>
          </Box>
        </Box>

        <video autoPlay loop muted playsInline className='absolute w-ful h-full object-cover'>
            <source src="/static/herorank.mp4" type="video/mp4"/>
        </video>
        
    </Container>
)

export default Rank
export {getServerSideProps} from '../../components/chakra'