import { forwardRef } from 'react'
import { Box, Button, useColorModeValue } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'

const MotionBox = motion(Box)

/**
 * SketchyButton - A playful hand-drawn style button
 *
 * @param {string} variant - 'solid' | 'outline' | 'dashed' | 'sticker'
 * @param {boolean} withArrow - Show pointing arrow annotation
 * @param {string} arrowLabel - Label text for arrow
 * @param {boolean} animated - Enable hover/idle animations
 */
const SketchyButton = forwardRef(({
  children,
  variant = 'solid',
  withArrow = false,
  arrowLabel = 'click!',
  animated = true,
  size = 'md',
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = animated && !prefersReducedMotion

  // Color values
  const solidBg = useColorModeValue('neutral.900', 'primary.500')
  const solidColor = useColorModeValue('neutral.50', 'neutral.900')
  const outlineBorder = useColorModeValue('neutral.900', 'primary.400')
  const outlineColor = useColorModeValue('neutral.900', 'primary.400')
  const arrowColor = useColorModeValue('neutral.900', 'neutral.50')

  // Size presets
  const sizes = {
    sm: { px: 4, py: 2, fontSize: 'sm' },
    md: { px: 6, py: 3, fontSize: 'md' },
    lg: { px: 8, py: 4, fontSize: 'lg' }
  }

  const sizeProps = sizes[size] || sizes.md

  // Variant styles
  const variants = {
    solid: {
      bg: solidBg,
      color: solidColor,
      border: '1px solid',
      borderColor: solidBg,
      _hover: {
        transform: shouldAnimate ? 'translateY(-1px)' : undefined,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }
    },
    outline: {
      bg: 'transparent',
      color: outlineColor,
      border: '1px solid',
      borderColor: outlineBorder,
      _hover: {
        bg: solidBg,
        color: solidColor,
        transform: shouldAnimate ? 'translateY(-1px)' : undefined
      }
    },
    dashed: {
      bg: 'transparent',
      color: outlineColor,
      border: '1px dashed',
      borderColor: outlineBorder,
      _hover: {
        borderStyle: 'solid',
        transform: shouldAnimate ? 'translateY(-1px)' : undefined
      }
    },
    sticker: {
      bg: 'primary.500',
      color: 'neutral.900',
      border: '1px solid',
      borderColor: 'primary.600',
      _hover: {
        transform: shouldAnimate ? 'translateY(-1px)' : undefined,
        bg: 'primary.400'
      }
    }
  }

  const variantStyle = variants[variant] || variants.solid

  return (
    <Box position="relative" display="inline-block">

      {/* Main button */}
      <Button
        ref={ref}
        fontFamily="mono"
        fontWeight="400"
        letterSpacing="wide"
        borderRadius="md"
        transition="all 0.2s ease"
        {...sizeProps}
        {...variantStyle}
        {...props}
      >
        {children}
      </Button>
    </Box>
  )
})

SketchyButton.displayName = 'SketchyButton'

export default SketchyButton
