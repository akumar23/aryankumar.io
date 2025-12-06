import { motion, useReducedMotion } from 'framer-motion'
import { Box, Heading } from '@chakra-ui/react'

const AnimatedHero = ({ children, delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion()

  // Split text into individual characters for animation
  const text = typeof children === 'string' ? children : ''
  const characters = text.split('')

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.03,
        delayChildren: prefersReducedMotion ? 0 : delay
      }
    })
  }

  // Individual character animation
  const child = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      rotateX: prefersReducedMotion ? 0 : -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
        duration: prefersReducedMotion ? 0.01 : undefined
      }
    }
  }

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'inline-block', willChange: 'opacity' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: 'inline-block',
            marginRight: char === ' ' ? '0.25em' : '0',
            willChange: 'transform, opacity'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

export const AnimatedText = ({ children, delay = 0, as = 'p', ...props }) => {
  const prefersReducedMotion = useReducedMotion()

  // Word-based animation for paragraphs
  const words = typeof children === 'string' ? children.split(' ') : []

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : delay
      }
    }
  }

  const child = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        duration: prefersReducedMotion ? 0.01 : undefined
      }
    }
  }

  return (
    <Box
      as={motion.div}
      variants={container}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            willChange: 'transform, opacity'
          }}
        >
          {word}
        </motion.span>
      ))}
    </Box>
  )
}

export const FadeInBox = ({ children, delay = 0, ...props }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: prefersReducedMotion ? 1 : 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.8,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default AnimatedHero
