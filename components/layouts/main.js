import Head from 'next/head'
import { Box, VisuallyHidden, Link as ChakraLink, useColorModeValue } from '@chakra-ui/react'
import NavBar from '../navbar'
import Footer from '../footer'

// Skip to main content link for accessibility
const SkipLink = () => {
  const bg = useColorModeValue('primary.500', 'primary.400')

  return (
    <ChakraLink
      href="#main-content"
      position="fixed"
      top="-100px"
      left="50%"
      transform="translateX(-50%)"
      bg={bg}
      color="white"
      px={4}
      py={2}
      borderRadius="md"
      fontWeight="600"
      fontSize="sm"
      zIndex={10001}
      _focus={{
        top: '20px',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.5)'
      }}
      transition="top 0.2s ease"
    >
      Skip to main content
    </ChakraLink>
  )
}

const Main = ({ children, router }) => {
  const currentPath = router.asPath
  const isHome = currentPath === '/'

  // Dynamic page title based on route
  const getPageTitle = () => {
    switch (currentPath) {
      case '/':
        return 'Aryan Kumar | Software Engineer'
      case '/projects':
        return 'Work | Aryan Kumar'
      case '/lab':
        return 'Lab | Aryan Kumar'
      case '/contact':
        return 'Contact | Aryan Kumar'
      default:
        return 'Aryan Kumar | Software Engineer'
    }
  }

  // Dynamic description based on route
  const getPageDescription = () => {
    switch (currentPath) {
      case '/':
        return 'Aryan Kumar — Software engineer specializing in AI infrastructure, Kubernetes, and full-stack systems.'
      case '/projects':
        return 'Projects by Aryan Kumar spanning AI/ML, full-stack development, and cloud infrastructure.'
      case '/lab':
        return 'Live apps and experiments by Aryan Kumar.'
      case '/contact':
        return 'Get in touch with Aryan Kumar for collaboration or opportunities.'
      default:
        return 'Aryan Kumar — Software engineer specializing in AI infrastructure and full-stack systems.'
    }
  }

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content={getPageDescription()} />
        <meta name="author" content="Aryan Kumar" />
        <meta name="keywords" content="Aryan Kumar, software engineer, full-stack developer, AI, machine learning, React, Next.js, Python, TypeScript" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="color-scheme" content="light dark" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://aryankumar.io${currentPath}`} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:site_name" content="Aryan Kumar" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://aryankumar.io${currentPath}`} />

        <title>{getPageTitle()}</title>
      </Head>

      {/* Skip navigation link for keyboard users */}
      <SkipLink />

      {/* Navigation */}
      <NavBar path={currentPath} />

      {/* Main content area */}
      <Box
        as="main"
        id="main-content"
        role="main"
        aria-label="Main content"
        flex="1"
        pt={{ base: 20, md: 24 }}
        position="relative"
        tabIndex={-1}
        outline="none"
      >
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default Main
