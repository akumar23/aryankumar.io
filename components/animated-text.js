import { motion, useReducedMotion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledSpan = chakra(motion.span, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

/**
 * AnimatedText component for word-by-word or line-by-line scroll reveals
 *
 * @param {string} text - The text to animate
 * @param {('word' | 'line' | 'char')} type - Animation type (default: 'word')
 * @param {number} delay - Initial delay before animation starts (default: 0)
 * @param {number} staggerDelay - Delay between each word/line/char (default: 0.08)
 * @param {number} duration - Duration of each animation (default: 0.5)
 * @param {object} variants - Custom animation variants (optional)
 * @param {string} as - HTML element to render (default: 'p')
 * @param {object} ...props - Additional Chakra UI props
 */
const AnimatedText = ({
  text,
  type = 'word',
  delay = 0,
  staggerDelay = 0.08,
  duration = 0.5,
  variants,
  as = 'p',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion()

  // Default animation variants
  const defaultVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)'
    }
  }

  const animationVariants = variants || defaultVariants

  // Split text based on type
  const splitText = () => {
    if (type === 'line') {
      return text.split('\n')
    } else if (type === 'word') {
      return text.split(' ')
    } else if (type === 'char') {
      return text.split('')
    }
    return [text]
  }

  const parts = splitText()

  // Container variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : delay
      }
    }
  }

  // Item variants
  const itemVariants = {
    hidden: animationVariants.hidden,
    visible: {
      ...animationVariants.visible,
      transition: {
        duration: prefersReducedMotion ? 0.01 : duration,
        ease: 'easeOut'
      }
    }
  }

  const MotionContainer = chakra(motion[as], {
    shouldForwardProp: prop => {
      return shouldForwardProp(prop) || prop === 'transition'
    }
  })

  return (
    <MotionContainer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      {...props}
    >
      {parts.map((part, index) => (
        <StyledSpan
          key={index}
          variants={itemVariants}
          display="inline-block"
          mr={type === 'word' ? 1 : 0}
          mb={type === 'line' ? 2 : 0}
        >
          {part}
          {type === 'line' && index < parts.length - 1 && <br />}
        </StyledSpan>
      ))}
    </MotionContainer>
  )
}

/**
 * AnimatedHeading - Pre-configured AnimatedText for headings
 */
export const AnimatedHeading = ({ children, ...props }) => (
  <AnimatedText
    text={children}
    type="word"
    staggerDelay={0.1}
    duration={0.6}
    as="h2"
    fontSize="2xl"
    fontWeight="bold"
    {...props}
  />
)

/**
 * AnimatedParagraph - Pre-configured AnimatedText for paragraphs
 */
export const AnimatedParagraph = ({ children, ...props }) => (
  <AnimatedText
    text={children}
    type="word"
    staggerDelay={0.05}
    duration={0.4}
    as="p"
    {...props}
  />
)

/**
 * AnimatedCharacters - Pre-configured AnimatedText for character-by-character reveals
 */
export const AnimatedCharacters = ({ children, ...props }) => (
  <AnimatedText
    text={children}
    type="char"
    staggerDelay={0.03}
    duration={0.3}
    {...props}
  />
)

export default AnimatedText
