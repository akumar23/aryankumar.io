import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

// Keyframe animations for playful effects
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
`

const wiggle = keyframes`
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
`

const wave = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-15deg); }
`

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
`

const drawLine = keyframes`
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
`

// Hand-drawn squiggle line divider
export const Squiggle = ({ color, width = '100px', height = '20px', ...props }) => {
  const strokeColor = useColorModeValue('#1A1A1A', '#FFFEF5')

  return (
    <Box as="svg" viewBox="0 0 100 20" fill="none" width={width} height={height} {...props}>
      <path
        d="M0 10 Q 10 0, 20 10 T 40 10 T 60 10 T 80 10 T 100 10"
        stroke={color || strokeColor}
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
}

// Decorative star/sparkle
export const Star = ({ size = 20, delay = 0, color, ...props }) => {
  const textColor = useColorModeValue('neutral.900', 'neutral.50')

  return (
    <Text
      fontSize={`${size}px`}
      color={color || textColor}
      animation={`${sparkle} 2s ease-in-out infinite`}
      style={{ animationDelay: `${delay}s` }}
      {...props}
    >
      ✦
    </Text>
  )
}

// Hand-drawn arrow with optional label
export const DoodleArrow = ({
  direction = 'right',
  label,
  color,
  size = 40,
  ...props
}) => {
  const strokeColor = useColorModeValue('#1A1A1A', '#FFFEF5')
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90
  }[direction]

  return (
    <Box display="inline-flex" alignItems="center" gap={2} {...props}>
      {label && direction === 'left' && (
        <Text fontFamily="accent" fontSize="lg" fontWeight="bold" color={color || strokeColor}>
          {label}
        </Text>
      )}
      <Box
        as="svg"
        viewBox="0 0 50 20"
        fill="none"
        width={`${size}px`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <path
          d="M0 10 Q 15 8, 35 10 M 28 4 L 38 10 L 28 16"
          stroke={color || strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Box>
      {label && direction !== 'left' && (
        <Text fontFamily="accent" fontSize="lg" fontWeight="bold" color={color || strokeColor}>
          {label}
        </Text>
      )}
    </Box>
  )
}

// Hand-drawn circle (wobbly)
export const DoodleCircle = ({ size = 60, color, children, ...props }) => {
  const strokeColor = useColorModeValue('#1A1A1A', '#FFFEF5')

  return (
    <Box position="relative" display="inline-flex" alignItems="center" justifyContent="center" {...props}>
      <Box
        as="svg"
        viewBox="0 0 60 60"
        fill="none"
        width={`${size}px`}
        height={`${size}px`}
        position="absolute"
      >
        <path
          d="M30 5 Q 55 5, 55 30 Q 55 55, 30 55 Q 5 55, 5 30 Q 5 5, 30 5"
          stroke={color || strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </Box>
      {children}
    </Box>
  )
}

// Hand-drawn underline
export const DoodleUnderline = ({ width = '100%', color, ...props }) => {
  const strokeColor = useColorModeValue('#1A1A1A', '#FFFEF5')

  return (
    <Box
      as="svg"
      viewBox="0 0 100 10"
      fill="none"
      width={width}
      height="10px"
      {...props}
    >
      <path
        d="M0 5 Q 25 2, 50 5 T 100 5"
        stroke={color || strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </Box>
  )
}

// Stick figure person - various poses
export const DoodlePerson = ({
  pose = 'wave', // wave, point, stand, sit
  size = 150,
  color,
  animated = true,
  ...props
}) => {
  const strokeColor = useColorModeValue('#1A1A1A', '#FFFEF5')
  const fillColor = useColorModeValue('#FFFEF5', '#1A1A1A')

  const poses = {
    wave: (
      <g>
        {/* Head */}
        <circle cx="50" cy="25" r="18" stroke={color || strokeColor} strokeWidth="3" fill="none"/>
        {/* Eyes */}
        <circle cx="44" cy="22" r="3" fill={color || strokeColor}/>
        <circle cx="56" cy="22" r="3" fill={color || strokeColor}/>
        {/* Smile */}
        <path d="M42 30 Q50 38 58 30" stroke={color || strokeColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <line x1="50" y1="43" x2="50" y2="80" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        {/* Left arm (down) */}
        <line x1="50" y1="55" x2="30" y2="70" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        {/* Right arm (waving) */}
        <g style={animated ? { transformOrigin: '50px 55px', animation: `${wave} 1s ease-in-out infinite` } : {}}>
          <line x1="50" y1="55" x2="75" y2="40" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
          {/* Hand */}
          <circle cx="78" cy="37" r="6" stroke={color || strokeColor} strokeWidth="2" fill="none"/>
        </g>
        {/* Legs */}
        <line x1="50" y1="80" x2="35" y2="110" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        <line x1="50" y1="80" x2="65" y2="110" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
      </g>
    ),
    point: (
      <g>
        {/* Head */}
        <circle cx="50" cy="25" r="18" stroke={color || strokeColor} strokeWidth="3" fill="none"/>
        {/* Eyes */}
        <circle cx="44" cy="22" r="3" fill={color || strokeColor}/>
        <circle cx="56" cy="22" r="3" fill={color || strokeColor}/>
        {/* Smile */}
        <path d="M42 30 Q50 36 58 30" stroke={color || strokeColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <line x1="50" y1="43" x2="50" y2="80" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        {/* Left arm (down) */}
        <line x1="50" y1="55" x2="30" y2="70" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        {/* Right arm (pointing) */}
        <line x1="50" y1="55" x2="85" y2="55" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        {/* Pointing finger */}
        <path d="M85 55 L 95 55" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        {/* Legs */}
        <line x1="50" y1="80" x2="35" y2="110" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        <line x1="50" y1="80" x2="65" y2="110" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
      </g>
    ),
    stand: (
      <g>
        {/* Head */}
        <circle cx="50" cy="25" r="18" stroke={color || strokeColor} strokeWidth="3" fill="none"/>
        {/* Eyes */}
        <circle cx="44" cy="22" r="3" fill={color || strokeColor}/>
        <circle cx="56" cy="22" r="3" fill={color || strokeColor}/>
        {/* Smile */}
        <path d="M42 30 Q50 36 58 30" stroke={color || strokeColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <line x1="50" y1="43" x2="50" y2="80" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        {/* Arms (at sides) */}
        <line x1="50" y1="55" x2="30" y2="75" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        <line x1="50" y1="55" x2="70" y2="75" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        {/* Legs */}
        <line x1="50" y1="80" x2="35" y2="110" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
        <line x1="50" y1="80" x2="65" y2="110" stroke={color || strokeColor} strokeWidth="3" strokeLinecap="round"/>
      </g>
    )
  }

  return (
    <Box
      as="svg"
      viewBox="0 0 100 120"
      fill="none"
      width={`${size}px`}
      height={`${size * 1.2}px`}
      style={animated ? { animation: `${float} 3s ease-in-out infinite` } : {}}
      {...props}
    >
      {poses[pose] || poses.stand}
    </Box>
  )
}

// Speech bubble with text
export const SpeechBubble = ({ children, color, tail = 'bottom', ...props }) => {
  const strokeColor = useColorModeValue('#1A1A1A', '#FFFEF5')
  const bgColor = useColorModeValue('#FFFEF5', '#1A1A1A')

  return (
    <Box
      position="relative"
      display="inline-block"
      border="3px solid"
      borderColor={color || strokeColor}
      borderRadius="20px"
      p={4}
      bg={bgColor}
      {...props}
    >
      {children}
      {/* Tail */}
      <Box
        position="absolute"
        {...(tail === 'bottom' ? { bottom: '-15px', left: '30px' } : { left: '-15px', top: '20px' })}
        width="0"
        height="0"
        borderLeft="15px solid transparent"
        borderRight="15px solid transparent"
        borderTop={`15px solid ${color || strokeColor}`}
        transform={tail === 'left' ? 'rotate(90deg)' : 'none'}
      />
    </Box>
  )
}

// Floating decorative cloud
export const DoodleCloud = ({ size = 80, color, ...props }) => {
  const strokeColor = useColorModeValue('#1A1A1A', '#FFFEF5')

  return (
    <Box
      as="svg"
      viewBox="0 0 80 40"
      fill="none"
      width={`${size}px`}
      height={`${size * 0.5}px`}
      {...props}
    >
      <path
        d="M15 30 Q 5 30, 5 22 Q 5 14, 15 14 Q 15 5, 30 5 Q 45 5, 50 12 Q 55 5, 65 10 Q 75 10, 75 20 Q 75 30, 65 30 Z"
        stroke={color || strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </Box>
  )
}

// Playful label with rotation
export const PlayfulLabel = ({ children, rotation = -3, color, variant = 'default', ...props }) => {
  const bgColor = useColorModeValue('neutral.900', 'primary.500')
  const textColor = useColorModeValue('neutral.50', 'neutral.900')
  const borderColor = useColorModeValue('neutral.900', 'primary.500')

  const variants = {
    default: {
      bg: bgColor,
      color: textColor,
      border: 'none'
    },
    outline: {
      bg: 'transparent',
      color: borderColor,
      border: '3px dashed',
      borderColor: borderColor
    },
    sticker: {
      bg: 'primary.500',
      color: 'neutral.900',
      border: '3px solid',
      borderColor: 'neutral.900'
    }
  }

  const style = variants[variant] || variants.default

  return (
    <Box
      display="inline-block"
      px={4}
      py={2}
      fontFamily="heading"
      fontWeight="400"
      fontSize="sm"
      textTransform="uppercase"
      letterSpacing="wide"
      transform={`rotate(${rotation}deg)`}
      animation={`${wiggle} 3s ease-in-out infinite`}
      {...style}
      {...props}
    >
      {children}
    </Box>
  )
}

// Export all as default for convenience
const Illustrations = {
  Squiggle,
  Star,
  DoodleArrow,
  DoodleCircle,
  DoodleUnderline,
  DoodlePerson,
  SpeechBubble,
  DoodleCloud,
  PlayfulLabel
}

export default Illustrations
