import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const GlassCard = ({
  children,
  hover = true,
  delay = 0,
  ...props
}) => {
  const bgColor = useColorModeValue(
    'rgba(255, 255, 255, 0.7)',
    'rgba(255, 255, 255, 0.05)'
  )
  const borderColor = useColorModeValue(
    'rgba(255, 255, 255, 0.3)',
    'rgba(255, 255, 255, 0.1)'
  )
  const hoverBorderColor = useColorModeValue(
    'rgba(136, 204, 202, 0.5)',
    'rgba(136, 204, 202, 0.4)'
  )

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      bg={bgColor}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(20px)"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
      p={6}
      _hover={hover ? {
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
        borderColor: hoverBorderColor
      } : {}}
      style={{ transition: 'box-shadow 0.3s ease, border-color 0.3s ease' }}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default GlassCard
