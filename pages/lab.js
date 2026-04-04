import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { IoLogoGithub } from 'react-icons/io5'
import { motion } from 'framer-motion'
import Section from '../components/section'

const MotionBox = motion(Box)

const apps = [
  {
    name: 'Echo Vault',
    description: 'Privacy-first journaling app with flexible LLM and embedding support. Uses RAG with PGVector for semantic search across entries, configurable time decay for conversational memory, and real-time AI-generated reflections via Celery + Redis streaming. Supports self-hosted or cloud model endpoints.',
    url: 'https://echo-vault-one.vercel.app',
    github: null,
    status: 'LIVE',
    technologies: ['FastAPI', 'Next.js', 'PGVector', 'RAG', 'Celery', 'Redis'],
    accent: '#6366F1'
  },
  {
    name: 'Character Rank',
    description: 'Interactive ranking platform with Elo-based matchup system and 3D character visualization. Serverless backend with tRPC, full TypeScript, and offline-compatible data layer.',
    url: 'https://comic-ranker.vercel.app',
    github: 'https://github.com/akumar23/comic-ranker',
    status: 'LIVE',
    technologies: ['Next.js', 'TypeScript', 'tRPC', 'Three.js'],
    accent: '#F59E0B'
  },
  {
    name: 'Fireblog',
    description: 'Full-stack blogging platform with Google OAuth, real-time Firestore sync, and rich text editing.',
    url: 'https://fireblog-gray.vercel.app',
    github: null,
    status: 'LIVE',
    technologies: ['Next.js', 'Tailwind', 'Firestore'],
    accent: '#EF4444'
  },
  {
    name: 'Fleet',
    description: 'Multi-cluster Kubernetes management CLI built in Go. Concurrent execution engine using worker pools runs operations across clusters in parallel. Supports batch apply/get/delete with configurable parallelism, dry-run safety, and multi-format output (table, JSON, YAML). Tested across 8 clusters.',
    url: null,
    github: 'https://github.com/akumar23/fleet',
    status: 'GITHUB',
    technologies: ['Go', 'Kubernetes', 'CLI'],
    accent: '#06B6D4'
  },
  {
    name: 'Collision Detection NN',
    description: 'Autonomous navigation system using a neural network trained for real-time obstacle avoidance. Achieves 99% success rate in a simulated environment.',
    url: null,
    github: 'https://github.com/akumar23/Collision-Detection-Neural-Net',
    status: 'GITHUB',
    technologies: ['Python', 'scikit-learn', 'Pygame'],
    accent: '#22C55E'
  },
  {
    name: 'SlitherRL',
    description: 'Reinforcement learning agent trained to play Snake. Learns entirely from game state observations using deep Q-learning — no hand-crafted heuristics.',
    url: null,
    github: 'https://github.com/akumar23/SlitherRL',
    status: 'GITHUB',
    technologies: ['Python', 'PyTorch', 'DQN'],
    accent: '#A855F7'
  }
]

const StatusBadge = ({ status }) => {
  const isLive = status === 'LIVE'

  return (
    <HStack
      spacing={1.5}
      px={2}
      py={0.5}
      borderRadius="full"
      border="1px solid"
      borderColor={isLive
        ? 'rgba(34, 197, 94, 0.3)'
        : 'rgba(113, 113, 122, 0.3)'}
      bg={isLive
        ? 'rgba(34, 197, 94, 0.08)'
        : 'rgba(113, 113, 122, 0.08)'}
    >
      <Box
        w={1.5}
        h={1.5}
        borderRadius="full"
        bg={isLive ? 'green.400' : 'neutral.500'}
      />
      <Text
        fontSize="xs"
        fontFamily="mono"
        color={isLive ? 'green.400' : 'neutral.500'}
        fontWeight="500"
      >
        {status}
      </Text>
    </HStack>
  )
}

const BrowserWindowCard = ({ name, description, url, github, status, technologies, accent }) => {
  const chromeBg = useColorModeValue('neutral.100', 'rgba(255,255,255,0.04)')
  const chromeBorder = useColorModeValue('neutral.200', 'rgba(255,255,255,0.06)')
  const urlBarBg = useColorModeValue('white', 'rgba(0,0,0,0.3)')
  const cardBg = useColorModeValue('white', 'rgba(255,255,255,0.02)')
  const cardBorder = useColorModeValue('neutral.200', 'rgba(255,255,255,0.07)')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const descColor = useColorModeValue('neutral.600', 'neutral.400')
  const tagBg = useColorModeValue('neutral.100', 'rgba(255,255,255,0.05)')
  const tagColor = useColorModeValue('neutral.600', 'neutral.400')

  const primaryLink = url || github
  const displayUrl = url
    ? url.replace('https://', '')
    : github
      ? github.replace('https://github.com/', 'github.com/')
      : ''

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Box
        border="1px solid"
        borderColor={cardBorder}
        borderRadius="lg"
        overflow="hidden"
        bg={cardBg}
        h="full"
        _hover={{
          transform: 'translateY(-3px)',
          boxShadow: useColorModeValue(
            '0 12px 40px rgba(0,0,0,0.1)',
            '0 12px 40px rgba(0,0,0,0.5)'
          ),
          borderColor: useColorModeValue('neutral.300', 'rgba(255,255,255,0.12)')
        }}
        transition="all 0.25s ease"
      >
        {/* Browser chrome */}
        <Box
          bg={chromeBg}
          px={3}
          py={2.5}
          borderBottom="1px solid"
          borderColor={chromeBorder}
          display="flex"
          alignItems="center"
          gap={3}
        >
          {/* Window dots */}
          <HStack spacing={1.5} flexShrink={0}>
            <Box w="10px" h="10px" borderRadius="full" bg="#FF5F57" />
            <Box w="10px" h="10px" borderRadius="full" bg="#FFBD2E" />
            <Box w="10px" h="10px" borderRadius="full" bg="#28C840" />
          </HStack>

          {/* URL bar */}
          <Box
            flex={1}
            bg={urlBarBg}
            border="1px solid"
            borderColor={chromeBorder}
            borderRadius="md"
            px={2.5}
            py={1}
            display="flex"
            alignItems="center"
            gap={1.5}
            minW={0}
          >
            {status === 'GITHUB' && (
              <IoLogoGithub size={11} style={{ flexShrink: 0, opacity: 0.5 }} />
            )}
            <Text
              fontFamily="mono"
              fontSize="xs"
              color={useColorModeValue('neutral.400', 'neutral.600')}
              noOfLines={1}
              overflow="hidden"
            >
              {displayUrl}
            </Text>
          </Box>
        </Box>

        {/* Preview area */}
        <Box
          h="140px"
          position="relative"
          overflow="hidden"
          bg={useColorModeValue('neutral.50', 'rgba(0,0,0,0.2)')}
          style={{
            background: `linear-gradient(135deg, ${accent}18 0%, ${accent}05 60%, transparent 100%)`
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Subtle grid pattern */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.04}
            backgroundImage="linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)"
            backgroundSize="24px 24px"
          />
          <Text
            fontFamily="mono"
            fontSize="5xl"
            fontWeight="700"
            color={accent}
            opacity={0.12}
            userSelect="none"
            letterSpacing="tighter"
          >
            {name.slice(0, 2).toUpperCase()}
          </Text>
        </Box>

        {/* Card content */}
        <Box p={4}>
          <HStack justify="space-between" mb={2} align="flex-start">
            <Text
              fontFamily="mono"
              fontSize="sm"
              fontWeight="600"
              color={textColor}
              lineHeight="short"
            >
              {name}
            </Text>
            <StatusBadge status={status} />
          </HStack>

          <Text
            fontSize="sm"
            color={descColor}
            lineHeight="tall"
            mb={3}
            noOfLines={2}
          >
            {description}
          </Text>

          {/* Tech tags */}
          <HStack spacing={1.5} flexWrap="wrap" mb={4}>
            {technologies.map(tech => (
              <Box
                key={tech}
                px={2}
                py={0.5}
                bg={tagBg}
                borderRadius="sm"
                fontSize="xs"
                fontFamily="mono"
                color={tagColor}
              >
                {tech}
              </Box>
            ))}
          </HStack>

          {/* Action links */}
          <HStack spacing={4}>
            {url && (
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap={1}
                fontFamily="mono"
                fontSize="xs"
                color="primary.500"
                fontWeight="500"
                _hover={{ color: 'primary.400', textDecoration: 'none' }}
                transition="color 0.2s"
              >
                Launch
                <ExternalLinkIcon boxSize={3} />
              </Link>
            )}
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap={1}
                fontFamily="mono"
                fontSize="xs"
                color={useColorModeValue('neutral.500', 'neutral.500')}
                fontWeight="500"
                _hover={{ color: useColorModeValue('neutral.700', 'neutral.300'), textDecoration: 'none' }}
                transition="color 0.2s"
              >
                <IoLogoGithub size={12} />
                Source
              </Link>
            )}
            {!url && !github && null}
          </HStack>
        </Box>
      </Box>
    </MotionBox>
  )
}

const Lab = () => {
  const heroBg = useColorModeValue('primary.500', 'neutral.950')
  const heroTextColor = useColorModeValue('neutral.900', 'neutral.50')
  const heroMutedColor = useColorModeValue('neutral.800', 'neutral.500')
  const sectionBg = useColorModeValue('neutral.50', 'neutral.950')

  const live = apps.filter(a => a.status === 'LIVE')
  const repos = apps.filter(a => a.status === 'GITHUB')

  return (
    <Box>
      {/* Hero */}
      <Box
        py={{ base: 20, md: 28 }}
        bg={heroBg}
        borderBottom="1px solid"
        borderColor={useColorModeValue('neutral.200', 'rgba(255,255,255,0.06)')}
      >
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={4} align="flex-start">
            <HStack
              spacing={2}
              px={3}
              py={1.5}
              border="1px solid"
              borderColor={useColorModeValue('neutral.300', 'neutral.700')}
              display="inline-flex"
            >
              <Box as="span" fontFamily="mono" fontSize="sm" color="primary.500" userSelect="none">$</Box>
              <Box as="span" fontFamily="mono" fontSize="sm" color={heroMutedColor}>ls ~/lab</Box>
            </HStack>
            <Heading
              as="h1"
              fontSize={{ base: 'display-md', md: 'display-xl' }}
              fontFamily="mono"
              fontWeight="400"
              color={heroTextColor}
              letterSpacing="tight"
              lineHeight="shorter"
              textTransform="uppercase"
            >
              Lab
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color={heroMutedColor}
              maxW="520px"
              lineHeight="tall"
              fontFamily="body"
            >
              Deployed apps and open-source experiments. Some are polished, some are proofs of concept.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Live apps */}
      <Box py={{ base: 12, md: 16 }} bg={sectionBg}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <HStack spacing={3} mb={8} align="center">
            <Box w={2} h={2} borderRadius="full" bg="green.400" />
            <Text
              fontFamily="mono"
              fontSize="xs"
              color={useColorModeValue('neutral.500', 'neutral.500')}
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Live deployments
            </Text>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {live.map((app, i) => (
              <Section key={app.name} delay={i * 0.08}>
                <BrowserWindowCard {...app} />
              </Section>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* GitHub repos */}
      <Box
        py={{ base: 12, md: 16 }}
        bg={useColorModeValue('white', 'rgba(255,255,255,0.01)')}
        borderTop="1px solid"
        borderColor={useColorModeValue('neutral.100', 'rgba(255,255,255,0.05)')}
      >
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <HStack spacing={3} mb={8} align="center">
            <IoLogoGithub size={14} style={{ opacity: 0.5 }} />
            <Text
              fontFamily="mono"
              fontSize="xs"
              color={useColorModeValue('neutral.500', 'neutral.500')}
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Open source
            </Text>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {repos.map((app, i) => (
              <Section key={app.name} delay={i * 0.08}>
                <BrowserWindowCard {...app} />
              </Section>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}

export default Lab
export { getServerSideProps } from '../components/chakra'
