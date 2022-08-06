import { 
  Container, 
  Heading, 
  SimpleGrid, 
  Divider, 
  Box, 
  useColorModeValue 
} from '@chakra-ui/react'

const Projects = () => (
    <Container>
        
        <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Here's more detail about the projects I've worked on
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h3" variant="section-title">
            Project List
          </Heading>
        </Box>
      </Box>

    </Container>
)
export default Projects
export {getServerSideProps} from '../components/chakra'