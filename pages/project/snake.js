import { 
    Container, 
    Heading,  
    Box, 
  } from '@chakra-ui/react'
  
const Snake = () => (
    <Container>
  
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h3" variant="section-title">
              Snake Game Webapp
            </Heading>
          </Box>
        </Box>

        <video autoPlay loop muted playsInline className='absolute w-ful h-full object-cover'>
            <source src="/static/snake.mp4" type="video/mp4"/>
        </video>
        
    </Container>
)

export default Snake
export {getServerSideProps} from '../../components/chakra'