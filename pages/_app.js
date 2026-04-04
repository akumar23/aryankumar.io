import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence, motion } from 'framer-motion'
import Chakra from '../components/chakra'
import CustomCursor from '../components/custom-cursor'
import NoiseOverlay from '../components/noise-overlay'
import LiveCursors from '../components/LiveCursors'
import SmoothScroll from '../components/smooth-scroll'
import PageLoader from '../components/page-loader'
import { TransitionCurtain, PageTransitionProvider } from '../components/page-transition'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

// NDS-inspired refined page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1 // Slight delay to let curtain exit start
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

function Website({ Component, pageProps, router }) {
  const [isFirstMount, setIsFirstMount] = useState(true)
  const nextRouter = useRouter()

  useEffect(() => {
    // After first mount, disable initial animation
    const timer = setTimeout(() => setIsFirstMount(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Handle route change scroll reset
  useEffect(() => {
    const handleRouteChange = () => {
      // Scroll to top on route change
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }

    nextRouter.events.on('routeChangeComplete', handleRouteChange)
    return () => nextRouter.events.off('routeChangeComplete', handleRouteChange)
  }, [nextRouter])

  return (
    <Chakra cookies={pageProps.cookies}>
      <PageTransitionProvider>
        <Fonts />
        <PageLoader finishDelay={200} />
        {/* NDS-inspired curtain transition */}
        <TransitionCurtain />
        <SmoothScroll>
          <CustomCursor />
          <NoiseOverlay opacity={0.025} withScrollHue={false} />
          <LiveCursors>
            <Layout router={router}>
              <AnimatePresence
                mode="wait"
                initial={isFirstMount}
                onExitComplete={() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0 })
                  }
                }}
              >
                <motion.div
                  key={router.route}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <Component {...pageProps} />
                </motion.div>
              </AnimatePresence>
            </Layout>
          </LiveCursors>
        </SmoothScroll>
      </PageTransitionProvider>
    </Chakra>
  )
}

export default Website
