import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Box } from '@chakra-ui/react'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      )
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleMediaQueryChange = e => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    // Don't show cursor on touch devices or if reduced motion is preferred
    if (isTouchDevice() || mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange)
      }
    }

    setIsVisible(true)

    const moveCursor = e => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Track interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    )

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', moveCursor)

    // Hide native cursor
    document.body.style.cursor = 'none'
    const allElements = document.querySelectorAll('*')
    allElements.forEach(el => {
      el.style.cursor = 'none'
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      mediaQuery.removeEventListener('change', handleMediaQueryChange)

      // Restore native cursor
      document.body.style.cursor = 'auto'
      allElements.forEach(el => {
        el.style.cursor = 'auto'
      })
    }
  }, [cursorX, cursorY])

  if (!isVisible || prefersReducedMotion) {
    return null
  }

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          borderRadius: '50%',
          border: '2px solid #88ccca',
          pointerEvents: 'none',
          zIndex: 9999,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          borderRadius: '50%',
          backgroundColor: '#88ccca',
          pointerEvents: 'none',
          zIndex: 9999,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </>
  )
}

export default CustomCursor
