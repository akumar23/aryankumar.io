import { useRef, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const MotionButton = chakra(motion.button, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

/**
 * MagneticButton - A button that magnetically pulls toward the cursor on hover
 *
 * @param {Object} props - All Chakra UI Button props
 * @param {number} props.strength - Magnetic pull strength (0-1, default: 0.3)
 * @param {Object} props.springConfig - Spring physics config {stiffness, damping}
 * @param {React.ReactNode} props.children - Button content
 *
 * @example
 * <MagneticButton colorScheme="teal" size="lg">
 *   Click Me
 * </MagneticButton>
 */
const MagneticButton = ({
  children,
  strength = 0.3,
  springConfig = { stiffness: 150, damping: 15 },
  ...props
}) => {
  const buttonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Motion values for x and y position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Apply spring physics for smooth, natural motion
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!buttonRef.current || prefersReducedMotion) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from cursor to button center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Apply magnetic pull (30% of distance by default)
    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Return to original position
    x.set(0)
    y.set(0)
  }

  return (
    <MotionButton
      ref={buttonRef}
      style={{
        x: prefersReducedMotion ? 0 : springX,
        y: prefersReducedMotion ? 0 : springY
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Forward all Chakra Button styles
      as={Button}
      {...props}
    >
      {children}
    </MotionButton>
  )
}

export default MagneticButton
