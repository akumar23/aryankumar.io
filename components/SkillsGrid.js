import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { BentoGrid, BentoCard } from './BentoGrid'
import {
  SiTypescript,
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiKubernetes,
  SiDocker,
  SiTerraform,
  SiMysql,
  SiAmazonaws,
  SiSpringboot,
  SiFlask,
  SiTailwindcss,
  SiGo
} from 'react-icons/si'
import { FaBrain, FaRobot, FaServer, FaJava } from 'react-icons/fa'

const SkillTag = ({ children, colorScheme = 'teal' }) => {
  return (
    <Tag
      size="sm"
      borderRadius="full"
      variant="subtle"
      colorScheme={colorScheme}
    >
      <TagLabel>{children}</TagLabel>
    </Tag>
  )
}

const SkillsGrid = () => {
  const accentColor = useColorModeValue('grassTeal', '#88ccca')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const headingColor = useColorModeValue('gray.800', 'white')

  return (
    <BentoGrid columns={{ base: 1, md: 4 }} gap={4}>
      {/* Featured Card - AI/ML & Full Stack */}
      <BentoCard colSpan={2} rowSpan={2} delay={0} gradient={true}>
        <VStack align="start" spacing={4} h="100%">
          <HStack spacing={2}>
            <Icon as={FaBrain} boxSize={6} color={accentColor} />
            <Heading size="md" color={headingColor}>
              AI/ML Engineer
            </Heading>
          </HStack>
          <Text color={textColor} fontSize="sm">
            Specialized in neural network development, LLM deployment, and AI infrastructure
          </Text>
          <Box>
            <Text fontSize="xs" fontWeight="bold" mb={2} color={textColor}>
              Core Expertise:
            </Text>
            <HStack wrap="wrap" spacing={2}>
              <SkillTag>Neural Networks</SkillTag>
              <SkillTag>LLM Development</SkillTag>
              <SkillTag>vLLM/Ollama</SkillTag>
              <SkillTag>Huggingface</SkillTag>
            </HStack>
          </Box>
          <Box mt="auto">
            <Icon as={FaServer} boxSize={6} color={accentColor} />
            <Heading size="md" color={headingColor} mt={2}>
              Full Stack Developer
            </Heading>
            <Text color={textColor} fontSize="sm" mt={2}>
              Building scalable web applications with modern frameworks
            </Text>
          </Box>
        </VStack>
      </BentoCard>

      {/* Languages */}
      <BentoCard colSpan={1} rowSpan={1} delay={0.1}>
        <VStack align="start" spacing={3}>
          <Heading size="sm" color={headingColor}>
            Languages
          </Heading>
          <VStack align="start" spacing={2} w="100%">
            <HStack>
              <Icon as={SiTypescript} color="#3178C6" />
              <Text fontSize="sm" color={textColor}>TypeScript</Text>
            </HStack>
            <HStack>
              <Icon as={SiPython} color="#3776AB" />
              <Text fontSize="sm" color={textColor}>Python</Text>
            </HStack>
            <HStack>
              <Icon as={FaJava} color="#007396" />
              <Text fontSize="sm" color={textColor}>Java</Text>
            </HStack>
            <HStack>
              <Icon as={SiGo} color="#00ADD8" />
              <Text fontSize="sm" color={textColor}>Go</Text>
            </HStack>
          </VStack>
        </VStack>
      </BentoCard>

      {/* Frontend */}
      <BentoCard colSpan={1} rowSpan={1} delay={0.15}>
        <VStack align="start" spacing={3}>
          <Heading size="sm" color={headingColor}>
            Frontend
          </Heading>
          <VStack align="start" spacing={2} w="100%">
            <HStack>
              <Icon as={SiReact} color="#61DAFB" />
              <Text fontSize="sm" color={textColor}>React</Text>
            </HStack>
            <HStack>
              <Icon as={SiNextdotjs} color={headingColor} />
              <Text fontSize="sm" color={textColor}>Next.js</Text>
            </HStack>
            <HStack>
              <Icon as={SiTailwindcss} color="#06B6D4" />
              <Text fontSize="sm" color={textColor}>Tailwind</Text>
            </HStack>
          </VStack>
        </VStack>
      </BentoCard>

      {/* DevOps & Infrastructure */}
      <BentoCard colSpan={2} rowSpan={1} delay={0.2}>
        <VStack align="start" spacing={3}>
          <Heading size="sm" color={headingColor}>
            DevOps & Infrastructure
          </Heading>
          <HStack wrap="wrap" spacing={3}>
            <HStack>
              <Icon as={SiKubernetes} color="#326CE5" />
              <Text fontSize="sm" color={textColor}>Kubernetes</Text>
            </HStack>
            <HStack>
              <Icon as={SiDocker} color="#2496ED" />
              <Text fontSize="sm" color={textColor}>Docker</Text>
            </HStack>
            <HStack>
              <Icon as={SiTerraform} color="#7B42BC" />
              <Text fontSize="sm" color={textColor}>Terraform</Text>
            </HStack>
            <HStack>
              <Icon as={SiAmazonaws} color="#FF9900" />
              <Text fontSize="sm" color={textColor}>AWS</Text>
            </HStack>
          </HStack>
        </VStack>
      </BentoCard>

      {/* Backend & Databases */}
      <BentoCard colSpan={2} rowSpan={1} delay={0.25}>
        <VStack align="start" spacing={3}>
          <Heading size="sm" color={headingColor}>
            Backend & Databases
          </Heading>
          <HStack wrap="wrap" spacing={3}>
            <HStack>
              <Icon as={SiSpringboot} color="#6DB33F" />
              <Text fontSize="sm" color={textColor}>Spring Boot</Text>
            </HStack>
            <HStack>
              <Icon as={SiFlask} color={headingColor} />
              <Text fontSize="sm" color={textColor}>Flask</Text>
            </HStack>
            <HStack>
              <Icon as={SiJavascript} color="#F7DF1E" />
              <Text fontSize="sm" color={textColor}>Node.js</Text>
            </HStack>
            <HStack>
              <Icon as={SiMysql} color="#4479A1" />
              <Text fontSize="sm" color={textColor}>MySQL</Text>
            </HStack>
          </HStack>
        </VStack>
      </BentoCard>

      {/* Additional Skills */}
      <BentoCard colSpan={2} rowSpan={1} delay={0.3}>
        <VStack align="start" spacing={3}>
          <Heading size="sm" color={headingColor}>
            Additional Skills
          </Heading>
          <HStack wrap="wrap" spacing={2}>
            <SkillTag colorScheme="purple">Keycloak</SkillTag>
            <SkillTag colorScheme="blue">REST APIs</SkillTag>
            <SkillTag colorScheme="green">GraphQL</SkillTag>
            <SkillTag colorScheme="orange">Git</SkillTag>
            <SkillTag colorScheme="pink">CI/CD</SkillTag>
          </HStack>
        </VStack>
      </BentoCard>

      {/* Learning Focus */}
      <BentoCard colSpan={2} rowSpan={1} delay={0.35} gradient={true}>
        <VStack align="start" spacing={2}>
          <HStack>
            <Icon as={FaRobot} color={accentColor} />
            <Heading size="sm" color={headingColor}>
              Currently Exploring
            </Heading>
          </HStack>
          <Text fontSize="sm" color={textColor}>
            Advanced AI model optimization, distributed systems, and cloud-native architectures
          </Text>
        </VStack>
      </BentoCard>
    </BentoGrid>
  )
}

export default SkillsGrid
