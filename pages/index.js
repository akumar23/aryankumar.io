import Image from "next/image";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
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
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  HStack,
  IconButton,
  Tooltip,
  Text
} from "@chakra-ui/react";
import Section from "../components/section";
import SkillsGrid from "../components/SkillsGrid";
import MagneticButton from "../components/magnetic-button";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { IoLogoGithub } from "react-icons/io5";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Typewriter from 'typewriter-effect';
import AnimatedHero, { AnimatedText, FadeInBox } from "../components/animated-hero";
import StarfieldBackground from "../components/starfield-bg";
import {
  WelcomeBanner,
  HitCounter,
  AnimatedDivider,
  BeveledContainer,
  BlinkingText,
  NeonGlowText,
  NewBadge,
  BestViewedBadge
} from "../components/retro-decorations";

// Dynamically import R3F components with SSR disabled
const R3FParticles = dynamic(() => import('../components/r3f-particles'), {
  ssr: false,
  loading: () => null
});

const FloatingSkills3D = dynamic(() => import('../components/floating-skills-3d'), {
  ssr: false,
  loading: () => null
});

const ProfileImage = chakra(Image, {
  shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

const Home = () => {
  const colorMode = useColorModeValue('light', 'dark');
  const [show3DSkills, setShow3DSkills] = useState(false);
  const accentColor = useColorModeValue('#5a9a98', '#88ccca');

  return (
    <>
      <StarfieldBackground />
      <Container position="relative" zIndex={1}>
        <WelcomeBanner title="🌟 WELCOME TO ARYAN'S HOMEPAGE 🌟" />

        <HitCounter />

        <AnimatedDivider />

        <BeveledContainer mb={6}>
          <Box display={{ md: "flex" }}>
            <Box flexGrow={1}>
              <Heading as='h2' size='lg' mb={4}>
                <NeonGlowText color={useColorModeValue('#FF00FF', '#00FFFF')}>
                  <Typewriter
                    options={{
                      strings: ['software engineer', 'full stack developer', 'ai engineer'],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </NeonGlowText>
              </Heading>
              <Text fontSize="md" mb={2}>
                <BlinkingText>★</BlinkingText> B.S in Software Engineering from San Jose State University
              </Text>
              <Text fontSize="md">
                <BlinkingText>★</BlinkingText> Masters in CS from Arizona State University <NewBadge />
              </Text>
            </Box>
            <Box
              flexShrink={0}
              mt={{ base: 4, md: 0 }}
              ml={{ md: 6 }}
              textAlign="center"
            >
              <Box
                border="4px solid"
                borderColor={useColorModeValue('#FF00FF', '#00FFFF')}
                w="100px"
                h="100px"
                display="inline-block"
                borderRadius="0" // Square for 90s look
                overflow="hidden"
                boxShadow={`0 0 20px ${useColorModeValue('#FF00FF', '#00FFFF')}`}
              >
                <ProfileImage
                  src="/static/profile.png"
                  alt="Profile image"
                  borderRadius="0"
                  width={100}
                  height={100}
                  priority
                />
              </Box>
            </Box>
          </Box>
        </BeveledContainer>

    <AnimatedDivider />

    <Section delay={0.1}>
      <BeveledContainer>
        <HStack justify="space-between" align="center" mb={4}>
          <Heading as="h3" variant="section-title" mb={0}>
            <NeonGlowText color={useColorModeValue('#FF1493', '#00FF00')}>
              Skills <BlinkingText>⚡</BlinkingText>
            </NeonGlowText>
          </Heading>
          <Tooltip
            label={show3DSkills ? "Switch to Grid View" : "Switch to 3D View"}
            placement="left"
          >
            <IconButton
              icon={show3DSkills ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShow3DSkills(!show3DSkills)}
              variant="solid"
              colorScheme="teal"
              size="sm"
              aria-label={show3DSkills ? "Switch to Grid View" : "Switch to 3D View"}
            />
          </Tooltip>
        </HStack>

        {show3DSkills ? (
          <Box
            borderRadius="0"
            overflow="hidden"
            bg={useColorModeValue('rgba(192,192,192,0.5)', 'rgba(64,64,64,0.5)')}
            border="4px ridge"
            borderColor={useColorModeValue('#808080', '#FF00FF')}
          >
            <FloatingSkills3D height="600px" />
          </Box>
        ) : (
          <SkillsGrid />
        )}
      </BeveledContainer>
    </Section>

    <AnimatedDivider />

    <Section delay={0.2}>
      <BeveledContainer>
        <Heading as="h3" variant="section-title">
          <NeonGlowText color={useColorModeValue('#0000FF', '#FFFF00')}>
            Work Experience <BlinkingText>💼</BlinkingText>
          </NeonGlowText>
        </Heading>

        <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <b>Software Engineer @ NALEJ (Sep 2022-Present)</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          
          <AccordionPanel pb={4}>
            <p>
              designed, developed and deployed a webpage with next.js and typescript, tailwind and trpc 
              that consumed the gitlab API to provide statistics for all projects that are in that gitlab 
              instance
            </p>

            <br></br>
            
            <p>
              took on a engineering lead role in hosting LLMs on kuberntes in an
              air-gapped environment
            </p>

            <br></br>

            <p>
              developed a discourse plugin for enhaned UX
            </p>

            <br></br>

            <p>
              worked on adding capabilities to an opertaor to automate deployment of
              services with desired settings
            </p>

            <br></br>

            <p>
              containerized applications and services with docker for deployment in kubernetes
            </p>

          </AccordionPanel>

        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <b>Freelance Python Developer @ Expert Witness Profiler LLC </b>
                <br></br>
                <b>(Jun 2022 - Sep 2022)</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <p>
              wrote a{" "}
              <Link
                as={NextLink}
                href="https://github.com/akumar23/CourtScraper"
                scroll={false}
              >
                python script
              </Link>{" "}
              that automated data collection from online courts using beautiful soup
              and selenium and used pandas to make data frames for that webscraped
              data
              <br></br>
              <br></br>
            </p>
          </AccordionPanel>
        </AccordionItem>
        </Accordion>
      </BeveledContainer>

      <AnimatedDivider />

      <BeveledContainer>
        <Heading as="h3" variant="section-title">
          <NeonGlowText color={useColorModeValue('#FF00FF', '#00FFFF')}>
            Featured Projects <NewBadge />
          </NeonGlowText>
        </Heading>
      <Link
        as={NextLink}
        href="https://github.com/akumar23/digit-predictor-neural-net"
        scroll={false}
      >
        Digit Predictor Neural Network
      </Link>
      <br></br>
      <Link
        as={NextLink}
        href="https://github.com/akumar23/hf-model-train"
        scroll={false}
      >
        Huggingface Model Train Script
      </Link>
      <br></br>
      <Link
        as={NextLink}
        href="https://comic-ranker.vercel.app/"
        scroll={false}
      >
        Comic Ranker Full Stack Webapp
      </Link>

        <Box align="left" my={4}>
          <MagneticButton
            as={NextLink}
            href="/projects"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
            size="md"
          >
            View All Projects
          </MagneticButton>
        </Box>
      </BeveledContainer>
    </Section>

    <AnimatedDivider />

    <Section delay={0.3}>
      <BeveledContainer textAlign="center">
        <List styleType="none">
          <ListItem>
            <Link href="https://github.com/akumar23" target="_blank">
              <MagneticButton
                variant="solid"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
                size="lg"
              >
                <NeonGlowText>@akumar23 on GitHub</NeonGlowText>
              </MagneticButton>
            </Link>
          </ListItem>
        </List>
      </BeveledContainer>
    </Section>

    <BestViewedBadge />
  </Container>
  </>
  );
};
export default Home;
export { getServerSideProps } from "../components/chakra";