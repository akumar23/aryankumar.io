import { useRef, useEffect, useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  Grid,
  GridItem,
  Portal
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { gsap } from 'gsap'

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
`

const wiggle = keyframes`
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
`

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
`

const drawLine = keyframes`
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
`

// Hand-drawn style decorative squiggle
const Squiggle = ({ ...props }) => (
  <Box as="svg" viewBox="0 0 100 20" fill="none" {...props}>
    <path
      d="M0 10 Q 10 0, 20 10 T 40 10 T 60 10 T 80 10 T 100 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      style={{
        strokeDasharray: 100,
        animation: `${drawLine} 1s ease-out forwards`
      }}
    />
  </Box>
)

// Decorative star/sparkle
const Star = ({ size = 20, delay = 0, ...props }) => (
  <Text
    fontSize={`${size}px`}
    animation={`${sparkle} 2s ease-in-out infinite`}
    style={{ animationDelay: `${delay}s` }}
    {...props}
  >
    ✦
  </Text>
)

// Decorative arrow doodle
const DoodleArrow = ({ ...props }) => (
  <Box as="svg" viewBox="0 0 40 20" fill="none" width="40px" {...props}>
    <path
      d="M0 10 L 30 10 M 25 5 L 32 10 L 25 15"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Box>
)

// Animated cartoon character - more expressive and playful
const CartoonCharacter = () => {
  return (
    <Box
      position="relative"
      width="320px"
      height="160px"
      animation={`${float} 3s ease-in-out infinite`}
    >
      <svg
        viewBox="0 0 320 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Ground/surface line - sketchy */}
        <path
          d="M20 140 Q 60 138, 100 140 T 180 139 T 260 140 T 300 138"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="5,5"
        />

        {/* Character body - lying down, more cartoon style */}
        <g>
          {/* Body blob - more organic shape */}
          <path
            d="M100 115 Q 80 110, 85 95 Q 90 80, 120 75 Q 160 70, 180 80 Q 200 90, 195 105 Q 190 120, 160 125 Q 130 130, 100 115"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M100 115 Q 80 110, 85 95 Q 90 80, 120 75 Q 160 70, 180 80 Q 200 90, 195 105 Q 190 120, 160 125 Q 130 130, 100 115;
                      M100 117 Q 78 112, 84 96 Q 89 82, 118 77 Q 158 72, 182 82 Q 202 92, 197 107 Q 192 122, 162 127 Q 132 132, 100 117;
                      M100 115 Q 80 110, 85 95 Q 90 80, 120 75 Q 160 70, 180 80 Q 200 90, 195 105 Q 190 120, 160 125 Q 130 130, 100 115"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>

          {/* Big round head */}
          <circle
            cx="220"
            cy="85"
            r="38"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3"
            fill="none"
          />

          {/* Messy hair squiggles */}
          <path
            d="M190 55 Q 200 40, 215 45 Q 225 35, 240 42 Q 255 38, 260 52"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M195 50 Q 205 42, 220 48"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Big expressive eyes */}
          <g>
            {/* Left eye */}
            <ellipse
              cx="205"
              cy="80"
              rx="8"
              ry="10"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle cx="205" cy="82" r="4" fill="rgba(255,255,255,0.8)">
              <animate
                attributeName="cy"
                values="82;80;82"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Blink animation */}
            <ellipse cx="205" cy="80" rx="8" ry="10" fill="#1a1a1a">
              <animate
                attributeName="ry"
                values="0;0;0;10;0;0;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </ellipse>

            {/* Right eye */}
            <ellipse
              cx="235"
              cy="80"
              rx="8"
              ry="10"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle cx="235" cy="82" r="4" fill="rgba(255,255,255,0.8)">
              <animate
                attributeName="cy"
                values="82;80;82"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <ellipse cx="235" cy="80" rx="8" ry="10" fill="#1a1a1a">
              <animate
                attributeName="ry"
                values="0;0;0;10;0;0;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </ellipse>
          </g>

          {/* Eyebrows - expressive */}
          <path
            d="M195 68 Q 205 65, 212 68"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M195 68 Q 205 65, 212 68; M195 66 Q 205 63, 212 66; M195 68 Q 205 65, 212 68"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M228 68 Q 238 65, 245 68"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M228 68 Q 238 65, 245 68; M228 66 Q 238 63, 245 66; M228 68 Q 238 65, 245 68"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Big happy smile */}
          <path
            d="M200 100 Q 220 115, 240 100"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M200 100 Q 220 115, 240 100; M200 100 Q 220 118, 240 100; M200 100 Q 220 115, 240 100"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Rosy cheeks */}
          <circle cx="192" cy="95" r="5" fill="rgba(255,150,150,0.3)" />
          <circle cx="248" cy="95" r="5" fill="rgba(255,150,150,0.3)" />

          {/* Arm propping up head */}
          <path
            d="M180 95 Q 165 85, 170 70 Q 175 60, 185 58"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Hand */}
          <circle
            cx="185"
            cy="55"
            r="8"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
            fill="none"
          />

          {/* Legs sticking out */}
          <path
            d="M85 105 Q 60 100, 45 110"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M80 115 Q 55 115, 40 125"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Feet with little toes */}
          <ellipse
            cx="42"
            cy="108"
            rx="10"
            ry="6"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2.5"
            fill="none"
            transform="rotate(-15, 42, 108)"
          />
          <ellipse
            cx="37"
            cy="125"
            rx="10"
            ry="6"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2.5"
            fill="none"
            transform="rotate(-25, 37, 125)"
          />
        </g>

        {/* Waving hand - animated */}
        <g>
          <path
            d="M260 70 Q 275 55, 280 40"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 260 70; 20 260 70; -15 260 70; 0 260 70"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <circle cx="280" cy="35" r="9" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 260 70; 20 260 70; -15 260 70; 0 260 70"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Little finger lines */}
          <g>
            <line x1="275" y1="28" x2="273" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" values="0 260 70; 20 260 70; -15 260 70; 0 260 70" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="280" y1="26" x2="280" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" values="0 260 70; 20 260 70; -15 260 70; 0 260 70" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="285" y1="28" x2="287" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" values="0 260 70; 20 260 70; -15 260 70; 0 260 70" dur="1s" repeatCount="indefinite" />
            </line>
          </g>
        </g>

        {/* Floating decorative elements */}
        <text x="30" y="50" fontSize="16" fill="rgba(255,255,255,0.5)">
          <animate attributeName="y" values="50;45;50" dur="2s" repeatCount="indefinite" />
          ✦
        </text>
        <text x="290" y="130" fontSize="12" fill="rgba(255,255,255,0.4)">
          <animate attributeName="y" values="130;125;130" dur="2.5s" repeatCount="indefinite" />
          ✦
        </text>
        <text x="55" y="70" fontSize="10" fill="rgba(255,255,255,0.3)">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
          ♪
        </text>

        {/* Little hearts */}
        <text x="270" y="25" fontSize="14" fill="rgba(255,150,150,0.5)">
          <animate attributeName="y" values="25;20;25" dur="1.5s" repeatCount="indefinite" />
          ♥
        </text>
      </svg>
    </Box>
  )
}

// Project item component - more playful
const ProjectItem = ({ title, type, company, href }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      _hover={{ textDecoration: 'none' }}
      display="block"
      py={3}
      borderBottom="2px dashed"
      borderColor="whiteAlpha.300"
      transition="all 0.2s ease"
      _hover={{
        bg: 'whiteAlpha.100',
        pl: 3,
        borderColor: 'whiteAlpha.500'
      }}
    >
      <HStack justify="space-between" align="center">
        <Box flex={1}>
          <HStack spacing={2} align="center">
            <Text fontSize="xs" color="whiteAlpha.500">→</Text>
            <Text
              fontSize="md"
              fontWeight="800"
              color="white"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              {title}
            </Text>
          </HStack>
          <Text fontSize="xs" color="whiteAlpha.500" textTransform="uppercase" ml={5}>
            {type} {company && `// ${company}`}
          </Text>
        </Box>
        <Box
          px={2}
          py={1}
          border="2px solid"
          borderColor="whiteAlpha.400"
          borderRadius="full"
          fontSize="xs"
          color="whiteAlpha.700"
          fontWeight="700"
          textTransform="uppercase"
          _groupHover={{ borderColor: 'white', color: 'white' }}
        >
          Go!
        </Box>
      </HStack>
    </Link>
  )
}

// Social link component - more fun
const SocialLinkItem = ({ href, children, emoji }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      display="inline-flex"
      alignItems="center"
      gap={2}
      color="whiteAlpha.800"
      fontSize="sm"
      fontWeight="700"
      textTransform="uppercase"
      letterSpacing="wide"
      px={3}
      py={2}
      border="2px solid"
      borderColor="whiteAlpha.300"
      borderRadius="full"
      _hover={{
        color: 'white',
        borderColor: 'white',
        transform: 'translateY(-2px)'
      }}
      transition="all 0.2s ease"
    >
      <Text>{emoji}</Text>
      {children}
    </Link>
  )
}

const PullOutCard = ({ isOpen, onClose }) => {
  const cardRef = useRef(null)
  const backdropRef = useRef(null)
  const contentRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)

  // Colors
  const cardBg = '#1a1a1a'
  const overlayColor = 'rgba(0, 0, 0, 0.7)'

  // Projects data
  const projects = [
    {
      title: 'Digit Predictor',
      type: 'Machine Learning',
      company: 'Personal',
      href: 'https://github.com/akumar23/digit-predictor-neural-net'
    },
    {
      title: 'HuggingFace Trainer',
      type: 'AI/ML',
      company: 'Personal',
      href: 'https://github.com/akumar23/hf-model-train'
    },
    {
      title: 'Comic Ranker',
      type: 'Full-Stack',
      company: 'Personal',
      href: 'https://comic-ranker.vercel.app/'
    },
    {
      title: 'LLM Infrastructure',
      type: 'DevOps',
      company: 'At NALEJ',
      href: '#'
    },
    {
      title: 'Discourse Plugins',
      type: 'Full-Stack',
      company: 'At NALEJ',
      href: '#'
    }
  ]

  // Animation - handle open/close states
  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true)
    }
  }, [isOpen, shouldRender])

  // Run animation after render when shouldRender changes
  useEffect(() => {
    if (!shouldRender) return

    const frameId = requestAnimationFrame(() => {
      const card = cardRef.current
      const backdrop = backdropRef.current
      const content = contentRef.current

      if (!card || !backdrop) return

      if (isOpen) {
        document.body.style.overflow = 'hidden'

        const tl = gsap.timeline()

        tl.set(card, { x: '100%', visibility: 'visible' })
          .set(backdrop, { opacity: 0, visibility: 'visible' })
          .to(backdrop, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
          .to(card, {
            x: '0%',
            duration: 0.5,
            ease: 'power3.out'
          }, '-=0.2')

        if (content && content.children && content.children.length > 0) {
          tl.from(content.children, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out'
          }, '-=0.2')
        }
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            setShouldRender(false)
            document.body.style.overflow = ''
          }
        })

        tl.to(card, {
          x: '100%',
          duration: 0.4,
          ease: 'power3.in'
        })
          .to(backdrop, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
          }, '-=0.2')
      }
    })

    return () => {
      cancelAnimationFrame(frameId)
      document.body.style.overflow = ''
    }
  }, [isOpen, shouldRender])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!shouldRender) return null

  return (
    <Portal>
      {/* Backdrop */}
      <Box
        ref={backdropRef}
        position="fixed"
        inset={0}
        bg={overlayColor}
        backdropFilter="blur(8px)"
        zIndex={1000}
        onClick={onClose}
        cursor="pointer"
        visibility="hidden"
      />

      {/* Card */}
      <Box
        ref={cardRef}
        position="fixed"
        top={0}
        right={0}
        h="100vh"
        w={{ base: '100%', md: '600px', lg: '700px' }}
        maxW="100vw"
        bg={cardBg}
        zIndex={1001}
        overflowY="auto"
        visibility="hidden"
        borderLeft="3px solid"
        borderColor="whiteAlpha.200"
      >
        <Box ref={contentRef} p={{ base: 6, md: 10 }} minH="100%">
          {/* Decorative stars in corner */}
          <Box position="absolute" top={6} left={6}>
            <Star size={24} color="whiteAlpha.400" />
          </Box>
          <Box position="absolute" top={16} left={16}>
            <Star size={14} delay={0.5} color="whiteAlpha.300" />
          </Box>

          {/* Header with close button */}
          <Box mb={4} position="relative">
            {/* Close button - more playful */}
            <Box
              as="button"
              onClick={onClose}
              position="absolute"
              top={0}
              right={0}
              display="flex"
              alignItems="center"
              gap={2}
              bg="transparent"
              border="3px solid"
              borderColor="whiteAlpha.500"
              borderRadius="full"
              px={4}
              py={2}
              cursor="pointer"
              transition="all 0.2s ease"
              zIndex={10}
              animation={`${wiggle} 3s ease-in-out infinite`}
              _hover={{
                borderColor: 'white',
                bg: 'whiteAlpha.100',
                transform: 'scale(1.05)'
              }}
            >
              <Text fontSize="sm" fontWeight="900" color="white" textTransform="uppercase">
                Close
              </Text>
              <Text fontSize="lg">✕</Text>
            </Box>

            {/* Speech bubble - hand drawn style */}
            <Box position="relative" pt={4}>
              <Box
                border="3px solid"
                borderColor="whiteAlpha.500"
                borderRadius="30px"
                p={6}
                maxW="280px"
                position="relative"
                ml={{ base: 0, md: 4 }}
                bg="whiteAlpha.50"
                _before={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-20px',
                  right: '60px',
                  width: '40px',
                  height: '20px',
                  borderRight: '3px solid',
                  borderBottom: '3px solid',
                  borderColor: 'whiteAlpha.500',
                  borderBottomRightRadius: '20px',
                  transform: 'rotate(15deg)',
                  bg: '#1a1a1a'
                }}
              >
                <Text
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight="900"
                  color="white"
                  fontFamily="heading"
                  lineHeight="1.1"
                  textTransform="uppercase"
                  letterSpacing="tight"
                >
                  Hey there!
                  <Text as="span" display="block" color="whiteAlpha.700" fontSize="xl">
                    Welcome :)
                  </Text>
                </Text>
              </Box>

              {/* Animated character */}
              <Box
                position="relative"
                mt={6}
                ml={{ base: 0, md: 4 }}
              >
                <CartoonCharacter />
              </Box>
            </Box>
          </Box>

          {/* Squiggle divider */}
          <Box my={8} maxW="200px">
            <Squiggle color="whiteAlpha.300" width="100%" height="20px" />
          </Box>

          {/* Main content grid */}
          <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr' }}
            gap={{ base: 10, md: 12 }}
          >
            {/* Left column - Bio */}
            <GridItem>
              <VStack align="start" spacing={6}>
                {/* Intro with fun styling */}
                <Box>
                  <HStack spacing={2} mb={3}>
                    <Star size={16} color="whiteAlpha.500" />
                    <Text
                      fontSize="xs"
                      fontWeight="800"
                      color="whiteAlpha.500"
                      textTransform="uppercase"
                      letterSpacing="widest"
                    >
                      About Me
                    </Text>
                  </HStack>
                  <Text
                    fontSize="lg"
                    fontWeight="900"
                    color="white"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    lineHeight="tall"
                  >
                    Aryan Kumar
                  </Text>
                  <Text
                    fontSize="md"
                    fontWeight="700"
                    color="whiteAlpha.700"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Full Stack, AI & Infra Engineer
                  </Text>
                  <Text
                    fontSize="sm"
                    color="whiteAlpha.500"
                    textTransform="uppercase"
                    mt={1}
                  >
                    📍 San Jose, CA
                  </Text>
                </Box>

                {/* Bio - more casual and fun */}
                <VStack align="start" spacing={4}>
                  <Text
                    fontSize="sm"
                    color="whiteAlpha.800"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    lineHeight="tall"
                  >
                    I build cool stuff on the internet! From full-stack apps to AI systems and infrastructure that actually works.
                  </Text>

                  <Text
                    fontSize="sm"
                    color="whiteAlpha.700"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    lineHeight="tall"
                  >
                    Love clean code, creative solutions, and turning wild ideas into reality. ✨
                  </Text>

                  <Box
                    border="2px dashed"
                    borderColor="whiteAlpha.300"
                    borderRadius="xl"
                    p={3}
                    mt={2}
                  >
                    <Text
                      fontSize="xs"
                      color="whiteAlpha.600"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      🎓 B.S. Software Engineering @ San Jose State
                    </Text>
                  </Box>
                </VStack>

                {/* Social links - pill style */}
                <HStack flexWrap="wrap" gap={2} pt={2}>
                  <SocialLinkItem href="https://www.linkedin.com/in/aryan-kumar-9640b4150/" emoji="💼">
                    LinkedIn
                  </SocialLinkItem>
                  <SocialLinkItem href="https://github.com/akumar23" emoji="🐙">
                    GitHub
                  </SocialLinkItem>
                  <SocialLinkItem href="mailto:kumar.aryan@gmail.com" emoji="✉️">
                    Email
                  </SocialLinkItem>
                </HStack>
              </VStack>
            </GridItem>

            {/* Right column - Projects */}
            <GridItem>
              <Box>
                <HStack spacing={2} mb={4}>
                  <Star size={16} color="whiteAlpha.500" />
                  <Text
                    fontSize="xs"
                    fontWeight="800"
                    color="whiteAlpha.500"
                    textTransform="uppercase"
                    letterSpacing="widest"
                  >
                    Cool Stuff I Made
                  </Text>
                </HStack>
                <VStack align="stretch" spacing={0}>
                  {projects.map((project, index) => (
                    <ProjectItem key={index} {...project} />
                  ))}
                </VStack>
              </Box>
            </GridItem>
          </Grid>

          {/* Footer with fun message */}
          <Box mt={12} textAlign="center">
            <Text
              fontSize="xs"
              color="whiteAlpha.400"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Thanks for stopping by! ♥
            </Text>
          </Box>

          {/* Footer spacer */}
          <Box h={10} />
        </Box>
      </Box>
    </Portal>
  )
}

export default PullOutCard
