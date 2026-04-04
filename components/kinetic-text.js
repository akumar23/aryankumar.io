import { useRef, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

/**
 * KineticText - Text that animates character by character
 * Inspired by Adrien Lamy's text reveal effects
 *
 * @param {string} children - The text content to animate
 * @param {string} as - HTML tag to render (default: 'span')
 * @param {string} animation - Animation type: 'slideUp', 'fadeIn', 'wave', 'blur'
 * @param {string} trigger - Trigger type: 'scroll', 'load', 'inView'
 * @param {number} stagger - Stagger delay between characters (default: 0.02)
 * @param {number} duration - Animation duration (default: 0.6)
 * @param {string} ease - GSAP ease (default: 'power3.out')
 * @param {number} delay - Initial delay before animation starts
 * @param {boolean} splitWords - Split by words instead of characters
 */
const KineticText = ({
  children,
  as = 'span',
  animation = 'slideUp',
  trigger = 'scroll',
  stagger = 0.02,
  duration = 0.6,
  ease = 'power3.out',
  delay = 0,
  splitWords = false,
  className = '',
  ...props
}) => {
  const containerRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const elementsRef = useRef([])

  useEffect(() => {
    if (!containerRef.current || typeof children !== 'string') return

    // Handle reduced motion
    if (prefersReducedMotion()) {
      setIsReady(true)
      return
    }

    const text = children
    const container = containerRef.current

    // Clear container and create split elements
    container.innerHTML = ''
    elementsRef.current = []

    const items = splitWords ? text.split(' ') : text.split('')

    items.forEach((item, index) => {
      const span = document.createElement('span')
      span.textContent = item
      span.style.display = 'inline-block'
      span.style.willChange = 'transform, opacity'

      // Preserve spaces for word splitting
      if (splitWords && index < items.length - 1) {
        span.textContent = item + ' '
      }

      // Handle whitespace for character splitting
      if (!splitWords && item === ' ') {
        span.innerHTML = '&nbsp;'
      }

      container.appendChild(span)
      elementsRef.current.push(span)
    })

    // Animation configurations
    const animations = {
      slideUp: {
        from: {
          opacity: 0,
          y: '100%',
          rotateX: -80
        },
        to: {
          opacity: 1,
          y: '0%',
          rotateX: 0
        }
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      wave: {
        from: {
          opacity: 0,
          y: 20,
          scale: 0.8
        },
        to: {
          opacity: 1,
          y: 0,
          scale: 1
        }
      },
      blur: {
        from: {
          opacity: 0,
          filter: 'blur(10px)',
          y: 10
        },
        to: {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0
        }
      }
    }

    const config = animations[animation] || animations.slideUp

    // Set initial state
    gsap.set(elementsRef.current, {
      ...config.from,
      transformOrigin: 'center bottom',
      transformPerspective: 1000
    })

    // Create animation timeline
    const tl = gsap.timeline({
      paused: trigger !== 'load',
      delay,
      onComplete: () => setIsReady(true)
    })

    tl.to(elementsRef.current, {
      ...config.to,
      duration,
      ease,
      stagger: {
        each: stagger,
        from: 'start'
      }
    })

    // Handle different triggers
    if (trigger === 'scroll' || trigger === 'inView') {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => tl.play(),
        onLeaveBack: () => {
          if (trigger === 'scroll') {
            tl.reverse()
          }
        }
      })
    } else if (trigger === 'load') {
      tl.play()
    }

    setIsReady(true)

    // Cleanup
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill()
      })
    }
  }, [children, animation, trigger, stagger, duration, ease, delay, splitWords])

  // Render with appropriate element
  const Component = Box

  return (
    <Component
      ref={containerRef}
      as={as}
      className={`kinetic-text ${className}`}
      display="inline-block"
      overflow="hidden"
      sx={{
        perspective: '1000px',
        '& > span': {
          display: 'inline-block'
        }
      }}
      {...props}
    >
      {/* Text will be replaced by JavaScript, but show initially for SSR/SEO */}
      {!isReady && children}
    </Component>
  )
}

/**
 * KineticHeading - Convenience component for animated headings
 */
export const KineticHeading = ({ children, level = 1, ...props }) => {
  const headingTag = `h${Math.min(Math.max(level, 1), 6)}`
  return (
    <KineticText as={headingTag} splitWords animation="slideUp" {...props}>
      {children}
    </KineticText>
  )
}

/**
 * KineticParagraph - Convenience component for animated paragraphs
 */
export const KineticParagraph = ({ children, ...props }) => {
  return (
    <KineticText as="p" animation="fadeIn" stagger={0.01} {...props}>
      {children}
    </KineticText>
  )
}

export default KineticText
