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
} from "@chakra-ui/react";
import Paragraph from "../components/paragraph";
import Section from "../components/section";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { IoLogoGithub } from "react-icons/io5";

import { GridItem } from "../components/grid-item";
import { motion } from "framer-motion";

import thumbHal from "../public/projectImage/hal.png";
import thumbFast from "../public/projectImage/fast-pages.png";
import thumbSnake from "../public/projectImage/snake.png";
import thumbRest from "../public/projectImage/rest.png";
import thumbRank from "../public/projectImage/heroRank.png";
import thumbTest from "../public/projectImage/ai-test.png";

const ProfileImage = chakra(Image, {
  shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

const Home = () => (
  <Container>
    <br></br>
    <Box display={{ md: "flex" }}>
      <Box flexGrow={1}>
        <Heading as="h2" variant="page-title">
          Aryan Kumar
        </Heading>
        <p>Software Engineer / Full Stack Developer</p>
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

      <h4>
        <b>Software Engineer @ NALEJ</b>
      </h4>

      <Paragraph>
        -designed and developed a webpage with next.js and typescript, tailwind and trpc that consumed
        the gitlab API to provide statistics for all projects that are in that
        gitlab instance
        <br></br>
        -took on a engineering lead role in hosting LLMs on kuberntes in an
        air-gapped environment
        <br></br>
        -developed a discourse plugin for enhaned UX
        <br></br>
        -worked on adding capabilities to an opertaor to automate deployment of
        services with desired settings
        <br></br>
        -containerized applications and services with docker for deployment in
        kubernetes
        </Paragraph>

        <br></br>

        <h4>
          <b>Freelance Python Developer @ Expert Witness Profiler LLC</b>
        </h4>

        <Paragraph>
        -designed a{" "}
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

        Some notable projects that I've worked on are:
        <br></br>
        <NextLink
          href="https://snake-webapp.herokuapp.com/"
          passHref
          scroll={false}
        >
          <Link>Snake Game Webapp</Link>
        </NextLink>
        <br></br>
        <NextLink
          href="https://youtu.be/dVwozVz11ho?t=78"
          passHref
          scroll={false}
        >
          <Link>HAL: AI Chatbot Demo Video</Link>
        </NextLink>
        <br></br>
        <NextLink
          href="https://youtu.be/FfhoEv2LEoI?t=17"
          passHref
          scroll={false}
        >
          <Link>Fast Pages Demo Video</Link>
        </NextLink>
      </Paragraph>
      <Box align="center" my={4}>
        <NextLink href="/projects" passHref scroll={false}>
          <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
            Click here to see more of my projects
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
        TypeScript, Python, Java, Go
        <br></br>
        Kubernetes, Docker, Terraform
        <br></br>
        Keycloak, REST APIs, tailwind
        <br></br>
        mySQL, Amazon AWS
        <br></br>
        Springboot, Flask, node/next.js
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
);
export default Home;
export { getServerSideProps } from "../components/chakra";
