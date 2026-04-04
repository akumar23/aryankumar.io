import {
  Container,
  Heading,
  Box,
  VStack,
  HStack,
  Text,
  useClipboard,
  useToast,
  IconButton,
  Tooltip,
  useColorModeValue,
  Link,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoLogoGithub, IoLogoLinkedin, IoMail, IoCopy, IoCheckmark } from 'react-icons/io5'
import Section from '../components/section'
import SketchyButton from '../components/sketchy-button'
import { PlayfulLabel, Squiggle, Star, DoodlePerson, DoodleArrow } from '../components/illustrations'

const MotionBox = motion(Box)

// Playful Social Card
const SocialCard = ({ icon, name, url, description, index }) => {
  const cardBg = useColorModeValue('neutral.50', 'neutral.900')
  const borderColor = useColorModeValue('neutral.900', 'neutral.600')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        _hover={{ textDecoration: 'none' }}
      >
        <Box
          p={5}
          bg={cardBg}
          borderRadius="none"
          border="3px solid"
          borderColor={borderColor}
          transform={`rotate(${index % 2 === 0 ? -1 : 1}deg)`}
          boxShadow={useColorModeValue(
            '5px 5px 0 0 rgba(26, 26, 26, 0.15)',
            '5px 5px 0 0 rgba(245, 158, 11, 0.2)'
          )}
          _hover={{
            transform: `rotate(${index % 2 === 0 ? 1 : -1}deg) translateY(-4px) scale(1.02)`,
            boxShadow: useColorModeValue(
              '8px 8px 0 0 rgba(26, 26, 26, 0.2)',
              '8px 8px 0 0 rgba(245, 158, 11, 0.2)'
            )
          }}
          transition="all 0.2s ease"
        >
          <HStack spacing={4}>
            <Box
              p={3}
              border="2px dashed"
              borderColor={borderColor}
            >
              <Icon as={icon} boxSize={6} color="primary.500" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontWeight="400" fontFamily="heading" color={textColor}>
                {name}
              </Text>
              <Text fontSize="md" fontFamily="accent" color={useColorModeValue('neutral.600', 'neutral.400')}>
                {description}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Link>
    </MotionBox>
  )
}

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
      url: 'https://github.com/akumar23',
      description: '@akumar23'
    },
    {
      name: 'LinkedIn',
      icon: IoLogoLinkedin,
      url: 'https://www.linkedin.com/in/aryan-kumar-9640b4150/',
      description: 'Connect with me'
    }
  ]

  const heroBg = useColorModeValue('primary.500', 'neutral.950')
  const heroTextColor = useColorModeValue('neutral.900', 'neutral.50')
  const sectionBg = useColorModeValue('neutral.50', 'neutral.950')
  const cardBg = useColorModeValue('neutral.50', 'neutral.900')
  const borderColor = useColorModeValue('neutral.900', 'neutral.600')

  return (
    <Box minH="calc(100vh - 200px)">
      {/* Playful Hero Section */}
      <Box
        py={{ base: 16, md: 24 }}
        bg={heroBg}
        position="relative"
        overflow="hidden"
      >
        {/* Decorative elements */}
        <Box position="absolute" top="15%" left="8%" opacity={0.5}>
          <Star size={30} delay={0} />
        </Box>
        <Box position="absolute" bottom="20%" right="10%" opacity={0.3}>
          <DoodlePerson pose="wave" size={100} animated />
        </Box>

        <Container maxW="container.md" textAlign="center" position="relative" zIndex={2}>
          <VStack spacing={6}>
            <Box transform="rotate(-2deg)">
              <PlayfulLabel variant="outline" rotation={-2}>
                Say Hello!
              </PlayfulLabel>
            </Box>
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontFamily="display"
              fontWeight="400"
              color={heroTextColor}
              textTransform="uppercase"
              transform="rotate(-1deg)"
            >
              Let's Chat!
            </Heading>
            <Squiggle width="180px" height="15px" />
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={heroTextColor}
              maxW="500px"
              opacity={0.9}
            >
              Have a project in mind or just want to say hi? I'd love to hear from you!
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Email Section */}
      <Box py={{ base: 12, md: 16 }} bg={sectionBg}>
        <Container maxW="container.md">
          <Section>
            <Box
              p={{ base: 6, md: 10 }}
              bg={cardBg}
              borderRadius="none"
              border="3px solid"
              borderColor={borderColor}
              textAlign="center"
              transform="rotate(-0.5deg)"
              boxShadow={useColorModeValue(
                '8px 8px 0 0 rgba(26, 26, 26, 0.15)',
                '8px 8px 0 0 rgba(245, 158, 11, 0.2)'
              )}
            >
              <VStack spacing={6}>
                <Box
                  p={4}
                  border="3px dashed"
                  borderColor={borderColor}
                >
                  <Icon as={IoMail} boxSize={8} color="primary.500" />
                </Box>

                <VStack spacing={2}>
                  <Heading
                    as="h2"
                    size="lg"
                    fontFamily="heading"
                    fontWeight="400"
                  >
                    Email me directly
                  </Heading>
                  <Text fontFamily="accent" color={useColorModeValue('neutral.600', 'neutral.400')}>
                    I typically respond within 24 hours!
                  </Text>
                </VStack>

                <HStack spacing={3} flexWrap="wrap" justify="center">
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontWeight="bold"
                    fontFamily="accent"
                    color="primary.500"
                  >
                    {email}
                  </Text>
                  <Tooltip label={hasCopied ? 'Copied!' : 'Copy email'}>
                    <IconButton
                      icon={hasCopied ? <IoCheckmark /> : <IoCopy />}
                      onClick={handleCopyEmail}
                      variant="ghost"
                      colorScheme={hasCopied ? 'green' : 'gray'}
                      aria-label="Copy email"
                      size="sm"
                      borderRadius="none"
                      border="2px solid"
                      borderColor={borderColor}
                    />
                  </Tooltip>
                </HStack>

                <SketchyButton
                  as="a"
                  href={`mailto:${email}`}
                  size="lg"
                  variant="solid"
                  withArrow
                  arrowLabel="click!"
                >
                  <HStack>
                    <IoMail />
                    <Text>Send an Email</Text>
                  </HStack>
                </SketchyButton>
              </VStack>
            </Box>
          </Section>
        </Container>
      </Box>

      {/* Social Links Section */}
      <Box py={{ base: 12, md: 16 }} bg={useColorModeValue('primary.50', 'neutral.900')}>
        <Container maxW="container.md">
          <VStack spacing={8}>
            <VStack spacing={3} textAlign="center">
              <Heading
                as="h2"
                size="lg"
                fontFamily="heading"
                fontWeight="400"
                transform="rotate(-1deg)"
              >
                Connect with me
              </Heading>
              <DoodleArrow direction="down" label="find me here" />
            </VStack>

            <VStack spacing={4} w="full" maxW="400px">
              {socialLinks.map((social, index) => (
                <SocialCard key={social.name} {...social} index={index} />
              ))}
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Contact
export { getServerSideProps } from '../components/chakra'
