import { useState } from 'react'
import Image from 'next/image'
import {
  Container,
  Heading,
  SimpleGrid,
  Box,
  useColorModeValue,
  VStack,
  HStack,
  Text,
  Link,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { IoRocket, IoCode, IoLogoGithub, IoCube } from 'react-icons/io5'
import Section from '../components/section'
import SketchyButton from '../components/sketchy-button'
import { PlayfulLabel, Squiggle, Star } from '../components/illustrations'

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

const MotionBox = motion(Box)

// Project Card Component - NDS-inspired refined styling
const ProjectCard = ({ title, description, thumbnail, href, technologies, isFeatured }) => {
  // NDS-inspired color scheme
  const cardBg = useColorModeValue('white', 'rgba(51, 51, 52, 0.05)')
  const cardHoverBg = useColorModeValue('neutral.50', 'rgba(51, 51, 52, 0.08)')
  const borderColor = useColorModeValue('neutral.200', 'rgba(255, 255, 255, 0.08)')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const descriptionColor = useColorModeValue('neutral.600', 'neutral.400')
  const tagBg = useColorModeValue('neutral.100', 'rgba(255, 255, 255, 0.05)')
  const tagColor = useColorModeValue('neutral.700', 'neutral.300')

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        _hover={{ textDecoration: 'none' }}
      >
        <Box
          bg={cardBg}
          borderRadius="lg"
          border="1px solid"
          borderColor={borderColor}
          overflow="hidden"
          h="full"
          _hover={{
            bg: cardHoverBg,
            transform: 'translateY(-4px)',
            boxShadow: useColorModeValue(
              '0 12px 40px rgba(0, 0, 0, 0.08)',
              '0 12px 40px rgba(0, 0, 0, 0.4)'
            )
          }}
          transition="all 0.2s ease"
        >
          {/* Thumbnail */}
          <Box position="relative" h="180px" overflow="hidden" bg="neutral.100">
            <Image
              src={thumbnail}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {isFeatured && (
              <Box
                position="absolute"
                top={3}
                right={3}
              >
                <Box
                  bg="primary.500"
                  color="neutral.900"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="600"
                  fontFamily="body"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  Featured
                </Box>
              </Box>
            )}
          </Box>

          {/* Content */}
          <Box p={5}>
            <VStack align="start" spacing={3}>
              <HStack justify="space-between" w="full">
                <Heading
                  as="h3"
                  size="md"
                  noOfLines={1}
                  fontFamily="serif"
                  fontWeight="400"
                  color={textColor}
                  letterSpacing="tight"
                  textTransform="none"
                >
                  {title}
                </Heading>
                <ExternalLinkIcon color={descriptionColor} boxSize={4} />
              </HStack>

              <Text
                fontSize="sm"
                color={descriptionColor}
                noOfLines={3}
                lineHeight="tall"
              >
                {description}
              </Text>

              {/* Technologies - refined tags */}
              <HStack spacing={2} flexWrap="wrap" pt={1}>
                {technologies.map((tech) => (
                  <Box
                    key={tech}
                    px={2}
                    py={0.5}
                    bg={tagBg}
                    borderRadius="md"
                    fontSize="xs"
                    fontFamily="body"
                    fontWeight="500"
                    color={tagColor}
                  >
                    {tech}
                  </Box>
                ))}
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Link>
    </MotionBox>
  )
}

// Section Header Component - NDS-inspired refined styling
const SectionHeader = ({ icon, title, count }) => {
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const mutedColor = useColorModeValue('neutral.500', 'neutral.400')

  return (
    <HStack spacing={4} mb={8} align="center">
      <HStack spacing={3}>
        <Icon as={icon} boxSize={5} color="primary.500" />
        <Heading
          as="h2"
          fontSize="display-sm"
          fontFamily="serif"
          fontWeight="400"
          color={textColor}
          letterSpacing="tight"
          textTransform="none"
        >
          {title}
        </Heading>
      </HStack>
      <Box
        px={3}
        py={1}
        bg={useColorModeValue('neutral.100', 'rgba(255, 255, 255, 0.05)')}
        color={mutedColor}
        fontFamily="body"
        fontWeight="600"
        fontSize="sm"
        borderRadius="full"
      >
        {count} projects
      </Box>
    </HStack>
  )
}

// Show More Button - NDS-inspired refined styling
const ShowMoreButton = ({ isExpanded, onClick, count }) => {
  const buttonBg = useColorModeValue('neutral.100', 'rgba(255, 255, 255, 0.05)')
  const buttonHoverBg = useColorModeValue('neutral.200', 'rgba(255, 255, 255, 0.1)')
  const buttonColor = useColorModeValue('neutral.700', 'neutral.300')

  return (
    <Box mt={8}>
      <Box
        as="button"
        onClick={onClick}
        px={6}
        py={3}
        bg={buttonBg}
        color={buttonColor}
        borderRadius="full"
        fontSize="sm"
        fontFamily="body"
        fontWeight="600"
        transition="all 0.2s ease"
        _hover={{
          bg: buttonHoverBg,
          transform: 'translateY(-1px)'
        }}
      >
        {isExpanded ? 'Show Less' : `Show ${count} More`}
      </Box>
    </Box>
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

  // NDS-inspired section backgrounds
  const sectionBg = useColorModeValue('neutral.50', 'neutral.950')
  const altSectionBg = useColorModeValue('white', 'rgba(51, 51, 52, 0.02)')

  // Project data
  const aiProjects = {
    featured: {
      title: 'LLM Fine-Tuning Toolkit',
      description: 'Command-line toolkit that democratizes billion-parameter language model fine-tuning for consumer hardware through LoRA and 4-bit quantization, reducing memory requirements by 90%.',
      thumbnail: thumbTrain,
      href: 'https://github.com/akumar23/hf-model-train',
      technologies: ['Python', 'PyTorch', 'HuggingFace', 'LoRA']
    },
    additional: [
      {
        title: 'Collision Detection Neural Net',
        description: 'Autonomous navigation system using neural networks for real-time obstacle avoidance with 99% success rate.',
        thumbnail: thumbRobot,
        href: 'https://github.com/akumar23/Collision-Detection-Neural-Net',
        technologies: ['Python', 'scikit-learn', 'Pygame']
      },
      {
        title: 'Digit Predictor Neural Net',
        description: 'Handwritten digit recognition built from scratch using only NumPy, demonstrating core deep learning concepts.',
        thumbnail: thumbDigit,
        href: 'https://github.com/akumar23/digit-predictor-neural-net',
        technologies: ['Python', 'NumPy', 'Matplotlib']
      },
      {
        title: 'Mental Falcon 7B',
        description: 'Fine-tuned 7B parameter LLM specialized for mental health support using parameter-efficient techniques.',
        thumbnail: thumbFlacon,
        href: 'https://huggingface.co/akumar23/mental-falcon-7b',
        technologies: ['Python', 'HuggingFace', 'PEFT']
      }
    ]
  }

  const fullstackProjects = {
    featured: {
      title: 'Character Rank',
      description: 'Interactive ranking platform with Elo-based system, 3D character visualization using Three.js, and serverless backend.',
      thumbnail: thumbRank,
      href: 'https://comic-ranker.vercel.app/',
      technologies: ['Next.js', 'TypeScript', 'tRPC', 'Three.js']
    },
    additional: [
      {
        title: 'Fireblog',
        description: 'Full-stack blogging platform with Google OAuth, real-time sync, and rich text editing.',
        thumbnail: thumbBlog,
        href: 'https://fireblog-gray.vercel.app/',
        technologies: ['Next.js', 'Tailwind', 'Firestore']
      }
    ]
  }

  const pythonProjects = {
    featured: {
      title: 'HAL - AI Academic Advisor',
      description: 'AI-powered chatbot for SJSU students to navigate course selection and degree requirements through natural language.',
      thumbnail: thumbHal,
      href: 'https://github.com/akumar23/HAL-AI-AdvisorBot',
      technologies: ['Python', 'Flask', 'JavaScript']
    },
    additional: [
      {
        title: 'Snake Game',
        description: 'Browser-based game with authentication, high score tracking, and real-time leaderboards.',
        thumbnail: thumbSnake,
        href: 'https://github.com/akumar23/SnakeGame',
        technologies: ['Python', 'Flask', 'MySQL']
      },
      {
        title: 'Django REST API',
        description: 'Enterprise-grade RESTful API framework with CRUD operations and authentication.',
        thumbnail: thumbRest,
        href: 'https://github.com/akumar23/django-rest',
        technologies: ['Python', 'Django', 'REST']
      }
    ]
  }

  const javaProjects = {
    featured: {
      title: 'Fast Pages',
      description: 'Cloud-native library management system on AWS with containerized deployment and RDS integration.',
      thumbnail: thumbFast,
      href: 'https://github.com/jawnhoang/FastPages',
      technologies: ['Java', 'Spring Boot', 'AWS', 'Docker']
    },
    additional: [
      {
        title: 'AI App Testing Framework',
        description: 'Automated testing framework for Android AI apps using emulator-based UI validation.',
        thumbnail: thumbTest,
        href: 'https://github.com/akumar23/automated-AI-app-testing',
        technologies: ['Java', 'Android']
      }
    ]
  }

  const heroBg = useColorModeValue('primary.500', 'neutral.950')
  const heroTextColor = useColorModeValue('neutral.900', 'neutral.50')
  const heroMutedColor = useColorModeValue('neutral.800', 'neutral.400')

  return (
    <Box>
      {/* Hero Section - NDS-inspired refined styling */}
      <Box
        py={{ base: 20, md: 32 }}
        bg={heroBg}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={6} textAlign="center">
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="600"
              color={heroMutedColor}
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Portfolio
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: 'display-md', md: 'display-xl' }}
              fontFamily="serif"
              fontWeight="400"
              color={heroTextColor}
              letterSpacing="tight"
              textTransform="none"
              lineHeight="shorter"
            >
              Selected Works
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={heroMutedColor}
              maxW="600px"
              lineHeight="tall"
            >
              A curated collection of projects spanning AI, full-stack development, and more.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* AI Projects */}
      <Box py={{ base: 12, md: 16 }} bg={sectionBg}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <SectionHeader icon={IoRocket} title="AI & Machine Learning" count={4} />

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Section>
              <ProjectCard {...aiProjects.featured} isFeatured />
            </Section>

            {expandedSections.ai && aiProjects.additional.map((project, index) => (
              <Section key={project.title} delay={index * 0.1}>
                <ProjectCard {...project} />
              </Section>
            ))}
          </SimpleGrid>

          <Box textAlign="center">
            <ShowMoreButton
              isExpanded={expandedSections.ai}
              onClick={() => toggleSection('ai')}
              count={3}
            />
          </Box>
        </Container>
      </Box>

      {/* Full Stack Projects */}
      <Box py={{ base: 12, md: 16 }} bg={altSectionBg}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <SectionHeader icon={IoCube} title="Full Stack" count={2} />

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Section>
              <ProjectCard {...fullstackProjects.featured} isFeatured />
            </Section>

            {expandedSections.fullstack && fullstackProjects.additional.map((project, index) => (
              <Section key={project.title} delay={index * 0.1}>
                <ProjectCard {...project} />
              </Section>
            ))}
          </SimpleGrid>

          <Box textAlign="center">
            <ShowMoreButton
              isExpanded={expandedSections.fullstack}
              onClick={() => toggleSection('fullstack')}
              count={1}
            />
          </Box>
        </Container>
      </Box>

      {/* Python Projects */}
      <Box py={{ base: 12, md: 16 }} bg={sectionBg}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <SectionHeader icon={IoCode} title="Python" count={3} />

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Section>
              <ProjectCard {...pythonProjects.featured} isFeatured />
            </Section>

            {expandedSections.python && pythonProjects.additional.map((project, index) => (
              <Section key={project.title} delay={index * 0.1}>
                <ProjectCard {...project} />
              </Section>
            ))}
          </SimpleGrid>

          <Box textAlign="center">
            <ShowMoreButton
              isExpanded={expandedSections.python}
              onClick={() => toggleSection('python')}
              count={2}
            />
          </Box>
        </Container>
      </Box>

      {/* Java Projects */}
      <Box py={{ base: 12, md: 16 }} bg={altSectionBg}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <SectionHeader icon={IoLogoGithub} title="Java" count={2} />

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Section>
              <ProjectCard {...javaProjects.featured} isFeatured />
            </Section>

            {expandedSections.java && javaProjects.additional.map((project, index) => (
              <Section key={project.title} delay={index * 0.1}>
                <ProjectCard {...project} />
              </Section>
            ))}
          </SimpleGrid>

          <Box textAlign="center">
            <ShowMoreButton
              isExpanded={expandedSections.java}
              onClick={() => toggleSection('java')}
              count={1}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Projects
export { getServerSideProps } from '../components/chakra'
