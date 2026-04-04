import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * SmoothScroll - Wrapper component that provides smooth scrolling via Lenis
 * Integrates with GSAP ScrollTrigger for synchronized animations
 */
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Skip smooth scroll for users who prefer reduced motion
      return
    }

    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update)

    // Add Lenis to GSAP ticker for smooth animation
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000)
    })

    // Disable lag smoothing for smoother animations
    gsap.ticker.lagSmoothing(0)

    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const id = target.getAttribute('href').slice(1)
        const element = document.getElementById(id)
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element, { offset: -100 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(lenisRef.current?.raf)
      lenisRef.current?.destroy()
    }
  }, [])

  // Expose scroll methods via context or ref if needed
  return <>{children}</>
}

/**
 * Hook to access Lenis instance for programmatic scroll control
 * Usage: const { scrollTo, stop, start } = useSmoothScroll()
 */
export const useSmoothScroll = () => {
  const scrollTo = (target, options = {}) => {
    if (typeof window === 'undefined') return

    const lenis = window.__lenis
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        ...options
      })
    } else {
      // Fallback for when Lenis isn't available
      if (typeof target === 'string') {
        const element = document.querySelector(target)
        element?.scrollIntoView({ behavior: 'smooth' })
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      }
    }
  }

  const stop = () => {
    window.__lenis?.stop()
  }

  const start = () => {
    window.__lenis?.start()
  }

  return { scrollTo, stop, start }
}

export default SmoothScroll
