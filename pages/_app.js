import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence, motion } from 'framer-motion'
import Chakra from '../components/chakra'
import CustomCursor from '../components/custom-cursor'
import NoiseOverlay from '../components/noise-overlay'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

function Website({ Component, pageProps, router }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <CustomCursor />
      <NoiseOverlay opacity={0.04} withScrollHue={false} />
      <Layout router={router}>
        <AnimatePresence
          mode="wait"
          initial={true}
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
            style={{ willChange: 'opacity, transform, filter' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </Chakra>
  )
}

export default Website
