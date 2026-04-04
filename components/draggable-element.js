import { useRef, useState } from 'react'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from 'framer-motion'

const MotionBox = motion(Box)

/**
 * DraggableElement - A playful draggable component with elastic snap-back
 *
 * @param {ReactNode} children - Content to make draggable
 * @param {string} label - Playful label text (e.g., "drag me!")
 * @param {string} labelPosition - Position of label: 'top' | 'bottom' | 'left' | 'right'
 * @param {boolean} showLabel - Whether to show the label
 * @param {boolean} elasticReturn - Whether to snap back to origin
 * @param {number} dragElasticity - Elasticity factor (0-1, lower = more elastic)
 * @param {object} constraints - Drag constraints { left, right, top, bottom }
 */
const DraggableElement = ({
  children,
  label = 'drag me!',
  labelPosition = 'top',
  showLabel = true,
  elasticReturn = true,
  dragElasticity = 0.2,
  constraints,
  onDragStart,
  onDragEnd,
  ...props
}) => {
  const constraintsRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [isDragging, setIsDragging] = useState(false)
  const [hasBeenDragged, setHasBeenDragged] = useState(false)

  // Motion values for position tracking
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Transform rotation based on drag position for playful effect
  const rotateZ = useTransform(
    x,
    [-100, 0, 100],
    [-5, 0, 5]
  )

  // Colors
  const labelColor = useColorModeValue('neutral.900', 'neutral.50')
  const borderColor = useColorModeValue('neutral.900', 'primary.400')
  const shadowColor = useColorModeValue(
    'rgba(26, 26, 26, 0.3)',
    'rgba(229, 75, 75, 0.3)'
  )
  const activeShadowColor = useColorModeValue(
    'rgba(26, 26, 26, 0.5)',
    'rgba(229, 75, 75, 0.5)'
  )

  // Label positioning
  const labelPositions = {
    top: { top: '-35px', left: '50%', transform: 'translateX(-50%) rotate(-5deg)' },
    bottom: { bottom: '-35px', left: '50%', transform: 'translateX(-50%) rotate(3deg)' },
    left: { left: '-80px', top: '50%', transform: 'translateY(-50%) rotate(-8deg)' },
    right: { right: '-80px', top: '50%', transform: 'translateY(-50%) rotate(5deg)' }
  }

  const handleDragStart = (event, info) => {
    setIsDragging(true)
    if (!hasBeenDragged) setHasBeenDragged(true)
    onDragStart?.(event, info)
  }

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    onDragEnd?.(event, info)

    // Elastic snap back to origin with playful bounce
    if (elasticReturn && !prefersReducedMotion) {
      animate(x, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 20
      })
      animate(y, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 20
      })
    }
  }

  // If reduced motion is preferred, just render children without drag
  if (prefersReducedMotion) {
    return (
      <Box position="relative" {...props}>
        {children}
      </Box>
    )
  }

  return (
    <Box
      ref={constraintsRef}
      position="relative"
      display="inline-block"
      {...props}
    >
      <MotionBox
        drag
        dragConstraints={constraints || constraintsRef}
        dragElastic={dragElasticity}
        dragMomentum={false}
        style={{ x, y, rotateZ }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{
          scale: 1.05,
          cursor: 'grabbing',
          zIndex: 100
        }}
        initial={{ scale: 1 }}
        animate={{
          scale: isDragging ? 1.05 : 1,
          boxShadow: isDragging
            ? `8px 8px 0 0 ${activeShadowColor}`
            : `4px 4px 0 0 ${shadowColor}`
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25
        }}
        cursor="grab"
        position="relative"
        userSelect="none"
      >
        {/* Border wrapper for hand-drawn effect */}
        <Box
          border="3px solid"
          borderColor={borderColor}
          borderRadius="none"
          transition="all 0.2s ease"
        >
          {children}
        </Box>

        {/* Playful label */}
        {showLabel && !hasBeenDragged && (
          <MotionBox
            position="absolute"
            {...labelPositions[labelPosition]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            pointerEvents="none"
          >
            <Text
              fontFamily="accent"
              fontSize="lg"
              fontWeight="bold"
              color={labelColor}
              whiteSpace="nowrap"
            >
              {label}
            </Text>
            {/* Hand-drawn arrow pointing to element */}
            <Box
              as="svg"
              viewBox="0 0 40 30"
              width="40px"
              height="30px"
              position="absolute"
              fill="none"
              {...(labelPosition === 'top' ? {
                bottom: '-25px',
                left: '50%',
                transform: 'translateX(-50%)'
              } : labelPosition === 'bottom' ? {
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%) rotate(180deg)'
              } : labelPosition === 'left' ? {
                right: '-30px',
                top: '50%',
                transform: 'translateY(-50%) rotate(-90deg)'
              } : {
                left: '-30px',
                top: '50%',
                transform: 'translateY(-50%) rotate(90deg)'
              })}
            >
              <path
                d="M20 5 Q 20 20, 20 25 M 15 20 L 20 28 L 25 20"
                stroke={labelColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Box>
          </MotionBox>
        )}
      </MotionBox>
    </Box>
  )
}

// Specialized draggable sticker variant
export const DraggableSticker = ({
  children,
  rotation = -3,
  color,
  ...props
}) => {
  const bgColor = useColorModeValue('primary.500', 'neutral.800')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const borderColor = useColorModeValue('neutral.900', 'primary.400')

  return (
    <DraggableElement
      label="peel me!"
      {...props}
    >
      <Box
        bg={color || bgColor}
        color={textColor}
        px={4}
        py={2}
        fontFamily="accent"
        fontSize="lg"
        fontWeight="bold"
        transform={`rotate(${rotation}deg)`}
        border="3px solid"
        borderColor={borderColor}
      >
        {children}
      </Box>
    </DraggableElement>
  )
}

// Specialized draggable polaroid/photo variant
export const DraggablePolaroid = ({
  src,
  alt,
  caption,
  rotation = -5,
  ...props
}) => {
  const bgColor = useColorModeValue('neutral.50', 'neutral.800')
  const borderColor = useColorModeValue('neutral.900', 'neutral.600')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')

  return (
    <DraggableElement
      label="grab me!"
      {...props}
    >
      <Box
        bg={bgColor}
        p={3}
        pb={caption ? 6 : 3}
        transform={`rotate(${rotation}deg)`}
        border="3px solid"
        borderColor={borderColor}
        maxW="200px"
      >
        <Box
          as="img"
          src={src}
          alt={alt}
          w="full"
          h="auto"
          display="block"
          border="2px solid"
          borderColor={borderColor}
        />
        {caption && (
          <Text
            fontFamily="accent"
            fontSize="md"
            color={textColor}
            textAlign="center"
            mt={3}
          >
            {caption}
          </Text>
        )}
      </Box>
    </DraggableElement>
  )
}

export default DraggableElement
