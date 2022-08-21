import { 
    Container, 
    Heading, 
    Box, 
  } from '@chakra-ui/react'

const Unity = () => (
    <Container>
  
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h3" variant="section-title">
              Unity Setting Creation
            </Heading>
          </Box>
        </Box>

        <video autoPlay loop muted playsInline className='absolute w-ful h-full object-cover'>
            <source src="/static/vr-setting.mp4" type="video/mp4"/>
        </video>
        
    </Container>
)

export default Unity
export {getServerSideProps} from '../../components/chakra'