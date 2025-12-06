import { Container, Heading, Text, VStack, HStack, Box, Badge } from '@chakra-ui/react'
import { BentoGrid, BentoCard } from './BentoGrid'
import MagneticButton from './magnetic-button'
import SpotlightCard from './spotlight-card'
import Section from './section'
import { ExternalLinkIcon, DownloadIcon, EmailIcon } from '@chakra-ui/icons'

/**
 * Demo component showcasing advanced UI features
 * This can be imported into any page to demonstrate the new components
 *
 * Usage in a page:
 * import AdvancedUIDemo from '../components/demo-advanced-ui'
 *
 * export default function DemoPage() {
 *   return <AdvancedUIDemo />
 * }
 */
export default function AdvancedUIDemo() {
  return (
    <Container maxW="container.lg">
      {/* Magnetic Buttons Demo */}
      <Section delay={0.1}>
        <Heading as="h2" variant="section-title">
          Magnetic Buttons
        </Heading>
        <Text mb={6}>
          Hover near these buttons to see them magnetically pull toward your cursor
        </Text>

        <VStack spacing={4} align="start">
          <HStack spacing={4} wrap="wrap">
            <MagneticButton colorScheme="teal" size="lg">
              Default Magnetic Button
            </MagneticButton>

            <MagneticButton
              colorScheme="purple"
              variant="outline"
              strength={0.5}
              leftIcon={<ExternalLinkIcon />}
            >
              Strong Pull (0.5)
            </MagneticButton>

            <MagneticButton
              colorScheme="pink"
              strength={0.2}
              springConfig={{ stiffness: 200, damping: 10 }}
              rightIcon={<DownloadIcon />}
            >
              Bouncy Spring
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              colorScheme="blue"
              size="md"
              leftIcon={<EmailIcon />}
            >
              Ghost Variant
            </MagneticButton>
          </HStack>

          <Badge colorScheme="green">Accessibility: Respects prefers-reduced-motion</Badge>
        </VStack>
      </Section>

      {/* Spotlight Card Demo */}
      <Section delay={0.2}>
        <Heading as="h2" variant="section-title" mt={8}>
          Standalone Spotlight Cards
        </Heading>
        <Text mb={6}>
          Move your cursor over these cards to reveal the spotlight effect
        </Text>

        <VStack spacing={4}>
          <SpotlightCard
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            bg="whiteAlpha.200"
            backdropFilter="blur(10px)"
            w="100%"
          >
            <Heading size="md">Basic Spotlight Card</Heading>
            <Text mt={2}>
              A simple spotlight effect that follows your cursor
            </Text>
          </SpotlightCard>

          <SpotlightCard
            enableTilt
            tiltStrength={8}
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            bg="whiteAlpha.200"
            backdropFilter="blur(10px)"
            w="100%"
          >
            <Heading size="md">Spotlight + 3D Tilt</Heading>
            <Text mt={2}>
              Move your cursor around to see the 3D tilt effect combined with the spotlight
            </Text>
            <Badge mt={2} colorScheme="purple">3D Tilt Enabled</Badge>
          </SpotlightCard>

          <SpotlightCard
            spotlightSize={500}
            spotlightOpacity={0.25}
            spotlightColor="#ff63c3"
            enableTilt
            tiltStrength={5}
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            bg="whiteAlpha.200"
            backdropFilter="blur(10px)"
            w="100%"
          >
            <Heading size="md">Custom Spotlight</Heading>
            <Text mt={2}>
              Larger spotlight with custom pink color and higher opacity
            </Text>
            <Badge mt={2} colorScheme="pink">Custom Styling</Badge>
          </SpotlightCard>
        </VStack>
      </Section>

      {/* Enhanced BentoGrid Demo */}
      <Section delay={0.3}>
        <Heading as="h2" variant="section-title" mt={8}>
          Enhanced BentoGrid with Spotlight
        </Heading>
        <Text mb={6}>
          The BentoCard now includes spotlight effects by default. Hover over cards to see it in action!
        </Text>

        <BentoGrid columns={{ base: 1, md: 4 }} gap={4}>
          {/* Featured card with tilt */}
          <BentoCard
            colSpan={2}
            rowSpan={2}
            enableTilt
            tiltStrength={5}
            gradient
            delay={0.1}
          >
            <VStack align="start" spacing={3}>
              <Badge colorScheme="purple">Featured</Badge>
              <Heading size="lg">Large Card with 3D Tilt</Heading>
              <Text>
                This card spans 2x2 and includes both spotlight and 3D tilt effects.
                Move your mouse around to see the magic!
              </Text>
              <MagneticButton size="sm" colorScheme="purple" mt={2}>
                Learn More
              </MagneticButton>
            </VStack>
          </BentoCard>

          {/* Regular cards with spotlight only */}
          <BentoCard colSpan={2} delay={0.2}>
            <Heading size="md">Spotlight Only</Heading>
            <Text mt={2}>
              This card has the default spotlight effect without 3D tilt
            </Text>
          </BentoCard>

          <BentoCard
            colSpan={1}
            enableTilt
            tiltStrength={4}
            delay={0.3}
          >
            <VStack align="start" spacing={2}>
              <Heading size="sm">Subtle Tilt</Heading>
              <Text fontSize="sm">Strength: 4</Text>
            </VStack>
          </BentoCard>

          <BentoCard
            colSpan={1}
            spotlightOpacity={0.25}
            delay={0.4}
          >
            <VStack align="start" spacing={2}>
              <Heading size="sm">Intense Spotlight</Heading>
              <Text fontSize="sm">Opacity: 0.25</Text>
            </VStack>
          </BentoCard>

          {/* Card with no spotlight */}
          <BentoCard
            colSpan={2}
            enableSpotlight={false}
            delay={0.5}
          >
            <Heading size="md">No Spotlight</Heading>
            <Text mt={2}>
              This card has the spotlight effect disabled for comparison
            </Text>
            <Badge mt={2}>Spotlight Disabled</Badge>
          </BentoCard>
        </BentoGrid>
      </Section>

      {/* Combined Demo */}
      <Section delay={0.4}>
        <Heading as="h2" variant="section-title" mt={8}>
          Combined Effects
        </Heading>
        <Text mb={6}>
          Magnetic buttons work great inside spotlight cards!
        </Text>

        <BentoGrid columns={{ base: 1, md: 2 }} gap={4}>
          <BentoCard
            enableTilt
            tiltStrength={4}
            gradient
          >
            <VStack align="start" spacing={4}>
              <Heading size="md">Project Card</Heading>
              <Text>
                A card combining spotlight, tilt, and magnetic buttons for maximum interactivity
              </Text>
              <HStack spacing={3}>
                <MagneticButton
                  size="sm"
                  colorScheme="teal"
                  rightIcon={<ExternalLinkIcon />}
                  strength={0.35}
                >
                  View Demo
                </MagneticButton>
                <MagneticButton
                  size="sm"
                  variant="outline"
                  colorScheme="teal"
                  strength={0.3}
                >
                  Code
                </MagneticButton>
              </HStack>
            </VStack>
          </BentoCard>

          <BentoCard>
            <VStack align="start" spacing={4}>
              <Heading size="md">Contact Card</Heading>
              <Text>
                Spotlight effect with magnetic action buttons
              </Text>
              <VStack spacing={2} align="stretch" w="100%">
                <MagneticButton
                  size="sm"
                  colorScheme="purple"
                  leftIcon={<EmailIcon />}
                  w="100%"
                >
                  Send Email
                </MagneticButton>
                <MagneticButton
                  size="sm"
                  variant="outline"
                  colorScheme="purple"
                  leftIcon={<DownloadIcon />}
                  w="100%"
                >
                  Download Resume
                </MagneticButton>
              </VStack>
            </VStack>
          </BentoCard>
        </BentoGrid>
      </Section>

      {/* Performance & Accessibility Info */}
      <Section delay={0.5}>
        <Box
          mt={8}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          bg="whiteAlpha.100"
        >
          <Heading size="sm" mb={3}>Performance & Accessibility</Heading>
          <VStack align="start" spacing={2} fontSize="sm">
            <Text>✓ GPU-accelerated animations (transform, opacity)</Text>
            <Text>✓ Respects prefers-reduced-motion system setting</Text>
            <Text>✓ Keyboard navigation fully supported</Text>
            <Text>✓ No layout thrashing or reflows</Text>
            <Text>✓ Optimized React hooks (useMotionValue, useSpring)</Text>
            <Text>✓ Theme-aware with Chakra UI color modes</Text>
          </VStack>
        </Box>
      </Section>
    </Container>
  )
}
