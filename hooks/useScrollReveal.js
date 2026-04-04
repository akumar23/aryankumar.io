import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion, animationPresets, timings } from '../lib/gsap'

/**
 * useScrollReveal - Hook for scroll-triggered reveal animations
 *
 * @param {Object} options
 * @param {string} options.animation - Animation preset: 'fadeUp', 'fadeIn', 'fadeLeft', 'fadeRight', 'scaleUp'
 * @param {number} options.delay - Animation delay in seconds
 * @param {number} options.duration - Animation duration in seconds
 * @param {string} options.start - ScrollTrigger start position (default: 'top 85%')
 * @param {string} options.ease - GSAP ease function
 * @param {boolean} options.once - Only play animation once (default: false)
 * @param {function} options.onEnter - Callback when element enters viewport
 * @param {function} options.onLeave - Callback when element leaves viewport
 *
 * @returns {React.RefObject} - Ref to attach to the element
 *
 * @example
 * const MyComponent = () => {
 *   const ref = useScrollReveal({ animation: 'fadeUp', delay: 0.2 })
 *   return <div ref={ref}>Content</div>
 * }
 */
export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null)

  const {
    animation = 'fadeUp',
    delay = 0,
    duration = timings.slow,
    start = 'top 85%',
    end = 'bottom 15%',
    ease = 'power3.out',
    once = false,
    onEnter,
    onLeave
  } = options

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    // Handle reduced motion preference
    if (prefersReducedMotion()) {
      // Set final state immediately
      const preset = animationPresets[animation] || animationPresets.fadeUp
      gsap.set(element, preset.to)
      return
    }

    // Get animation preset
    const preset = animationPresets[animation] || animationPresets.fadeUp

    // Set initial state
    gsap.set(element, preset.from)

    // Create animation
    const tween = gsap.to(element, {
      ...preset.to,
      duration,
      delay,
      ease,
      paused: true
    })

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      onEnter: () => {
        tween.play()
        onEnter?.()
      },
      onLeaveBack: () => {
        if (!once) {
          tween.reverse()
        }
      },
      onLeave: () => {
        onLeave?.()
      },
      once
    })

    // Cleanup
    return () => {
      tween.kill()
      scrollTrigger.kill()
    }
  }, [animation, delay, duration, start, end, ease, once, onEnter, onLeave])

  return elementRef
}

/**
 * useStaggerReveal - Hook for staggered reveal of multiple elements
 *
 * @param {Object} options
 * @param {string} options.animation - Animation preset
 * @param {number} options.stagger - Stagger delay between elements
 * @param {string} options.childSelector - CSS selector for child elements to animate
 *
 * @returns {React.RefObject} - Ref to attach to the container element
 */
export const useStaggerReveal = (options = {}) => {
  const containerRef = useRef(null)

  const {
    animation = 'fadeUp',
    stagger = 0.1,
    duration = timings.slow,
    start = 'top 85%',
    ease = 'power3.out',
    childSelector = '> *',
    once = false
  } = options

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const children = container.querySelectorAll(childSelector)

    if (children.length === 0) return

    // Handle reduced motion
    if (prefersReducedMotion()) {
      const preset = animationPresets[animation] || animationPresets.fadeUp
      gsap.set(children, preset.to)
      return
    }

    const preset = animationPresets[animation] || animationPresets.fadeUp

    // Set initial state
    gsap.set(children, preset.from)

    // Create staggered animation
    const tween = gsap.to(children, {
      ...preset.to,
      duration,
      ease,
      stagger,
      paused: true
    })

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start,
      onEnter: () => tween.play(),
      onLeaveBack: () => {
        if (!once) {
          tween.reverse()
        }
      },
      once
    })

    return () => {
      tween.kill()
      scrollTrigger.kill()
    }
  }, [animation, stagger, duration, start, ease, childSelector, once])

  return containerRef
}

/**
 * useParallax - Hook for parallax scrolling effects
 *
 * @param {Object} options
 * @param {number} options.speed - Parallax speed multiplier (negative = opposite direction)
 * @param {string} options.direction - 'vertical' or 'horizontal'
 *
 * @returns {React.RefObject}
 */
export const useParallax = (options = {}) => {
  const elementRef = useRef(null)

  const {
    speed = 0.5,
    direction = 'vertical'
  } = options

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion()) return

    const element = elementRef.current
    const property = direction === 'vertical' ? 'y' : 'x'

    gsap.to(element, {
      [property]: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill()
      })
    }
  }, [speed, direction])

  return elementRef
}

/**
 * useScrollProgress - Hook to track scroll progress within an element
 *
 * @param {Object} options
 * @param {function} options.onProgress - Callback with progress value (0-1)
 *
 * @returns {React.RefObject}
 */
export const useScrollProgress = (options = {}) => {
  const elementRef = useRef(null)

  const { onProgress } = options

  useEffect(() => {
    if (!elementRef.current || !onProgress) return

    const element = elementRef.current

    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        onProgress(self.progress)
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill()
      })
    }
  }, [onProgress])

  return elementRef
}

export default useScrollReveal
