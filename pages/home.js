import Image from 'next/image'
import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra,
  Tab,
  Center
} from '@chakra-ui/react'
import Paragraph from '../components/paragraph'
import Section from '../components/section'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { IoLogoGithub } from 'react-icons/io5'


const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => (
    
    <Container>

      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello, I&apos;m desperate for a job plz hire me
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Aryan Kumar
          </Heading>
          <p>Software Engineer / Full Stack Developer</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/static/goofy.jpg"
              alt="Profile image"
              borderRadius="full"
              width="100%"
              height="100%"
            />

          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          
          <br></br>
          Freelance Python Developer - Expert Witness Profiler LLC 
          
          <br></br>
            -designed a {' '}
          <NextLink href="https://github.com/akumar23/CourtScraper" passHref scroll={false}>
            <Link>python script</Link>
          </NextLink> that automated data collection 
      
            <br></br>
            <br></br>
            Some notable personal projects that I've worked on are:
            <br></br> 
          <NextLink href="https://snake-webapp.herokuapp.com/" passHref scroll={false}>
            <Link>Snake Game Webapp</Link>
          </NextLink>
          <br></br>
          <NextLink href="https://youtu.be/dVwozVz11ho?t=78" passHref scroll={false}>
            <Link>HAL: AI Chatbot</Link>
          </NextLink>
        </Paragraph>
        <Box align="center" my={4}>
          <NextLink href="/projects" passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              Click here for more detail about my projects 
            </Button>
          </NextLink>
        </Box>
      </Section>
      
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Skills
        </Heading>
        <Paragraph>
            <br></br>
            Python, Java, JavaScript, Golang
            <br></br>
            mySQL, Amazon AWS
            <br></br>
            Docker
            <br></br>
            Springboot, Flask, next.js
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <List>
          <ListItem>
            <Link href="https://github.com/akumar23" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @akumar23
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>
    </Container>
)
export default Home
export { getServerSideProps } from '../components/chakra'