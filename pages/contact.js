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
  import '../styles/Home.module.css'

  const Contact = () => {

    <Container> 
        
        <Heading> Contact Me </Heading>
        <Box display={{ md: 'flex' }}>
            <form>
                <input type="text" id="name" placeholder="Your Name" required />
                <input type="email" id="email" placeholder="Your Email" required />
                <textarea id="message" rows="4" placeholder='Enter your message here' ></textarea>
                <button type="submit">Send</button>
            </form>
        </Box>

    </Container>

  }
  export default Contact