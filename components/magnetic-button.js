import { useRef, useEffect, useCallback } from 'react'
import { Button, useColorModeValue } from '@chakra-ui/react'
import { gsap } from '../lib/gsap'

/**
 * MagneticButton - A button with magnetic pull and GSAP-powered hover effects
 *
 * @param {Object} props - All Chakra UI Button props
 * @param {number} props.strength - Magnetic pull strength (0-1, default: 0.4)
 * @param {boolean} props.enableTextMove - Enable inner text movement (default: true)
 * @param {React.ReactNode} props.children - Button content
 *
 * @example
 * <MagneticButton colorScheme="purple" size="lg">
 *   Click Me
 * </MagneticButton>
 */
const MagneticButton = ({
  children,
  strength = 0.4,
  enableTextMove = true,
  variant = 'solid',
  colorScheme = 'primary',
  size = 'md',
  ...props
}) => {
  const buttonRef = useRef(null)
  const textRef = useRef(null)
  const glowRef = useRef(null)
  const boundingRef = useRef(null)

  // Colors based on variant
  const solidBg = useColorModeValue('primary.500', 'primary.500')
  const solidHoverBg = useColorModeValue('primary.600', 'primary.400')
  const outlineBorderColor = useColorModeValue('primary.500', 'primary.400')
  const glowColor = useColorModeValue(
    'rgba(139, 92, 246, 0.4)',
    'rgba(139, 92, 246, 0.6)'
  )

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current || prefersReducedMotion) return

    const bounds = boundingRef.current || buttonRef.current.getBoundingClientRect()
    const centerX = bounds.left + bounds.width / 2
    const centerY = bounds.top + bounds.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Magnetic pull on button
    gsap.to(buttonRef.current, {
      x: distanceX * strength,
      y: distanceY * strength,
      duration: 0.3,
      ease: 'power2.out'
    })

    // Inner text moves in opposite direction for depth effect
    if (enableTextMove && textRef.current) {
      gsap.to(textRef.current, {
        x: distanceX * strength * 0.5,
        y: distanceY * strength * 0.5,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }, [strength, enableTextMove, prefersReducedMotion])

  const handleMouseEnter = useCallback((e) => {
    if (!buttonRef.current || prefersReducedMotion) return

    // Store bounding rect on enter for performance
    boundingRef.current = buttonRef.current.getBoundingClientRect()

    // Scale up animation
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)'
    })

    // Show glow effect
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out'
      })
    }
  }, [prefersReducedMotion])

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current || prefersReducedMotion) return

    boundingRef.current = null

    // Elastic return to original position
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)'
    })

    // Reset text position
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    // Hide glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
    }
  }, [prefersReducedMotion])

  const handleMouseDown = useCallback(() => {
    if (!buttonRef.current || prefersReducedMotion) return

    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out'
    })
  }, [prefersReducedMotion])

  const handleMouseUp = useCallback(() => {
    if (!buttonRef.current || prefersReducedMotion) return

    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)'
    })
  }, [prefersReducedMotion])

  // Size mappings
  const sizeStyles = {
    sm: { px: 4, py: 2, fontSize: 'sm' },
    md: { px: 6, py: 3, fontSize: 'md' },
    lg: { px: 8, py: 4, fontSize: 'lg' }
  }

  const currentSize = sizeStyles[size] || sizeStyles.md

  // Variant styles
  const getVariantStyles = () => {
    if (variant === 'outline') {
      return {
        bg: 'transparent',
        border: '2px solid',
        borderColor: outlineBorderColor,
        color: outlineBorderColor,
        _hover: {
          bg: useColorModeValue('primary.50', 'whiteAlpha.100')
        }
      }
    }
    if (variant === 'ghost') {
      return {
        bg: 'transparent',
        color: outlineBorderColor,
        _hover: {
          bg: useColorModeValue('primary.50', 'whiteAlpha.100')
        }
      }
    }
    // Solid variant
    return {
      bg: solidBg,
      color: 'white',
      _hover: {
        bg: solidHoverBg
      }
    }
  }

  return (
    <Button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      position="relative"
      overflow="visible"
      borderRadius="full"
      fontWeight="600"
      letterSpacing="wide"
      textTransform="none"
      willChange="transform"
      {...currentSize}
      {...getVariantStyles()}
      {...props}
      // Ensure cursor interaction
      data-cursor-hover
    >
      {/* Glow effect */}
      <span
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '9999px',
          background: glowColor,
          filter: 'blur(20px)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Text wrapper for independent movement */}
      <span
        ref={textRef}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          willChange: 'transform'
        }}
      >
        {children}
      </span>
    </Button>
  )
}

export default MagneticButton
