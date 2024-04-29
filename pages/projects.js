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
import thumbFast from '../public/projectImage/fast-pages.png'
import thumbSnake from '../public/projectImage/snake.png'
import thumbRest from '../public/projectImage/rest.png'
import thumbRank from '../public/projectImage/heroRank.png'
import thumbTest from '../public/projectImage/ai-test.png'
import thumbDigit from '../public/projectImage/digit-nn.png'
import thumbRobot from '../public/projectImage/ai-robot.png'
import thumbTrain from '../public/projectImage/model-train.png'
import thumbBlog from '../public/projectImage/blog.png'

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
        <br></br>
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
            AI Projects
          </Heading>
        </Box>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} gap={6}>

        <Section>
          <GridItem id="https://github.com/akumar23/Collision-Detection-Neural-Net" title="Collision Detection Neural Net" thumbnail={thumbRobot}>
            Collision Detection Neural Net
            <br></br>
            <b>made with:</b> Python
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/digit-predictor-neural-net" title="Digit Predictor Neural Net" thumbnail={thumbDigit}>
            A bare bones neural netork made with just numpy and matplotlib to predict a digit based on a picture of it
            <br></br>
            <b>made with:</b> Python
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/hf-model-train" title="Huggingface Model Train Script" thumbnail={thumbTrain}>
            A script that take inputs for a huggingface model and dataset then the script should train the model using that dataset.
            <br></br>
            <b>made with:</b> Python
          </GridItem>
        </Section>

      </SimpleGrid>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h3" variant="section-title">
            Full Stack Projects
          </Heading>
        </Box>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} gap={6}>
        <Section>
          <GridItem id="https://comic-ranker.vercel.app/" title="Character Rank (work in progress)" thumbnail={thumbRank}>
            Full stack webapp where characters are ranked based on user's votes 
            <br></br>
            <b>made with:</b> node/next.js, TypeScript, TRPC, Tailwind CSS, three.js and firestore
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://fireblog-gray.vercel.app/" title="Fireblog" thumbnail={thumbBlog}>
            Full stack blog webapp where users can browse posts then login with a google account to write their own posts
            <br></br>
            <b>made with:</b> node/next.js, JavaScript, Tailwind CSS and firestore
          </GridItem>
        </Section>

      </SimpleGrid>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h3" variant="section-title">
            Python Projects
          </Heading>
        </Box>
      </Box>

      <SimpleGrid columns={[1, 1, 3]} gap={6}>

        <Section>
          <GridItem id="https://github.com/akumar23/HAL-AI-AdvisorBot" title="Hal" thumbnail={thumbHal}>
            AI chatbot for advising SJSU students
            <br></br>
            <b>made with:</b> Python, Flask, JavaScript, CSS and HTML
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/SnakeGame" title="Snake Game" thumbnail={thumbSnake}>
            Full stack webapp to let users play the game snake
            <br></br>
            <b>made with:</b> Python, JavaScript, Flask, mySQL, CSS and HTML
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/django-rest" title="Django Rest API (work in progress)" thumbnail={thumbRest}>
            Django Framework to work with Rest APIs
            <br></br>
            <b>made with:</b> Python, Django, Rest API
          </GridItem>
        </Section>

      </SimpleGrid>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h3" variant="section-title">
            Java Projects
          </Heading>
        </Box>
      </Box>

    <SimpleGrid columns={[1, 1, 3]} gap={6}>
      <Section>
          <GridItem id="https://github.com/jawnhoang/FastPages" title="Fast Pages" thumbnail={thumbFast}>
            Online library system
            <br></br>
            <b>made with:</b> Java, Springboot, AWS, Docker, RDS, mySQL, CSS (bootstrap), HTML
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/automated-AI-app-testing" title="AI App Testing" thumbnail={thumbTest}>
            Aumoated App testing for an AI chat app
            <br></br>
            <b>made with:</b> Java, Android Emulator
          </GridItem>
        </Section>

    </SimpleGrid>

    </Container>
)
export default Projects
export {getServerSideProps} from '../components/chakra'