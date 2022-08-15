import { 
  Container, 
  Heading, 
  SimpleGrid,  
  Box, 
  useColorModeValue, 
  chakra,
  shouldForwardProp
} from '@chakra-ui/react'

import { GridItem } from '../components/grid-item'
import {motion} from 'framer-motion'

import thumbHal from '../public/projectImage/hal.png'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

export const Section = ({children, delay = 0}) => (
  <StyledDiv 
  initial={{ y:10, opacity:0}} 
  animate= {{y:0, opacity: 1}} 
  transition={{duration:0.8, delay}} 
  mb={6}
  >
    {children}
  </StyledDiv>
)

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

      <SimpleGrid columns={[1, 1, 2]} gap={6}>

        <Section>
          <GridItem id="hal" title="hal" thumbnail={thumbHal}>
            AI chatbot for advising SJSU students
            made with: Python, Flask, JavaScript, CSS and HTML
          </GridItem>
        </Section>


      </SimpleGrid>

    </Container>
)
export default Projects
export {getServerSideProps} from '../components/chakra'