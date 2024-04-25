import Image from "next/image";
import NextLink from "next/link";
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
  AccordionPanel
} from "@chakra-ui/react";
import Section from "../components/section";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { IoLogoGithub } from "react-icons/io5";
import Typewriter from 'typewriter-effect';

const ProfileImage = chakra(Image, {
  shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

const Home = () => (
  <Container>
    <br></br>
    <Box display={{ md: "flex" }}>
      <Box flexGrow={1}>
        <Heading as='h2' size='lg' variant="page-title">
          <Typewriter
            options={{
              strings: ['software engineer', 'full stack developer', 'ai engineer'],
              autoStart: true,
              loop: true,
            }}
          />
        </Heading>
        <br></br>
        <p>B.S in Software Engineering from San Jose State University</p>
        <p>Masters in CS from Arizona State University (in progress)</p>
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
            src="/static/profile.png"
            alt="Profile image"
            borderRadius="full"
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
    </Box>

    <br></br>

    <Section delay={0.1}>
      <Heading as="h3" variant="section-title">
        Work
      </Heading>

      <Accordion>
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
              <NextLink
                href="https://github.com/akumar23/CourtScraper"
                passHref
                scroll={false}
              >
                <Link>python script</Link>
              </NextLink>{" "}
              that automated data collection from online courts using beautiful soup
              and selenium and used pandas to make data frames for that webscraped
              data
              <br></br>
              <br></br>
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <br></br>

      <Heading as="h3" variant="section-title">
        Projects
      </Heading>
      <NextLink
        href="https://github.com/akumar23/digit-predictor-neural-net"
        passHref
        scroll={false}
      >
        <Link>Digit Predictor Neural Network</Link>
      </NextLink>
      <br></br>
      <NextLink
        href="https://github.com/akumar23/hf-model-train"
        passHref
        scroll={false}
      >
        <Link>Huggingface Model Train Script</Link>
      </NextLink>
      <br></br>
      <NextLink
        href="https://comic-ranker.vercel.app/"
        passHref
        scroll={false}
      >
        <Link>Comic Ranker Full Stack Webapp</Link>
      </NextLink>

      <Box align="left" my={4}>
        <NextLink href="/projects" passHref scroll={false}>
          <Button rightIcon={<ChevronRightIcon />} colorScheme="teal" size="sm">
            more projects
          </Button>
        </NextLink>
      </Box>
    </Section>

    <br></br>

    <Section delay={0.1}>
      <Heading as="h3" variant="section-title">
        Skills
      </Heading>
      <p>
        TypeScript, Python, Java, Go
        <br></br>
        neural net and LLM development, vLLM/ollama deployment, huggingface
        <br></br>
        Kubernetes, Docker, Terraform
        <br></br>
        Keycloak, REST APIs, tailwind
        <br></br>
        mySQL, Amazon AWS
        <br></br>
        Springboot, Flask, node/next.js
      </p>
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
);
export default Home;
export { getServerSideProps } from "../components/chakra";