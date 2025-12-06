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
import StarfieldBackground from '../components/starfield-bg'
import {
  WelcomeBanner,
  AnimatedDivider,
  BeveledContainer,
  NeonGlowText,
  BlinkingText,
  BestViewedBadge
} from '../components/retro-decorations'

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
import thumbFlacon from '../public/projectImage/falcon.png'

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
  <>
    <StarfieldBackground />
    <Container position="relative" zIndex={1}>
      <WelcomeBanner title="🚀 MY AWESOME PROJECTS 🚀" />

      <BeveledContainer
        mb={6}
        textAlign="center"
      >
        <NeonGlowText color={useColorModeValue('#FF00FF', '#00FFFF')}>
          Here's more detail about the projects I've worked on <BlinkingText>✨</BlinkingText>
        </NeonGlowText>
      </BeveledContainer>

      <AnimatedDivider />

      <BeveledContainer mb={6}>
        <Heading as="h3" variant="section-title">
          <NeonGlowText color={useColorModeValue('#FF1493', '#00FF00')}>
            AI Projects <BlinkingText>🤖</BlinkingText>
          </NeonGlowText>
        </Heading>

      <SimpleGrid columns={[1, 1, 3]} gap={6}>

        <Section>
          <GridItem id="https://github.com/akumar23/Collision-Detection-Neural-Net" title="Collision Detection Neural Net" thumbnail={thumbRobot}>
            Autonomous navigation system using neural networks to enable robots to avoid obstacles in real-time through sensor-based decision-making. Achieved 99% collision avoidance success rate across 100+ test scenarios.
            <br></br>
            <b>made with:</b> Python, scikit-learn, Pygame, NumPy
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/digit-predictor-neural-net" title="Digit Predictor Neural Net" thumbnail={thumbDigit}>
            Handwritten digit recognition neural network built from scratch using only NumPy and Matplotlib, demonstrating fundamental deep learning concepts without high-level frameworks. Implements backpropagation and gradient descent for image classification.
            <br></br>
            <b>made with:</b> Python
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/hf-model-train" title="LLM Fine-Tuning Toolkit" thumbnail={thumbTrain}>
            Command-line toolkit that democratizes billion-parameter language model fine-tuning for consumer hardware through LoRA and 4-bit quantization, reducing memory requirements by 90%. Enables training models like Mistral-7B and LLaMA-2 on 12-16GB GPUs with built-in experiment tracking and checkpoint resumption.
            <br></br>
            <b>made with:</b> Python, PyTorch, HuggingFace Transformers, PEFT, LoRA
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://huggingface.co/akumar23/mental-falcon-7b" title="Mental Falcon 7b" thumbnail={thumbFlacon}>
            Fine-tuned 7-billion parameter language model specialized for mental health support and wellness conversations. Built on Falcon-7B architecture and optimized using parameter-efficient fine-tuning techniques.
            <br></br>
            <b>made with:</b> Python
          </GridItem>
        </Section>

      </SimpleGrid>
      </BeveledContainer>

      <AnimatedDivider />

      <BeveledContainer mb={6}>
        <Heading as="h3" variant="section-title">
          <NeonGlowText color={useColorModeValue('#0000FF', '#FFFF00')}>
            Full Stack Projects <BlinkingText>💻</BlinkingText>
          </NeonGlowText>
        </Heading>

      <SimpleGrid columns={[1, 1, 3]} gap={6}>
        <Section>
          <GridItem id="https://comic-ranker.vercel.app/" title="Character Rank (work in progress)" thumbnail={thumbRank}>
            Interactive ranking platform where users vote on their favorite characters through an Elo-based ranking system with real-time updates. Features 3D character visualization using Three.js and serverless backend architecture with type-safe tRPC APIs. 
            <br></br>
            <b>made with:</b> node/next.js, TypeScript, TRPC, Tailwind CSS, three.js and firestore
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://fireblog-gray.vercel.app/" title="Fireblog" thumbnail={thumbBlog}>
            Full-stack blogging platform with Google OAuth authentication enabling users to discover, read, and publish articles. Features real-time data synchronization, rich text editing, and responsive design for seamless content creation.
            <br></br>
            <b>made with:</b> node/next.js, JavaScript, Tailwind CSS and firestore
          </GridItem>
        </Section>

      </SimpleGrid>
      </BeveledContainer>

      <AnimatedDivider />

      <BeveledContainer mb={6}>
        <Heading as="h3" variant="section-title">
          <NeonGlowText color={useColorModeValue('#FF00FF', '#00FFFF')}>
            Python Projects <BlinkingText>🐍</BlinkingText>
          </NeonGlowText>
        </Heading>

      <SimpleGrid columns={[1, 1, 3]} gap={6}>

        <Section>
          <GridItem id="https://github.com/akumar23/HAL-AI-AdvisorBot" title="Hal" thumbnail={thumbHal}>
            AI-powered academic advising chatbot designed to help San Jose State University students navigate course selection, degree requirements, and academic planning. Provides instant, personalized guidance through natural language conversations.
            <br></br>
            <b>made with:</b> Python, Flask, JavaScript, CSS and HTML
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/SnakeGame" title="Snake Game" thumbnail={thumbSnake}>
            Browser-based Snake game with user authentication, persistent high score tracking, and real-time leaderboards. Combines classic arcade gameplay with modern full-stack architecture for competitive multiplayer experience.
            <br></br>
            <b>made with:</b> Python, JavaScript, Flask, mySQL, CSS and HTML
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/django-rest" title="Django Rest API (work in progress)" thumbnail={thumbRest}>
            RESTful API framework demonstrating enterprise-grade backend architecture with Django, featuring CRUD operations, authentication, and database modeling. Showcases best practices for scalable API design and documentation.
            <br></br>
            <b>made with:</b> Python, Django, Rest API
          </GridItem>
        </Section>

      </SimpleGrid>
      </BeveledContainer>

      <AnimatedDivider />

      <BeveledContainer mb={6}>
        <Heading as="h3" variant="section-title">
          <NeonGlowText color={useColorModeValue('#FF1493', '#00FF00')}>
            Java Projects <BlinkingText>☕</BlinkingText>
          </NeonGlowText>
        </Heading>

      <SimpleGrid columns={[1, 1, 3]} gap={6}>
      <Section>
          <GridItem id="https://github.com/jawnhoang/FastPages" title="Fast Pages" thumbnail={thumbFast}>
            Cloud-native library management system built with Spring Boot and deployed on AWS infrastructure. Features containerized deployment with Docker, RDS database integration, and responsive web interface for catalog management and user transactions.
            <br></br>
            <b>made with:</b> Java, Springboot, AWS, Docker, RDS, mySQL, CSS (bootstrap), HTML
          </GridItem>
        </Section>

        <Section>
          <GridItem id="https://github.com/akumar23/automated-AI-app-testing" title="AI App Testing" thumbnail={thumbTest}>
            Automated testing framework for Android AI chat applications using emulator-based UI testing and validation. Streamlines quality assurance by programmatically simulating user interactions and verifying conversational AI responses.
            <br></br>
            <b>made with:</b> Java, Android Emulator
          </GridItem>
        </Section>

      </SimpleGrid>
      </BeveledContainer>

      <BestViewedBadge />
    </Container>
  </>
)
export default Projects
export {getServerSideProps} from '../components/chakra'