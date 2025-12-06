import { Box, Text, HStack, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

// Hit Counter Component
export const HitCounter = ({ initialCount = 123456 }) => {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    const stored = localStorage.getItem('retro-hit-count')
    if (stored) {
      setCount(parseInt(stored, 10))
    } else {
      setCount(initialCount)
    }
    const newCount = stored ? parseInt(stored, 10) + 1 : initialCount + 1
    setCount(newCount)
    localStorage.setItem('retro-hit-count', newCount.toString())
  }, [initialCount])

  const digits = count.toString().padStart(6, '0').split('')

  return (
    <Box textAlign="center" my={4}>
      <Text fontSize="sm" mb={2} fontWeight="bold">
        VISITOR COUNTER
      </Text>
      <HStack spacing={1} justify="center" className="visitor-counter">
        {digits.map((digit, i) => (
          <Box
            key={i}
            className="counter-digit"
            bg="#000000"
            color="#00FF00"
            border="2px solid #00FF00"
            px={3}
            py={2}
            fontFamily="'Courier New', monospace"
            fontWeight="bold"
            fontSize="xl"
            boxShadow="0 0 5px #00FF00"
          >
            {digit}
          </Box>
        ))}
      </HStack>
    </Box>
  )
}

// Under Construction Banner
export const UnderConstruction = () => {
  return (
    <Box className="construction-tape" my={4}>
      <Text fontSize="lg" fontWeight="bold" color="black">
        🚧 SITE UNDER CONSTRUCTION 🚧
      </Text>
    </Box>
  )
}

// Marquee Text Component
export const MarqueeText = ({ children, speed = 15 }) => {
  return (
    <Box className="marquee" overflow="hidden" whiteSpace="nowrap" my={4}>
      <Box
        className="marquee-content"
        display="inline-block"
        animation={`marquee ${speed}s linear infinite`}
        pl="100%"
      >
        {children}
      </Box>
    </Box>
  )
}

// Blinking Text Component
export const BlinkingText = ({ children }) => {
  return (
    <Text as="span" className="blink">
      {children}
    </Text>
  )
}

// Rainbow Text Component
export const RainbowText = ({ children }) => {
  return (
    <Text as="span" className="rainbow-text" fontWeight="bold">
      {children}
    </Text>
  )
}

// Animated Divider
export const AnimatedDivider = () => {
  return (
    <Box
      className="animated-divider"
      height="4px"
      my={4}
      background="repeating-linear-gradient(90deg, #FF00FF, #00FFFF 10px, #FFFF00 20px)"
      backgroundSize="200% 100%"
      animation="slide 2s linear infinite"
    />
  )
}

// Welcome Banner
export const WelcomeBanner = ({ title = "WELCOME TO MY HOMEPAGE" }) => {
  return (
    <Box
      className="welcome-banner"
      fontSize={{ base: 'xl', md: '2xl' }}
      fontWeight="bold"
      textAlign="center"
      p={6}
      bg="#FF00FF"
      color="#FFFF00"
      border="5px double #00FFFF"
      boxShadow="0 0 20px #FF00FF, inset 0 0 20px rgba(255, 255, 0, 0.5)"
      my={6}
    >
      {title}
    </Box>
  )
}

// Retro Button with beveled style
export const RetroButton = ({ children, onClick, ...props }) => {
  return (
    <Box
      as="button"
      className="retro-button"
      border="3px solid"
      borderColor="#ffffff #000000 #000000 #ffffff"
      bg="#C0C0C0"
      boxShadow="4px 4px 0px #000000"
      cursor="pointer"
      transition="all 0.1s"
      px={4}
      py={2}
      fontWeight="bold"
      onClick={onClick}
      _hover={{
        transform: 'translate(2px, 2px)',
        boxShadow: '2px 2px 0px #000000'
      }}
      _active={{
        borderColor: '#000000 #ffffff #ffffff #000000',
        transform: 'translate(4px, 4px)',
        boxShadow: 'none'
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

// Beveled Container (Windows 95 style)
export const BeveledContainer = ({ children, ...props }) => {
  return (
    <Box
      className="beveled-border"
      border="3px solid"
      borderColor="#ffffff #000000 #000000 #ffffff"
      boxShadow="inset 2px 2px 0px rgba(255, 255, 255, 0.5), inset -2px -2px 0px rgba(0, 0, 0, 0.5)"
      p={4}
      bg={useColorModeValue('rgba(192, 192, 192, 0.8)', 'rgba(64, 64, 64, 0.8)')}
      {...props}
    >
      {children}
    </Box>
  )
}

// Neon Glow Text
export const NeonGlowText = ({ children, color = 'currentColor' }) => {
  return (
    <Text
      as="span"
      className="neon-glow"
      textShadow={`
        0 0 5px ${color},
        0 0 10px ${color},
        0 0 15px ${color},
        0 0 20px ${color}
      `}
    >
      {children}
    </Text>
  )
}

// Spinning Icon/Element
export const SpinningElement = ({ children }) => {
  return (
    <Box className="spinning" display="inline-block">
      {children}
    </Box>
  )
}

// Bouncing Element
export const BouncingElement = ({ children }) => {
  return (
    <Box className="bouncing" display="inline-block">
      {children}
    </Box>
  )
}

// "New" Badge (animated)
export const NewBadge = () => {
  return (
    <Box
      as="span"
      bg="red"
      color="white"
      px={2}
      py={1}
      fontSize="xs"
      fontWeight="bold"
      borderRadius="0"
      className="blink"
      ml={2}
    >
      NEW!
    </Box>
  )
}

// Email link with retro style
export const RetroEmailLink = ({ email }) => {
  return (
    <Box
      as="a"
      href={`mailto:${email}`}
      className="retro-link"
      color="#0000FF"
      textDecoration="underline"
      fontWeight="bold"
      _hover={{
        color: '#FF00FF',
        bg: '#FFFF00',
        textShadow: '2px 2px 0px #000000',
        px: 2
      }}
    >
      {email}
    </Box>
  )
}

// "Best viewed in Netscape Navigator" badge
export const BestViewedBadge = () => {
  return (
    <Box
      textAlign="center"
      fontSize="xs"
      fontStyle="italic"
      color={useColorModeValue('gray.600', 'gray.400')}
      my={4}
    >
      Best viewed in Netscape Navigator 4.0 or higher
    </Box>
  )
}

// Pixel border box
export const PixelBorder = ({ children, ...props }) => {
  return (
    <Box
      border="4px solid"
      borderImage="repeating-linear-gradient(45deg, #FF00FF, #FF00FF 10px, #00FFFF 10px, #00FFFF 20px) 4"
      p={4}
      {...props}
    >
      {children}
    </Box>
  )
}
