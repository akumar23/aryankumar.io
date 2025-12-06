import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Box } from '@chakra-ui/react'

const NoiseOverlay = ({ opacity = 0.04, withScrollHue = false }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = e => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const hueRotate = withScrollHue && !prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], [0, 15])
    : useTransform(scrollYProgress, [0, 1], [0, 0])

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity,
          mixBlendMode: 'overlay',
          filter: useTransform(
            hueRotate,
            value => `hue-rotate(${value}deg)`
          ),
          willChange: withScrollHue && !prefersReducedMotion ? 'filter' : 'auto'
        }}
      >
        <Box
          w="100%"
          h="100%"
          style={{
            filter: 'url(#noise-filter)',
            backgroundSize: '200px 200px'
          }}
        />
      </motion.div>
    </>
  )
}

export default NoiseOverlay
