import { useEffect, useState, useRef } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '../lib/gsap'

const MotionBox = motion(Box)

/**
 * PageLoader - Initial page loading animation
 * Shows a branded loading screen on first visit
 */
const PageLoader = ({ finishDelay = 300 }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const loaderRef = useRef(null)
  const logoRef = useRef(null)
  const progressRef = useRef(null)

  // NDS-inspired dark loader
  const bgColor = '#0F0F0F'
  const textColor = '#FAFAFA'
  const accentColor = '#E54B4B'

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded')

    if (hasLoaded) {
      setIsLoading(false)
      setIsVisible(false)
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('hasLoaded', 'true')

          // Exit animation - slide up
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: 'power3.inOut',
            delay: finishDelay / 1000,
            onComplete: () => {
              setIsLoading(false)
              setTimeout(() => setIsVisible(false), 100)
            }
          })
        }
      })

      // Logo animation - subtle fade in
      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          y: 10
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        }
      )

      // Progress bar animation
      tl.to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut'
        },
        '-=0.2'
      )
    }, loaderRef)

    return () => ctx.revert()
  }, [finishDelay])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <Box
          ref={loaderRef}
          position="fixed"
          inset={0}
          zIndex={10000}
          bg={bgColor}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={6}
        >
          {/* Logo - refined serif style */}
          <Box
            ref={logoRef}
            fontSize="2xl"
            fontWeight="400"
            fontFamily="serif"
            color={textColor}
            letterSpacing="tight"
            opacity={0}
          >
            AK
          </Box>

          {/* Progress bar - minimal */}
          <Box
            width="80px"
            height="2px"
            bg="whiteAlpha.100"
            borderRadius="full"
            overflow="hidden"
          >
            <Box
              ref={progressRef}
              width="100%"
              height="100%"
              bg={accentColor}
              borderRadius="full"
              transformOrigin="left"
              transform="scaleX(0)"
            />
          </Box>
        </Box>
      )}
    </AnimatePresence>
  )
}

/**
 * PageTransition - Wrapper for page content with enter/exit animations
 */
export const PageTransition = ({ children }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  )
}

/**
 * RouteTransition - Animated overlay for route changes
 */
export const RouteTransition = ({ isAnimating }) => {
  const bgColor = useColorModeValue('#FAFAFA', '#0A0A0A')

  return (
    <AnimatePresence>
      {isAnimating && (
        <MotionBox
          position="fixed"
          inset={0}
          zIndex={9999}
          bg={bgColor}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ transformOrigin: 'bottom' }}
        />
      )}
    </AnimatePresence>
  )
}

export default PageLoader
