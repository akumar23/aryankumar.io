import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { useState, useRef } from 'react'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

/**
 * SpotlightCard - A card with a radial gradient spotlight that follows the cursor
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.spotlightColor - Spotlight color (default: grassTeal)
 * @param {number} props.spotlightOpacity - Spotlight opacity (default: 0.15)
 * @param {number} props.spotlightSize - Spotlight size in pixels (default: 300)
 * @param {boolean} props.enableTilt - Enable 3D tilt effect (default: false)
 * @param {number} props.tiltStrength - Tilt strength in degrees (default: 5)
 *
 * @example
 * <SpotlightCard enableTilt>
 *   <Heading>Card Title</Heading>
 *   <Text>Card content</Text>
 * </SpotlightCard>
 */
const SpotlightCard = ({
  children,
  spotlightColor,
  spotlightOpacity = 0.15,
  spotlightSize = 300,
  enableTilt = false,
  tiltStrength = 5,
  ...props
}) => {
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Use theme color if not provided
  const defaultSpotlightColor = useColorModeValue(
    spotlightColor || '#88ccca',
    spotlightColor || '#88ccca'
  )

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })

    // Calculate rotation for 3D tilt effect
    if (enableTilt && !prefersReducedMotion) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -tiltStrength
      const rotateY = ((x - centerX) / centerX) * tiltStrength

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current && enableTilt && !prefersReducedMotion) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
  }

  return (
    <Box
      ref={cardRef}
      position="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transition={prefersReducedMotion ? 'none' : 'transform 0.2s ease-out'}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {/* Spotlight overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        borderRadius="inherit"
        pointerEvents="none"
        opacity={isHovered && !prefersReducedMotion ? 1 : 0}
        transition="opacity 0.3s ease"
        background={
          isHovered
            ? `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${defaultSpotlightColor}${Math.round(spotlightOpacity * 255).toString(16).padStart(2, '0')}, transparent 80%)`
            : 'transparent'
        }
        zIndex={1}
      />

      {/* Content wrapper to ensure proper stacking */}
      <Box position="relative" zIndex={2}>
        {children}
      </Box>
    </Box>
  )
}

export default SpotlightCard
