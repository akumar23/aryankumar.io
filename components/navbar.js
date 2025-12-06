import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { IoLogoGithub } from 'react-icons/io5'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import ThemeToggleButton from './theme-toggle-button'

const MotionBox = motion(Box)

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('#0000FF', '#00FFFF')
  const activeBg = useColorModeValue('#FFFF00', '#FF00FF')
  const hoverBg = useColorModeValue('#FF1493', '#00FF00')

  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      px={3}
      py={2}
      borderRadius="0" // Square 90s style
      border="3px solid"
      borderColor={active ? '#000000' : 'transparent'}
      bg={active ? activeBg : 'transparent'}
      color={active ? '#000000' : inactiveColor}
      target={target}
      fontWeight="bold"
      textTransform="uppercase"
      textDecoration={active ? 'none' : 'underline'}
      boxShadow={active ? '3px 3px 0px #000000' : 'none'}
      _hover={{
        bg: hoverBg,
        color: '#000000',
        textDecoration: 'none',
        border: '3px solid #000000',
        boxShadow: '3px 3px 0px #000000',
        transform: 'translate(-1px, -1px)'
      }}
      transition="all 0.1s ease"
      {...props}
    >
      {children}
    </Link>
  )
}

const Navbar = props => {
  const { path } = props
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // 90s retro navbar background - silver/gray like Windows 95
  const bgDefault = useColorModeValue('rgba(192, 192, 192, 0.9)', 'rgba(64, 0, 128, 0.9)')
  const bgScrolled = useColorModeValue('rgba(192, 192, 192, 0.95)', 'rgba(64, 0, 128, 0.95)')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MotionBox
      position="fixed"
      as="nav"
      w="100%"
      bg={scrolled ? bgScrolled : bgDefault}
      border="0"
      borderBottom="4px ridge"
      borderColor={useColorModeValue('#808080', '#FF00FF')}
      zIndex={2}
      initial={{ y: prefersReducedMotion ? 0 : -100 }}
      animate={{ y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
      boxShadow={scrolled ? '0 6px 0px rgba(0,0,0,0.8)' : '0 4px 0px rgba(0,0,0,0.5)'}
      style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
      {...props}
    >
      <Container
        display="flex"
        p={scrolled ? 1.5 : 2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
        style={{ transition: 'padding 0.3s ease' }}
      >

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >

          <LinkItem href="/" path={path}>
            Home
          </LinkItem>
          <LinkItem href="/projects" path={path}>
            Projects
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://github.com/akumar23/aryankumar.io"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <IoLogoGithub />
            Source
          </LinkItem>
          <LinkItem href="/contact" path={path}>
            Contact Me
          </LinkItem>
        </Stack>

        <Box flex={1} align="right">
          
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem as={NextLink} href="/">Home</MenuItem>
                <MenuItem as={NextLink} href="/projects">Projects</MenuItem>
                <MenuItem
                  as={Link}
                  href="https://github.com/akumar23/aryankumar.io"
                >
                  Source
                </MenuItem>
                <MenuItem as={NextLink} href="/contact">Contact Me</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </MotionBox>
  )
}

export default Navbar