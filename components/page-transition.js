import { useEffect, useState, useRef, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '../lib/gsap'

const MotionBox = motion(Box)

// Context for managing transition state across components
const TransitionContext = createContext({
  isTransitioning: false,
  setIsTransitioning: () => {}
})

export const usePageTransition = () => useContext(TransitionContext)

/**
 * PageTransitionProvider - Provides transition state to the app
 */
export const PageTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      {children}
    </TransitionContext.Provider>
  )
}

/**
 * TransitionCurtain - NDS-inspired curtain wipe transition
 * Creates a smooth curtain effect between page navigations
 */
export const TransitionCurtain = () => {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState('idle') // 'idle' | 'entering' | 'exiting'
  const curtainRef = useRef(null)
  const progressRef = useRef(null)

  // Colors
  const curtainBg = useColorModeValue('#0F0F0F', '#0F0F0F')
  const progressBg = useColorModeValue('#E54B4B', '#E54B4B')

  useEffect(() => {
    let ctx

    const handleRouteChangeStart = (url) => {
      if (url === router.asPath) return

      setIsAnimating(true)
      setTransitionPhase('entering')

      // Curtain enter animation
      ctx = gsap.context(() => {
        const tl = gsap.timeline()

        // Curtain slides up from bottom
        tl.set(curtainRef.current, {
          yPercent: 100,
          visibility: 'visible'
        })

        tl.to(curtainRef.current, {
          yPercent: 0,
          duration: 0.5,
          ease: 'power3.inOut'
        })

        // Progress bar animates
        tl.fromTo(progressRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.3, ease: 'power2.out' },
          '-=0.2'
        )
      }, curtainRef)
    }

    const handleRouteChangeComplete = () => {
      setTransitionPhase('exiting')

      // Curtain exit animation
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false)
            setTransitionPhase('idle')
          }
        })

        // Small pause at full cover
        tl.to({}, { duration: 0.1 })

        // Curtain slides up and out
        tl.to(curtainRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: 'power3.inOut'
        })

        // Reset progress bar
        tl.set(progressRef.current, { scaleX: 0 })

        // Reset curtain position
        tl.set(curtainRef.current, {
          yPercent: 100,
          visibility: 'hidden'
        })
      }, curtainRef)
    }

    const handleRouteChangeError = () => {
      setIsAnimating(false)
      setTransitionPhase('idle')

      if (curtainRef.current) {
        gsap.set(curtainRef.current, {
          yPercent: 100,
          visibility: 'hidden'
        })
      }
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
      if (ctx) ctx.revert()
    }
  }, [router])

  return (
    <Box
      ref={curtainRef}
      position="fixed"
      inset={0}
      zIndex={9998}
      bg={curtainBg}
      visibility="hidden"
      style={{ transform: 'translateY(100%)' }}
      pointerEvents={isAnimating ? 'all' : 'none'}
    >
      {/* Progress indicator at top */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="3px"
        bg="whiteAlpha.100"
        overflow="hidden"
      >
        <Box
          ref={progressRef}
          width="100%"
          height="100%"
          bg={progressBg}
          style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
        />
      </Box>

      {/* Center content during transition */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <Box
          fontSize="2xl"
          fontFamily="serif"
          fontWeight="400"
          color="whiteAlpha.800"
          letterSpacing="tight"
        >
          AK
        </Box>
      </Box>
    </Box>
  )
}

/**
 * PageContent - Wrapper for page content with refined enter animation
 */
export const PageContent = ({ children }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </MotionBox>
  )
}

/**
 * Staggered content animation for sections
 */
export const StaggerContainer = ({ children, delay = 0 }) => {
  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </MotionBox>
  )
}

export const StaggerItem = ({ children }) => {
  return (
    <MotionBox
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
    >
      {children}
    </MotionBox>
  )
}

/**
 * Fade transition for simpler animations
 */
export const FadeTransition = ({ children, delay = 0 }) => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
          delay
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: 'easeIn'
        }
      }}
    >
      {children}
    </MotionBox>
  )
}

/**
 * Slide up transition for cards and content blocks
 */
export const SlideUpTransition = ({ children, delay = 0 }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay
        }
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </MotionBox>
  )
}

export default TransitionCurtain
