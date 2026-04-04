import { Box, Container, HStack, Link, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5'

const SocialLink = ({ href, icon, label, isExternal = true }) => {
  const focusRingColor = useColorModeValue('primary.500', 'primary.400')

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={`${label}${isExternal ? ' (opens in new tab)' : ''}`}
      color={useColorModeValue('neutral.500', 'neutral.500')}
      p={2}
      borderRadius="md"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      _hover={{
        color: 'primary.500',
        transform: 'translateY(-2px)'
      }}
      _focus={{
        outline: 'none',
        boxShadow: `0 0 0 2px ${focusRingColor}`
      }}
      _focusVisible={{
        outline: 'none',
        boxShadow: `0 0 0 2px ${focusRingColor}`
      }}
      transition="all 0.2s ease"
    >
      {icon}
      <VisuallyHidden>{label}</VisuallyHidden>
    </Link>
  )
}

const Footer = () => {
  const borderColor = useColorModeValue('neutral.200', 'neutral.800')
  const textColor = useColorModeValue('neutral.500', 'neutral.500')

  const currentYear = new Date().getFullYear()

  return (
    <Box
      as="footer"
      role="contentinfo"
      py={8}
      mt="auto"
      borderTop="1px solid"
      borderColor={borderColor}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Box
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          {/* Copyright */}
          <Text fontSize="sm" color={textColor}>
            <span aria-hidden="true">&copy;</span> {currentYear} Aryan Kumar. Built with{' '}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              color="primary.500"
              _hover={{ textDecoration: 'underline' }}
            >
              Next.js
              <VisuallyHidden> (opens in new tab)</VisuallyHidden>
            </Link>
          </Text>

          {/* Social Links */}
          <HStack
            as="nav"
            aria-label="Social media links"
            spacing={2}
          >
            <SocialLink
              href="https://github.com/akumar23"
              icon={<IoLogoGithub size={20} aria-hidden="true" />}
              label="GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/aryan-kumar-9640b4150/"
              icon={<IoLogoLinkedin size={20} aria-hidden="true" />}
              label="LinkedIn"
            />
            <SocialLink
              href="mailto:kumar.aryan@gmail.com"
              icon={<IoMail size={20} aria-hidden="true" />}
              label="Email"
              isExternal={false}
            />
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
