import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay, useColorModeValue } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useRef } from 'react'

const MotionBox = motion(Box)

export const GridItem = ({ children, id, title, thumbnail }) => {
  const cardBg = useColorModeValue('whiteAlpha.700', 'whiteAlpha.100')
  const borderColor = useColorModeValue('whiteAlpha.300', 'whiteAlpha.200')
  const prefersReducedMotion = useReducedMotion()

  // Spotlight state
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const spotlightColor = '#88ccca'
  const spotlightOpacity = 0.2

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <MotionBox
      w="100%"
      textAlign="center"
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ willChange: 'transform' }}
    >
      <LinkBox
        ref={cardRef}
        cursor="pointer"
        bg={cardBg}
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor={borderColor}
        css={{ backdropFilter: 'blur(10px)' }}
        _hover={{
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          borderColor: 'grassTeal'
        }}
        transition="all 0.3s ease"
        position="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Spotlight overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderRadius="xl"
          pointerEvents="none"
          opacity={isHovered && !prefersReducedMotion ? 1 : 0}
          transition="opacity 0.3s ease"
          background={
            isHovered
              ? `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}${Math.round(spotlightOpacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`
              : 'transparent'
          }
          zIndex={1}
        />

        <Box overflow="hidden" position="relative" zIndex={0}>
          <Image
            src={thumbnail}
            alt={title}
            className="grid-item-thumbnail"
            placeholder="blur"
            height={500}
            width={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ transition: 'transform 0.4s ease' }}
          />
        </Box>
        <Box p={4} position="relative" zIndex={2}>
          <LinkOverlay as={NextLink} href={`${id}`} scroll={false}>
            <Text mt={2} fontSize={20} fontWeight="semibold">
              {title}
            </Text>
          </LinkOverlay>
          <Text fontSize={14} opacity={0.8}>{children}</Text>
        </Box>
      </LinkBox>
    </MotionBox>
  )
}