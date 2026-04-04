import { useEffect, useState, useRef, useCallback } from 'react'
import { gsap } from '../lib/gsap'

/**
 * CustomCursor - Enhanced cursor with multiple states and GSAP animations
 *
 * States:
 * - default: Standard cursor
 * - hover: Expanded ring on interactive elements
 * - text: Smaller cursor with "drag" indicator for text
 * - hidden: Hide cursor for custom interactions
 *
 * Data attributes for custom states:
 * - data-cursor-hover: Trigger hover state
 * - data-cursor-text="Label": Show text label
 * - data-cursor-hidden: Hide cursor
 * - data-cursor-stick: Stick cursor to element center
 */
const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorState, setCursorState] = useState('default')
  const [cursorText, setCursorText] = useState('')

  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorTextRef = useRef(null)
  const positionRef = useRef({ x: -100, y: -100 })
  const stickTargetRef = useRef(null)

  // Playful theme colors
  const primaryColor = '#1A1A1A' // Ink
  const accentColor = '#E54B4B' // Coral

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
    if (isTouchDevice() || mediaQuery.matches) {
      return
    }

    setIsVisible(true)

    // Hide native cursor
    document.body.style.cursor = 'none'

    const moveCursor = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY }

      // If sticking to an element, move to its center
      if (stickTargetRef.current) {
        const rect = stickTargetRef.current.getBoundingClientRect()
        const targetX = rect.left + rect.width / 2
        const targetY = rect.top + rect.height / 2

        gsap.to(cursorRef.current, {
          x: targetX,
          y: targetY,
          duration: 0.15,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          x: targetX,
          y: targetY,
          duration: 0.1,
          ease: 'power2.out'
        })
      } else {
        // Normal cursor following
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power3.out'
        })
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseEnter = (e) => {
      const target = e.target

      // Check for cursor states via data attributes
      if (target.hasAttribute('data-cursor-hidden')) {
        setCursorState('hidden')
        return
      }

      if (target.hasAttribute('data-cursor-text')) {
        setCursorState('text')
        setCursorText(target.getAttribute('data-cursor-text'))
        return
      }

      if (target.hasAttribute('data-cursor-stick')) {
        stickTargetRef.current = target
      }

      // Check for interactive elements
      if (
        target.matches('a, button, [role="button"], input, textarea, select, [data-cursor-hover]') ||
        target.closest('a, button, [role="button"]')
      ) {
        setCursorState('hover')
      }
    }

    const handleMouseLeave = (e) => {
      setCursorState('default')
      setCursorText('')
      stickTargetRef.current = null
    }

    const handleMouseDown = () => {
      if (cursorState !== 'hidden') {
        gsap.to(cursorRef.current, {
          scale: 0.8,
          duration: 0.15,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          scale: 0.5,
          duration: 0.15,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseUp = () => {
      if (cursorState !== 'hidden') {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        })
        gsap.to(cursorDotRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        })
      }
    }

    // Use event delegation for better performance
    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    // Initial position off-screen
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { x: -100, y: -100 })
    }
    if (cursorDotRef.current) {
      gsap.set(cursorDotRef.current, { x: -100, y: -100 })
    }

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      document.body.style.cursor = 'auto'
    }
  }, [cursorState])

  // Animate cursor state changes
  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return

    switch (cursorState) {
      case 'hover':
        gsap.to(cursorRef.current, {
          width: 50,
          height: 50,
          borderColor: accentColor,
          opacity: 0.7,
          rotation: 10,
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          width: 10,
          height: 10,
          backgroundColor: accentColor,
          rotation: 90,
          duration: 0.3,
          ease: 'power2.out'
        })
        break

      case 'text':
        gsap.to(cursorRef.current, {
          width: 100,
          height: 100,
          borderColor: accentColor,
          opacity: 0.8,
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          width: 0,
          height: 0,
          duration: 0.2,
          ease: 'power2.out'
        })
        if (cursorTextRef.current) {
          gsap.to(cursorTextRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
        }
        break

      case 'hidden':
        gsap.to(cursorRef.current, {
          width: 0,
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          width: 0,
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out'
        })
        break

      default: // 'default'
        gsap.to(cursorRef.current, {
          width: 32,
          height: 32,
          borderColor: primaryColor,
          opacity: 0.7,
          rotation: -5,
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          width: 8,
          height: 8,
          backgroundColor: accentColor,
          rotation: 45,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
        if (cursorTextRef.current) {
          gsap.to(cursorTextRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: 'power2.out'
          })
        }
    }
  }, [cursorState])

  if (!isVisible) {
    return null
  }

  return (
    <>
      {/* Outer ring - playful wobbly circle */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          borderRadius: '60% 40% 50% 45%',
          border: `3px solid ${primaryColor}`,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%) rotate(-5deg)',
          mixBlendMode: 'difference',
          willChange: 'transform, width, height',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Text label for text state */}
        <span
          ref={cursorTextRef}
          style={{
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: "'Caveat', cursive",
            letterSpacing: '0.05em',
            color: accentColor,
            opacity: 0,
            transform: 'scale(0.5)',
            whiteSpace: 'nowrap'
          }}
        >
          {cursorText}
        </span>
      </div>

      {/* Inner dot - playful square */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          borderRadius: '2px',
          backgroundColor: accentColor,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%) rotate(45deg)',
          mixBlendMode: 'difference',
          willChange: 'transform, width, height'
        }}
      />

      {/* Global styles to hide cursor on interactive elements */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        /* Show default cursor as fallback on touch devices */
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
