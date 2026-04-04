import NextLink from 'next/link'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import { IoLogoGithub, IoBriefcase, IoRocket } from 'react-icons/io5'
import { motion } from 'framer-motion'

import Section, { FullSection } from '../components/section'
import HeroSection from '../components/hero-section'
import SketchyButton from '../components/sketchy-button'
import SkillsGrid from '../components/SkillsGrid'

const MotionBox = motion(Box)

const ExperienceCard = ({ phase, title, company, period, description, isLatest }) => {
  const cardBg = useColorModeValue('white', 'rgba(255,255,255,0.02)')
  const cardHoverBg = useColorModeValue('neutral.50', 'rgba(255,255,255,0.04)')
  const borderColor = useColorModeValue('neutral.200', 'rgba(255,255,255,0.07)')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const descriptionColor = useColorModeValue('neutral.600', 'neutral.400')
  const mutedColor = useColorModeValue('neutral.500', 'neutral.500')

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      h="full"
    >
      <Box
        p={6}
        bg={cardBg}
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
        borderLeft="3px solid"
        borderLeftColor={isLatest ? 'primary.500' : borderColor}
        position="relative"
        h="full"
        _hover={{
          bg: cardHoverBg,
          transform: 'translateY(-2px)',
          boxShadow: useColorModeValue(
            '0 8px 30px rgba(0,0,0,0.06)',
            '0 8px 30px rgba(0,0,0,0.3)'
          )
        }}
        transition="all 0.2s ease"
      >
        <VStack align="start" spacing={4} h="full">
          {/* Phase label */}
          <Text
            fontFamily="mono"
            fontSize="xs"
            color="primary.500"
            opacity={0.7}
            letterSpacing="wide"
          >
            // {phase}
          </Text>

          <Box flex={1}>
            <HStack justify="space-between" align="flex-start" mb={1}>
              <Heading
                as="h4"
                size="md"
                fontFamily="serif"
                fontWeight="400"
                color={textColor}
                letterSpacing="tight"
                textTransform="none"
                lineHeight="short"
              >
                {title}
              </Heading>
              {isLatest && (
                <HStack
                  spacing={1.5}
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="rgba(34, 197, 94, 0.3)"
                  bg="rgba(34, 197, 94, 0.08)"
                  flexShrink={0}
                  ml={2}
                >
                  <Box w={1.5} h={1.5} borderRadius="full" bg="green.400" />
                  <Text fontSize="xs" fontFamily="mono" color="green.400">current</Text>
                </HStack>
              )}
            </HStack>
            <Text color="primary.500" fontFamily="mono" fontWeight="400" fontSize="xs" mb={0.5}>
              {company}
            </Text>
            <Text color={mutedColor} fontSize="xs" fontFamily="mono">
              {period}
            </Text>
          </Box>

          <Text color={descriptionColor} fontSize="sm" lineHeight="tall">
            {description}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  )
}

const SectionHeader = ({ icon, label, title, description }) => {
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const descriptionColor = useColorModeValue('neutral.600', 'neutral.400')
  const mutedColor = useColorModeValue('neutral.500', 'neutral.500')

  return (
    <VStack align="start" spacing={4} mb={10}>
      <HStack spacing={2}>
        <Icon as={icon} boxSize={4} color="primary.500" />
        <Text
          fontSize="xs"
          fontFamily="mono"
          fontWeight="400"
          color={mutedColor}
          textTransform="uppercase"
          letterSpacing="widest"
        >
          {label}
        </Text>
      </HStack>
      <Heading
        as="h2"
        fontSize={{ base: 'display-sm', md: 'display-md' }}
        fontFamily="serif"
        fontWeight="400"
        color={textColor}
        letterSpacing="tight"
        textTransform="none"
        lineHeight="shorter"
      >
        {title}
      </Heading>
      {description && (
        <Text color={descriptionColor} fontSize="lg" maxW="600px" lineHeight="tall">
          {description}
        </Text>
      )}
    </VStack>
  )
}

const Home = () => {
  const sectionBg = useColorModeValue('neutral.50', 'neutral.950')
  const altSectionBg = useColorModeValue('white', 'rgba(255,255,255,0.01)')
  const ctaBg = useColorModeValue('neutral.900', 'primary.500')
  const ctaTextColor = useColorModeValue('neutral.50', 'neutral.900')

  // Ordered oldest → newest to show the journey arc
  const experiences = [
    {
      phase: 'before the clusters',
      title: 'Python Developer',
      company: 'Expert Witness Profiler LLC',
      period: 'Jun 2022 – Sep 2022',
      description: 'Built automated data collection pipelines using Beautiful Soup and Selenium for a legal tech client. Developed Pandas-based processing workflows for court records analysis. First production software work — three months, then straight into NALEJ.',
      isLatest: false
    },
    {
      phase: 'full-stack → infrastructure',
      title: 'Software Engineer',
      company: 'NALEJ.AI',
      period: 'Sep 2022 – 2024',
      description: 'Joined to ship full-stack tooling — built a GitLab analytics portal (Next.js, tRPC, Keycloak, Redis) with full offline compatibility and a deep learning issue estimation system using semantic embeddings. Quickly expanded into infrastructure: architected air-gapped LLM deployments using LiteLLM, Ollama, and Kubernetes, cutting setup time from hours to under one minute. Built Helm automation frameworks and contributed to a custom Kubernetes operator written in Go.',
      isLatest: false
    },
    {
      phase: 'platform engineering',
      title: 'Platform Engineer & Tech Lead',
      company: 'NALEJ.AI',
      period: '2024 – Present',
      description: 'Took ownership of a critical platform workload previously staffed by five engineers — leading design, incident response, and operational tooling. Owns cluster-wide Karpenter and KEDA configurations for automated node provisioning and event-driven autoscaling. Delivered end-to-end DevOps for a federal defense client across EKS and K3s: provisioning, image lifecycle, and air-gapped package distribution. Platform work contributed to $15.6M/year in operational savings. Ensured NSA-level compliance across all deployments. Currently building an agentic AI system for natural-language Kubernetes automation.',
      isLatest: true
    }
  ]

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection />

      {/* Skills Section */}
      <FullSection bg={altSectionBg} position="relative" overflow="hidden">
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <SectionHeader
            icon={IoRocket}
            label="Stack"
            title="Technologies & Skills"
            description="Go, Python, TypeScript, Kubernetes, LiteLLM, Helm, RAG, PyTorch, Next.js, FastAPI, Redis, PGVector, Terraform, Grafana."
          />
          <Section>
            <SkillsGrid />
          </Section>
        </Container>
      </FullSection>

      {/* Experience Section */}
      <FullSection bg={sectionBg}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <SectionHeader
            icon={IoBriefcase}
            label="Experience"
            title="Career Arc"
            description="From Python scripting to platform engineering in two years at the same company."
          />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {experiences.map((exp, index) => (
              <Section key={index} delay={index * 0.1}>
                <ExperienceCard {...exp} />
              </Section>
            ))}
          </SimpleGrid>
        </Container>
      </FullSection>

      {/* CTA Section */}
      <FullSection bg={ctaBg} position="relative" overflow="hidden">
        <Container maxW="container.md" px={{ base: 4, md: 8 }} textAlign="center">
          <VStack spacing={6}>
            <Heading
              as="h2"
              fontSize={{ base: 'display-sm', md: 'display-lg' }}
              fontFamily="serif"
              fontWeight="400"
              color={ctaTextColor}
              letterSpacing="tight"
              textTransform="none"
              lineHeight="shorter"
            >
              Let&apos;s work together
            </Heading>
            <Text
              color={ctaTextColor}
              fontSize="lg"
              maxW="500px"
              opacity={0.85}
              lineHeight="tall"
              fontFamily="body"
            >
              Building something in a constrained environment, or just want to talk shop?
            </Text>
            <HStack spacing={4} pt={4} flexWrap="wrap" justify="center">
              <SketchyButton
                as={NextLink}
                href="/contact"
                scroll={false}
                variant="outline"
                size="lg"
                sx={{
                  borderColor: ctaTextColor,
                  color: ctaTextColor,
                  _hover: { bg: ctaTextColor, color: ctaBg }
                }}
              >
                Get in Touch
              </SketchyButton>
              <SketchyButton
                as="a"
                href="https://github.com/akumar23"
                target="_blank"
                variant="outline"
                size="lg"
                sx={{
                  borderColor: ctaTextColor,
                  color: ctaTextColor,
                  _hover: { bg: ctaTextColor, color: ctaBg }
                }}
              >
                <HStack>
                  <IoLogoGithub />
                  <Text>GitHub</Text>
                </HStack>
              </SketchyButton>
            </HStack>
          </VStack>
        </Container>
      </FullSection>
    </Box>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
