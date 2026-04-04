import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Container, Heading, Text, VStack, HStack, useColorModeValue, IconButton, Tooltip } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import NextLink from 'next/link'
import PullOutCard from './pull-out-card'
import SketchyButton from './sketchy-button'
import { IoPersonOutline } from 'react-icons/io5'
import { gsap } from '../lib/gsap'

// Dynamically import Hero3D with SSR disabled (keep but simplified)
const Hero3D = dynamic(() => import('./hero-3d'), {
  ssr: false,
  loading: () => null
})

const MotionBox = motion(Box)

// Clickable avatar with clean technical style
const ClickableAvatar = ({ onClick }) => {
  const prefersReducedMotion = useReducedMotion()
  const borderColor = useColorModeValue('neutral.900', 'primary.400')
  const bgColor = useColorModeValue('neutral.50', 'neutral.900')

  return (
    <MotionBox
      className="hero-avatar"
      position="relative"
      cursor="pointer"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hand-drawn style border */}
      <Box
        position="absolute"
        inset="-6px"
        border="4px solid"
        borderColor={borderColor}
        borderRadius="none"
        transform="rotate(2deg)"
        bg={bgColor}
      />

      {/* Avatar image */}
      <Box
        position="relative"
        w={{ base: '120px', md: '150px', lg: '180px' }}
        h={{ base: '120px', md: '150px', lg: '180px' }}
        overflow="hidden"
        border="4px solid"
        borderColor={borderColor}
        bg={bgColor}
        transition="all 0.3s ease"
      >
        <Box
          as="img"
          src="/static/profile.png"
          alt="Aryan Kumar - Click to learn more"
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.1)' }}
        />
      </Box>

    </MotionBox>
  )
}

const ScrollIndicator = () => {
  const textColor = useColorModeValue('neutral.500', 'neutral.600')

  return (
    <MotionBox
      position="absolute"
      bottom={{ base: 8, md: 12 }}
      left="50%"
      transform="translateX(-50%)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <Box
        as="svg"
        width="20px"
        height="32px"
        viewBox="0 0 20 32"
        fill="none"
      >
        <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.5" color={textColor} opacity="0.4" />
        <circle cx="10" cy="9" r="3" fill="currentColor" color={textColor} opacity="0.4">
          <animate attributeName="cy" values="9;18;9" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      </Box>
    </MotionBox>
  )
}

const HeroSection = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [isCardOpen, setIsCardOpen] = useState(false)

  // Playful background colors
  const bgColor = useColorModeValue('primary.500', 'neutral.950')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const subtitleColor = useColorModeValue('neutral.800', 'neutral.300')

  // GSAP scroll-triggered parallax and fade effects
  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return

    const ctx = gsap.context(() => {
      // Parallax scroll effect on content
      gsap.to('.hero-content', {
        yPercent: 30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Scroll indicator fade out
      gsap.to('.scroll-indicator', {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true
        }
      })

      // Decorations parallax
      gsap.to('.hero-decoration', {
        yPercent: 50,
        rotation: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Avatar parallax
      gsap.to('.hero-avatar-container', {
        yPercent: 40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // Mouse parallax effect on hero content
  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPos = (clientX / innerWidth - 0.5) * 15
      const yPos = (clientY / innerHeight - 0.5) * 15

      gsap.to('.hero-content', {
        x: xPos,
        y: yPos,
        duration: 0.5,
        ease: 'power2.out'
      })

      // Decorations move opposite
      gsap.to('.hero-decoration', {
        x: -xPos * 1.5,
        y: -yPos * 1.5,
        duration: 0.8,
        ease: 'power2.out'
      })

      // Subtle parallax on avatar
      gsap.to('.hero-avatar', {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 0.6,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  return (
    <Box
      ref={heroRef}
      as="section"
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg={bgColor}
      mt={{ base: -20, md: -24 }}
      pt={{ base: 20, md: 24 }}
    >
      {/* Clickable Avatar - Center right on desktop */}
      <Box
        className="hero-avatar-container"
        position={{ base: 'relative', md: 'absolute' }}
        right={{ base: 'auto', md: '8%', lg: '12%' }}
        top={{ base: 'auto', md: '50%' }}
        transform={{ base: 'none', md: 'translateY(-50%)' }}
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="center"
        zIndex={3}
      >
        <ClickableAvatar onClick={() => setIsCardOpen(true)} />
      </Box>

      {/* 3D Hero Element - subtle background effect (simplified) */}
      <Box
        className="hero-3d-container"
        position="absolute"
        right={{ base: '-20%', md: '2%', lg: '8%' }}
        top="50%"
        transform="translateY(-50%)"
        width={{ base: '60%', md: '45%', lg: '40%' }}
        height={{ base: '40%', md: '70%' }}
        opacity={{ base: 0.1, md: 0.2 }}
        pointerEvents="none"
        display={{ base: 'none', md: 'block' }}
        zIndex={1}
        filter="saturate(0.5)"
      >
        <Hero3D />
      </Box>

      <Container maxW="container.xl" px={{ base: 4, md: 8 }} position="relative" zIndex={2}>
        <VStack
          ref={contentRef}
          className="hero-content"
          spacing={{ base: 6, md: 8 }}
          align={{ base: 'center', md: 'flex-start' }}
          textAlign={{ base: 'center', md: 'left' }}
          willChange="transform, opacity"
          maxW={{ base: '100%', md: '60%' }}
        >
          {/* Terminal-style role badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HStack
              display="inline-flex"
              spacing={2}
              px={3}
              py={1.5}
              border="1px solid"
              borderColor={useColorModeValue('neutral.300', 'neutral.700')}
              fontFamily="mono"
              fontSize="sm"
            >
              <Box as="span" color="primary.500" userSelect="none">$</Box>
              <Box as="span" color={useColorModeValue('neutral.600', 'neutral.400')}>
                engineer --ai --infra --full-stack
              </Box>
            </HStack>
          </MotionBox>

          {/* Main heading */}
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: '5xl', md: '7xl', lg: 'hero' }}
              fontFamily="display"
              fontWeight="400"
              lineHeight="shorter"
              color={textColor}
              textTransform="uppercase"
              letterSpacing="tight"
            >
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Aryan
              </MotionBox>
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                display="inline-block"
              >
                Kumar
              </MotionBox>
            </Heading>
            {/* Accent underline */}
            <MotionBox
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ transformOrigin: 'left' }}
              h="2px"
              w="120px"
              bg="primary.500"
              mt={2}
            />
          </Box>

          {/* Subtitle */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            maxW="600px"
          >
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color={subtitleColor}
              lineHeight="tall"
              fontFamily="body"
            >
              3+ years shipping production AI infrastructure in NSA-compliant,
              air-gapped environments. Started with full-stack apps. Now I own
              platform workloads that used to take five engineers.
            </Text>
          </MotionBox>

          {/* CTA Buttons - Sketchy style */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', md: 'flex-start' }}>
              <SketchyButton
                as={NextLink}
                href="/projects"
                scroll={false}
                variant="solid"
                size="lg"
                withArrow
                arrowLabel="go!"
              >
                View Projects
              </SketchyButton>
              <SketchyButton
                as={NextLink}
                href="/contact"
                scroll={false}
                variant="dashed"
                size="lg"
              >
                Get in Touch
              </SketchyButton>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>

      <Box className="scroll-indicator">
        <ScrollIndicator />
      </Box>

      {/* About Me floating trigger button */}
      <MotionBox
        position="fixed"
        right={{ base: 4, md: 6 }}
        bottom={{ base: 20, md: 24 }}
        zIndex={100}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <Tooltip
          label="About me"
          placement="left"
          hasArrow
          bg={useColorModeValue('neutral.900', 'neutral.800')}
          color={useColorModeValue('neutral.50', 'neutral.100')}
          fontFamily="mono"
          fontSize="xs"
        >
          <IconButton
            icon={<IoPersonOutline size={20} />}
            onClick={() => setIsCardOpen(true)}
            aria-label="Open about panel"
            size="md"
            bg={useColorModeValue('white', 'neutral.900')}
            color={useColorModeValue('neutral.700', 'neutral.300')}
            border="1px solid"
            borderColor={useColorModeValue('neutral.200', 'neutral.700')}
            borderRadius="full"
            boxShadow="md"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
              borderColor: 'primary.500',
              color: 'primary.500'
            }}
            transition="all 0.2s ease"
          />
        </Tooltip>
      </MotionBox>

      {/* Pull-out info card */}
      <PullOutCard isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
    </Box>
  )
}

export default HeroSection
