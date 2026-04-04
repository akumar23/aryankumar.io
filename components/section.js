import { motion, useReducedMotion } from 'framer-motion'
import { chakra, shouldForwardProp, Box } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

const Section = ({ children, delay = 0, ...props }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <StyledDiv
      initial={{ y: prefersReducedMotion ? 0 : 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      mb={8}
      {...props}
    >
      {children}
    </StyledDiv>
  )
}

// Full-width section variant
export const FullSection = ({ children, delay = 0, bg, ...props }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Box
      as={motion.section}
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay
      }}
      py={{ base: 16, md: 24 }}
      bg={bg}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Section
