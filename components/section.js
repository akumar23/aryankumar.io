import { motion, useReducedMotion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

const Section = ({ children, delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <StyledDiv
      initial={{ y: prefersReducedMotion ? 0 : 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay,
        ease: 'easeOut'
      }}
      mb={6}
    >
      {children}
    </StyledDiv>
  )
}

export default Section