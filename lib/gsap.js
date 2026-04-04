import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins (client-side only)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Default ease curves
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8
})

// Custom ease definitions
const customEases = {
  // Smooth, elegant ease for most animations
  smooth: 'power3.out',
  // Snappy feel for quick interactions
  snappy: 'power2.out',
  // Bounce effect for playful interactions
  bounce: 'elastic.out(1, 0.3)',
  // Slow start for dramatic reveals
  dramatic: 'power4.out',
  // Linear for continuous animations
  linear: 'none'
}

// Animation presets for common patterns
const animationPresets = {
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 }
  },
  fadeDown: {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0 }
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  fadeLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 }
  },
  fadeRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 }
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 }
  },
  scaleDown: {
    from: { opacity: 0, scale: 1.1 },
    to: { opacity: 1, scale: 1 }
  },
  rotateIn: {
    from: { opacity: 0, rotation: -10, y: 30 },
    to: { opacity: 1, rotation: 0, y: 0 }
  }
}

// Animation timing reference
const timings = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2
}

// Stagger presets
const staggerPresets = {
  fast: 0.02,
  normal: 0.05,
  slow: 0.1,
  text: 0.015  // For character-by-character text animations
}

// ScrollTrigger defaults
const scrollTriggerDefaults = {
  start: 'top 85%',
  end: 'bottom 15%',
  toggleActions: 'play none none reverse'
}

// Utility function to check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Utility to create scroll-triggered animation
const createScrollAnimation = (element, animation = 'fadeUp', options = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(element, animationPresets[animation]?.to || { opacity: 1 })
    return null
  }

  const preset = animationPresets[animation] || animationPresets.fadeUp
  const { duration = timings.normal, delay = 0, ease = customEases.smooth, ...scrollOptions } = options

  gsap.set(element, preset.from)

  return gsap.to(element, {
    ...preset.to,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: element,
      ...scrollTriggerDefaults,
      ...scrollOptions
    }
  })
}

// Utility to create staggered animation for multiple elements
const createStaggerAnimation = (elements, animation = 'fadeUp', options = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(elements, animationPresets[animation]?.to || { opacity: 1 })
    return null
  }

  const preset = animationPresets[animation] || animationPresets.fadeUp
  const {
    duration = timings.normal,
    stagger = staggerPresets.normal,
    ease = customEases.smooth,
    ...scrollOptions
  } = options

  gsap.set(elements, preset.from)

  return gsap.to(elements, {
    ...preset.to,
    duration,
    stagger,
    ease,
    scrollTrigger: scrollOptions.trigger ? {
      trigger: scrollOptions.trigger,
      ...scrollTriggerDefaults,
      ...scrollOptions
    } : undefined
  })
}

// Kill all ScrollTriggers (useful for cleanup)
const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// Refresh ScrollTrigger (useful after DOM changes)
const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

export {
  gsap,
  ScrollTrigger,
  customEases,
  animationPresets,
  timings,
  staggerPresets,
  scrollTriggerDefaults,
  prefersReducedMotion,
  createScrollAnimation,
  createStaggerAnimation,
  killAllScrollTriggers,
  refreshScrollTrigger
}
