import { useState, useEffect, useCallback } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
  VStack,
  CloseButton,
  Link,
  Text,
  VisuallyHidden
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { IoLogoGithub } from 'react-icons/io5'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ThemeToggleButton from './theme-toggle-button'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

const NavLink = ({ href, path, target, children, onClick, ariaLabel, ...props }) => {
  const active = path === href
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const activeColor = useColorModeValue('neutral.900', 'neutral.50')
  const mutedColor = useColorModeValue('neutral.600', 'neutral.400')

  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      target={target}
      onClick={onClick}
      position="relative"
      px={3}
      py={2}
      fontSize="sm"
      fontFamily="mono"
      fontWeight="400"
      letterSpacing="wide"
      color={active ? activeColor : mutedColor}
      textDecoration="none"
      transition="all 0.2s ease"
      aria-current={active ? 'page' : undefined}
      aria-label={ariaLabel}
      _hover={{
        color: textColor,
        textDecoration: 'none'
      }}
      _focus={{
        outline: '2px solid',
        outlineColor: 'primary.500',
        outlineOffset: '2px'
      }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'primary.500',
        outlineOffset: '2px'
      }}
      {...props}
    >
      {children}
      {active && (
        <Box
          position="absolute"
          bottom="-2px"
          left="10%"
          right="10%"
          height="1px"
          bg="primary.500"
          aria-hidden="true"
        />
      )}
    </Link>
  )
}

const Navbar = ({ path }) => {
  const [scrolled, setScrolled] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const prefersReducedMotion = useReducedMotion()

  const bgColor = useColorModeValue('neutral.50', 'neutral.950')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const bgScrolled = useColorModeValue(
    'rgba(250, 250, 250, 0.92)',
    'rgba(13, 17, 23, 0.92)'
  )
  const borderColor = useColorModeValue('neutral.200', 'neutral.800')
  const focusRingColor = useColorModeValue('primary.600', 'primary.400')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle escape key to close mobile menu
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      onClose()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navLinks = [
    { href: '/', label: 'home', ariaLabel: 'Go to homepage' },
    { href: '/projects', label: 'work', ariaLabel: 'View my projects' },
    { href: '/contact', label: 'contact', ariaLabel: 'Get in touch' }
  ]

  return (
    <>
      <MotionBox
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        px={{ base: 4, md: 8 }}
        py={scrolled ? 2 : 4}
        initial={{ y: prefersReducedMotion ? 0 : -100 }}
        animate={{ y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transition: 'padding 0.3s ease' }}
      >
        <MotionFlex
          as="nav"
          role="navigation"
          aria-label="Main navigation"
          maxW="1400px"
          mx="auto"
          align="center"
          justify="space-between"
          px={scrolled ? 4 : 0}
          py={scrolled ? 2 : 0}
          bg={scrolled ? bgScrolled : 'transparent'}
          backdropFilter={scrolled ? 'blur(10px)' : 'none'}
          borderRadius="none"
          border={scrolled ? '3px solid' : 'none'}
          borderColor={scrolled ? borderColor : 'transparent'}
          style={{ transition: 'all 0.3s ease' }}
        >
          {/* Logo */}
          <Link
            as={NextLink}
            href="/"
            fontFamily="mono"
            fontWeight="400"
            fontSize="md"
            color={textColor}
            _hover={{
              textDecoration: 'none',
              color: 'primary.500'
            }}
            _focus={{
              outline: '2px solid',
              outlineColor: 'primary.500',
              outlineOffset: '2px'
            }}
            transition="all 0.2s ease"
            px={2}
            aria-label="Aryan Kumar - Go to homepage"
          >
            <Box as="span" color="primary.500">~/</Box>
            <Box as="span">ak</Box>
            <VisuallyHidden>Aryan Kumar</VisuallyHidden>
          </Link>

          {/* Desktop Navigation */}
          <HStack
            as="ul"
            spacing={1}
            display={{ base: 'none', md: 'flex' }}
            listStyleType="none"
          >
            {navLinks.map((link) => (
              <Box as="li" key={link.href}>
                <NavLink href={link.href} path={path} ariaLabel={link.ariaLabel}>
                  {link.label}
                </NavLink>
              </Box>
            ))}
            <Box as="li">
              <NavLink
                href="https://github.com/akumar23/aryankumar.io"
                target="_blank"
                path={path}
                display="inline-flex"
                alignItems="center"
                gap={1}
                ariaLabel="View source code on GitHub (opens in new tab)"
              >
                <IoLogoGithub aria-hidden="true" />
                Source
              </NavLink>
            </Box>
          </HStack>

          {/* Right side controls */}
          <HStack spacing={2}>
            <ThemeToggleButton />

            {/* Mobile menu button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
              icon={<HamburgerIcon />}
              variant="ghost"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              size="sm"
              color={textColor}
              borderRadius="md"
              _hover={{
                bg: useColorModeValue('neutral.100', 'neutral.800')
              }}
              _focus={{
                outline: '2px solid',
                outlineColor: 'primary.500',
                outlineOffset: '2px'
              }}
            />
          </HStack>
        </MotionFlex>
      </MotionBox>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            position="fixed"
            inset={0}
            zIndex={200}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <Box
              position="absolute"
              inset={0}
              bg="blackAlpha.600"
              backdropFilter="blur(10px)"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <MotionBox
              position="absolute"
              top={0}
              right={0}
              bottom={0}
              w={{ base: 'full', sm: '300px' }}
              bg={useColorModeValue('white', 'neutral.900')}
              p={6}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Flex justify="space-between" align="center" mb={8}>
                <Box
                  fontFamily="mono"
                  fontWeight="400"
                  fontSize="sm"
                  color={useColorModeValue('neutral.500', 'neutral.500')}
                  id="mobile-menu-title"
                >
                  navigation
                </Box>
                <CloseButton
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  size="lg"
                  _focus={{
                    outline: '2px solid',
                    outlineColor: 'primary.500',
                    outlineOffset: '2px'
                  }}
                  _hover={{
                    bg: 'transparent',
                    color: 'primary.500'
                  }}
                />
              </Flex>

              <VStack
                as="nav"
                aria-label="Mobile navigation"
                align="stretch"
                spacing={2}
              >
                <Box as="ul" listStyleType="none">
                  {navLinks.map((link, index) => (
                    <MotionBox
                      as="li"
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        as={NextLink}
                        href={link.href}
                        onClick={onClose}
                        display="block"
                        py={4}
                        px={3}
                        fontSize="md"
                        fontFamily="mono"
                        fontWeight="400"
                        letterSpacing="wide"
                        borderBottom="1px solid"
                        borderColor={useColorModeValue('neutral.200', 'neutral.800')}
                        aria-current={path === link.href ? 'page' : undefined}
                        color={path === link.href
                          ? useColorModeValue('neutral.900', 'neutral.50')
                          : useColorModeValue('neutral.600', 'neutral.400')}
                        _hover={{
                          color: useColorModeValue('neutral.900', 'neutral.50'),
                          pl: 5
                        }}
                        _focus={{
                          outline: '2px solid',
                          outlineColor: 'primary.500',
                          outlineOffset: '2px'
                        }}
                        transition="all 0.2s ease"
                      >
                        {link.label}
                      </Link>
                    </MotionBox>
                  ))}

                  <MotionBox
                    as="li"
                    initial={{ opacity: 0, x: 20, rotate: -2 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <Link
                      href="https://github.com/akumar23/aryankumar.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      py={4}
                      px={3}
                      fontSize="md"
                      fontFamily="mono"
                      fontWeight="400"
                      letterSpacing="wide"
                      color={useColorModeValue('neutral.600', 'neutral.400')}
                      _hover={{
                        color: useColorModeValue('neutral.900', 'neutral.50'),
                        pl: 5
                      }}
                      _focus={{
                        outline: '2px solid',
                        outlineColor: 'primary.500',
                        outlineOffset: '2px'
                      }}
                      transition="all 0.2s ease"
                    >
                      <IoLogoGithub aria-hidden="true" />
                      Source
                      <VisuallyHidden>(opens in new tab)</VisuallyHidden>
                    </Link>
                  </MotionBox>
                </Box>
              </VStack>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
