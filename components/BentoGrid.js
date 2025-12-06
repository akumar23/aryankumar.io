import { Box, Grid, useColorModeValue } from '@chakra-ui/react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { useRef, useState } from 'react'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

const BentoGrid = ({ children, columns = { base: 1, md: 4 }, gap = 4 }) => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: `repeat(${columns.md}, 1fr)`
      }}
      gap={gap}
      w="100%"
    >
      {children}
    </Grid>
  )
}

const BentoCard = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  delay = 0,
  gradient = false,
  hoverScale = 1.02,
  enableSpotlight = true,
  spotlightOpacity = 0.15,
  enableTilt = false,
  tiltStrength = 3,
  ...props
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const bgColor = useColorModeValue(
    gradient ? 'linear(to-br, whiteAlpha.700, whiteAlpha.500)' : 'whiteAlpha.700',
    gradient ? 'linear(to-br, whiteAlpha.200, whiteAlpha.100)' : 'whiteAlpha.200'
  )

  const borderColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.300')
  const hoverBorderColor = useColorModeValue('grassTeal', '#88ccca')
  const shadowColor = useColorModeValue(
    'rgba(136, 204, 202, 0.1)',
    'rgba(136, 204, 202, 0.2)'
  )

  const spotlightColor = '#88ccca'

  const handleMouseMove = (e) => {
    if (!ref.current || !enableSpotlight) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })

    // 3D tilt effect
    if (enableTilt && !prefersReducedMotion) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -tiltStrength
      const rotateY = ((x - centerX) / centerX) * tiltStrength

      ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hoverScale})`
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (ref.current && enableTilt && !prefersReducedMotion) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }

  return (
    <MotionBox
      ref={ref}
      gridColumn={{ base: 'span 1', md: `span ${colSpan}` }}
      gridRow={{ base: 'auto', md: `span ${rowSpan}` }}
      bg={gradient ? undefined : bgColor}
      bgGradient={gradient ? bgColor : undefined}
      backdropFilter="blur(10px)"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      p={6}
      position="relative"
      overflow="hidden"
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : delay }}
      whileHover={enableTilt || prefersReducedMotion ? {
        borderColor: hoverBorderColor,
        boxShadow: `0 8px 30px ${shadowColor}`
      } : {
        scale: hoverScale,
        borderColor: hoverBorderColor,
        boxShadow: `0 8px 30px ${shadowColor}`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cursor="default"
      {...props}
    >
      {/* Spotlight overlay */}
      {enableSpotlight && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderRadius="xl"
          pointerEvents="none"
          opacity={isHovered && !prefersReducedMotion ? 1 : 0}
          transition="opacity 0.3s ease"
          background={
            isHovered
              ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}${Math.round(spotlightOpacity * 255).toString(16).padStart(2, '0')}, transparent 80%)`
              : 'transparent'
          }
          zIndex={0}
        />
      )}

      {/* Content wrapper */}
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </MotionBox>
  )
}

export { BentoGrid, BentoCard }
