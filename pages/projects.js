import { useState } from 'react'
import {
  Container,
  Heading,
  SimpleGrid,
  Box,
  Button,
  Collapse,
  useColorModeValue,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react'

import { GridItem, FeaturedGridItem } from '../components/grid-item'
import { motion, AnimatePresence } from 'framer-motion'
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

const SeeMoreButton = ({ isExpanded, onClick, count }) => {
  const buttonBg = useColorModeValue('purple.500', 'cyan.500')
  const buttonHoverBg = useColorModeValue('purple.600', 'cyan.600')

  return (
    <Button
      onClick={onClick}
      bg={buttonBg}
      color="white"
      size="md"
      mt={6}
      px={8}
      borderRadius="full"
      _hover={{ bg: buttonHoverBg, transform: 'scale(1.05)' }}
      transition="all 0.2s"
      leftIcon={isExpanded ? null : <span>+</span>}
    >
      {isExpanded ? 'Show Less' : `See ${count} More Project${count > 1 ? 's' : ''}`}
    </Button>
  )
}

const Projects = () => {
  const [expandedSections, setExpandedSections] = useState({
    ai: false,
    fullstack: false,
    python: false,
    java: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <>
      <StarfieldBackground />
      <Container position="relative" zIndex={1}>
        <WelcomeBanner title="MY AWESOME PROJECTS" />

        <BeveledContainer
          mb={6}
          textAlign="center"
        >
          <NeonGlowText color={useColorModeValue('#FF00FF', '#00FFFF')}>
            Here's more detail about the projects I've worked on <BlinkingText>✨</BlinkingText>
          </NeonGlowText>
        </BeveledContainer>

        <AnimatedDivider />

        {/* AI Projects Section */}
        <BeveledContainer mb={6}>
          <Heading as="h3" variant="section-title">
            <NeonGlowText color={useColorModeValue('#FF1493', '#00FF00')}>
              AI Projects <BlinkingText>🤖</BlinkingText>
            </NeonGlowText>
          </Heading>

          <Section>
            <FeaturedGridItem id="https://github.com/akumar23/hf-model-train" title="LLM Fine-Tuning Toolkit" thumbnail={thumbTrain}>
              Command-line toolkit that democratizes billion-parameter language model fine-tuning for consumer hardware through LoRA and 4-bit quantization, reducing memory requirements by 90%. Enables training models like Mistral-7B and LLaMA-2 on 12-16GB GPUs with built-in experiment tracking and checkpoint resumption.
              <br /><br />
              <b>Made with:</b> Python, PyTorch, HuggingFace Transformers, PEFT, LoRA
            </FeaturedGridItem>
          </Section>

          <Collapse in={expandedSections.ai} animateOpacity>
            <SimpleGrid columns={[1, 1, 2]} gap={6} mt={6}>
              <Section delay={0.1}>
                <GridItem id="https://github.com/akumar23/Collision-Detection-Neural-Net" title="Collision Detection Neural Net" thumbnail={thumbRobot}>
                  Autonomous navigation system using neural networks to enable robots to avoid obstacles in real-time through sensor-based decision-making. Achieved 99% collision avoidance success rate across 100+ test scenarios.
                  <br /><br />
                  <b>Made with:</b> Python, scikit-learn, Pygame, NumPy
                </GridItem>
              </Section>

              <Section delay={0.2}>
                <GridItem id="https://github.com/akumar23/digit-predictor-neural-net" title="Digit Predictor Neural Net" thumbnail={thumbDigit}>
                  Handwritten digit recognition neural network built from scratch using only NumPy and Matplotlib, demonstrating fundamental deep learning concepts without high-level frameworks.
                  <br /><br />
                  <b>Made with:</b> Python, NumPy, Matplotlib
                </GridItem>
              </Section>

              <Section delay={0.3}>
                <GridItem id="https://huggingface.co/akumar23/mental-falcon-7b" title="Mental Falcon 7b" thumbnail={thumbFlacon}>
                  Fine-tuned 7-billion parameter language model specialized for mental health support and wellness conversations. Built on Falcon-7B architecture and optimized using parameter-efficient fine-tuning techniques.
                  <br /><br />
                  <b>Made with:</b> Python, HuggingFace, PEFT
                </GridItem>
              </Section>
            </SimpleGrid>
          </Collapse>

          <Box textAlign="center">
            <SeeMoreButton
              isExpanded={expandedSections.ai}
              onClick={() => toggleSection('ai')}
              count={3}
            />
          </Box>
        </BeveledContainer>

        <AnimatedDivider />

        {/* Full Stack Projects Section */}
        <BeveledContainer mb={6}>
          <Heading as="h3" variant="section-title">
            <NeonGlowText color={useColorModeValue('#0000FF', '#FFFF00')}>
              Full Stack Projects <BlinkingText>💻</BlinkingText>
            </NeonGlowText>
          </Heading>

          <Section>
            <FeaturedGridItem id="https://comic-ranker.vercel.app/" title="Character Rank" thumbnail={thumbRank}>
              Interactive ranking platform where users vote on their favorite characters through an Elo-based ranking system with real-time updates. Features 3D character visualization using Three.js and serverless backend architecture with type-safe tRPC APIs.
              <br /><br />
              <b>Made with:</b> Next.js, TypeScript, tRPC, Tailwind CSS, Three.js, Firestore
            </FeaturedGridItem>
          </Section>

          <Collapse in={expandedSections.fullstack} animateOpacity>
            <SimpleGrid columns={[1, 1, 1]} gap={6} mt={6} maxW="600px" mx="auto">
              <Section delay={0.1}>
                <GridItem id="https://fireblog-gray.vercel.app/" title="Fireblog" thumbnail={thumbBlog}>
                  Full-stack blogging platform with Google OAuth authentication enabling users to discover, read, and publish articles. Features real-time data synchronization, rich text editing, and responsive design.
                  <br /><br />
                  <b>Made with:</b> Next.js, JavaScript, Tailwind CSS, Firestore
                </GridItem>
              </Section>
            </SimpleGrid>
          </Collapse>

          <Box textAlign="center">
            <SeeMoreButton
              isExpanded={expandedSections.fullstack}
              onClick={() => toggleSection('fullstack')}
              count={1}
            />
          </Box>
        </BeveledContainer>

        <AnimatedDivider />

        {/* Python Projects Section */}
        <BeveledContainer mb={6}>
          <Heading as="h3" variant="section-title">
            <NeonGlowText color={useColorModeValue('#FF00FF', '#00FFFF')}>
              Python Projects <BlinkingText>🐍</BlinkingText>
            </NeonGlowText>
          </Heading>

          <Section>
            <FeaturedGridItem id="https://github.com/akumar23/HAL-AI-AdvisorBot" title="HAL - AI Academic Advisor" thumbnail={thumbHal}>
              AI-powered academic advising chatbot designed to help San Jose State University students navigate course selection, degree requirements, and academic planning. Provides instant, personalized guidance through natural language conversations.
              <br /><br />
              <b>Made with:</b> Python, Flask, JavaScript, CSS, HTML
            </FeaturedGridItem>
          </Section>

          <Collapse in={expandedSections.python} animateOpacity>
            <SimpleGrid columns={[1, 1, 2]} gap={6} mt={6}>
              <Section delay={0.1}>
                <GridItem id="https://github.com/akumar23/SnakeGame" title="Snake Game" thumbnail={thumbSnake}>
                  Browser-based Snake game with user authentication, persistent high score tracking, and real-time leaderboards. Combines classic arcade gameplay with modern full-stack architecture.
                  <br /><br />
                  <b>Made with:</b> Python, Flask, JavaScript, MySQL
                </GridItem>
              </Section>

              <Section delay={0.2}>
                <GridItem id="https://github.com/akumar23/django-rest" title="Django REST API" thumbnail={thumbRest}>
                  RESTful API framework demonstrating enterprise-grade backend architecture with Django, featuring CRUD operations, authentication, and database modeling.
                  <br /><br />
                  <b>Made with:</b> Python, Django, REST Framework
                </GridItem>
              </Section>
            </SimpleGrid>
          </Collapse>

          <Box textAlign="center">
            <SeeMoreButton
              isExpanded={expandedSections.python}
              onClick={() => toggleSection('python')}
              count={2}
            />
          </Box>
        </BeveledContainer>

        <AnimatedDivider />

        {/* Java Projects Section */}
        <BeveledContainer mb={6}>
          <Heading as="h3" variant="section-title">
            <NeonGlowText color={useColorModeValue('#FF1493', '#00FF00')}>
              Java Projects <BlinkingText>☕</BlinkingText>
            </NeonGlowText>
          </Heading>

          <Section>
            <FeaturedGridItem id="https://github.com/jawnhoang/FastPages" title="Fast Pages" thumbnail={thumbFast}>
              Cloud-native library management system built with Spring Boot and deployed on AWS infrastructure. Features containerized deployment with Docker, RDS database integration, and responsive web interface for catalog management and user transactions.
              <br /><br />
              <b>Made with:</b> Java, Spring Boot, AWS, Docker, RDS, MySQL
            </FeaturedGridItem>
          </Section>

          <Collapse in={expandedSections.java} animateOpacity>
            <SimpleGrid columns={[1, 1, 1]} gap={6} mt={6} maxW="600px" mx="auto">
              <Section delay={0.1}>
                <GridItem id="https://github.com/akumar23/automated-AI-app-testing" title="AI App Testing Framework" thumbnail={thumbTest}>
                  Automated testing framework for Android AI chat applications using emulator-based UI testing and validation. Streamlines quality assurance by programmatically simulating user interactions.
                  <br /><br />
                  <b>Made with:</b> Java, Android Emulator
                </GridItem>
              </Section>
            </SimpleGrid>
          </Collapse>

          <Box textAlign="center">
            <SeeMoreButton
              isExpanded={expandedSections.java}
              onClick={() => toggleSection('java')}
              count={1}
            />
          </Box>
        </BeveledContainer>

        <BestViewedBadge />
      </Container>
    </>
  )
}
export default Projects
export {getServerSideProps} from '../components/chakra'