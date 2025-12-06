import {
    Container,
    Heading,
    Box,
    Button,
    useColorModeValue,
    VStack,
    HStack,
    Text,
    useClipboard,
    useToast,
    IconButton,
    Tooltip
  } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoLogoGithub, IoLogoLinkedin, IoMail, IoCopy } from 'react-icons/io5'
import Section from '../components/section'
import MagneticButton from '../components/magnetic-button'
import SpotlightCard from '../components/spotlight-card'
import StarfieldBackground from '../components/starfield-bg'
import {
  WelcomeBanner,
  AnimatedDivider,
  BeveledContainer,
  NeonGlowText,
  BlinkingText,
  RetroEmailLink,
  BestViewedBadge
} from '../components/retro-decorations'
import '../styles/Home.module.css'

const MotionBox = motion(Box)

const Contact = () => {
  const email = 'kumar.aryan@gmail.com'
  const { onCopy, hasCopied } = useClipboard(email)
  const toast = useToast()

  const handleCopyEmail = () => {
    onCopy()
    toast({
      title: 'Email copied!',
      description: 'The email address has been copied to your clipboard.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    })
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: IoLogoGithub,
      url: 'https://github.com/kumararyan22',
      color: useColorModeValue('#24292e', '#ffffff')
    },
    {
      name: 'LinkedIn',
      icon: IoLogoLinkedin,
      url: 'https://www.linkedin.com/in/aryan-kumar-9640b4150/',
      color: '#0077b5'
    },
    {
      name: 'Email',
      icon: IoMail,
      url: `mailto:${email}`,
      color: '#EA4335'
    }
  ]

  return (
    <>
      <StarfieldBackground />
      <Container maxW="container.md" position="relative" zIndex={1}>
        <WelcomeBanner title="📧 GET IN TOUCH 📧" />

        <AnimatedDivider />

        <Section delay={0.1}>
          <BeveledContainer textAlign="center" mb={6}>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              mb={4}
            >
              <NeonGlowText color={useColorModeValue('#FF00FF', '#00FFFF')}>
                Let's build something together <BlinkingText>🚀</BlinkingText>
              </NeonGlowText>
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }}>
              Have a project in mind? I'd love to hear from you.
            </Text>
          </BeveledContainer>

          <AnimatedDivider />

          <Section delay={0.2}>
            <BeveledContainer
              p={8}
              bg={useColorModeValue('rgba(192,192,192,0.8)', 'rgba(64,64,64,0.8)')}
            >
              <VStack spacing={6}>
                <Heading as="h3" size="lg">
                  <NeonGlowText color={useColorModeValue('#FF1493', '#00FF00')}>
                    Email <BlinkingText>📬</BlinkingText>
                  </NeonGlowText>
                </Heading>
                <HStack spacing={2}>
                  <Text fontSize="xl" fontWeight="bold">
                    <RetroEmailLink email={email} />
                  </Text>
                </HStack>
                <MagneticButton
                  colorScheme="teal"
                  size="lg"
                  onClick={handleCopyEmail}
                  leftIcon={<IoCopy />}
                >
                  {hasCopied ? '✓ Copied!' : 'Copy Email'}
                </MagneticButton>
              </VStack>
            </BeveledContainer>
          </Section>

          <AnimatedDivider />

          <Section delay={0.3}>
            <BeveledContainer textAlign="center">
              <VStack spacing={6}>
                <Heading as="h3" size="lg">
                  <NeonGlowText color={useColorModeValue('#0000FF', '#FFFF00')}>
                    Connect with me <BlinkingText>🌐</BlinkingText>
                  </NeonGlowText>
                </Heading>
                <HStack spacing={6} justify="center">
                  {socialLinks.map((social, index) => (
                    <MotionBox
                      key={social.name}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: 'easeOut'
                      }}
                    >
                      <Tooltip label={social.name} placement="top">
                        <IconButton
                          as="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          icon={<social.icon size={32} />}
                          size="lg"
                          colorScheme="teal"
                          variant="solid"
                          borderRadius="0" // Square buttons
                          border="3px solid"
                          borderColor="#000000"
                          boxShadow="4px 4px 0px #000000"
                          _hover={{
                            bg: useColorModeValue('#FF00FF', '#00FFFF'),
                            transform: 'translate(2px, 2px)',
                            boxShadow: '2px 2px 0px #000000'
                          }}
                        />
                      </Tooltip>
                    </MotionBox>
                  ))}
                </HStack>
              </VStack>
            </BeveledContainer>
          </Section>

          <BestViewedBadge />
        </Section>
      </Container>
    </>
  )
}

export default Contact
export { getServerSideProps } from '../components/chakra'