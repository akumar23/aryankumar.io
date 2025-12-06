import { Box, Heading, Text } from '@chakra-ui/react'
import ScrollRevealText from './scroll-reveal-text'

/**
 * Example usage of ScrollRevealText component
 *
 * This component demonstrates how to use the scroll-linked text reveal animation.
 * Use this as a reference for implementing in your pages.
 */

const ScrollRevealTextExample = () => {
  return (
    <Box py={20}>
      {/* Example 1: Word-by-word reveal */}
      <ScrollRevealText mode="word" as={Heading} size="2xl" mb={8}>
        This text reveals word by word as you scroll down the page
      </ScrollRevealText>

      {/* Example 2: Word-by-word with blur effect */}
      <ScrollRevealText mode="word" withBlur={true} as={Text} fontSize="xl" mb={8}>
        This example includes a blur effect that fades in as you scroll creating a smooth dreamy appearance
      </ScrollRevealText>

      {/* Example 3: Character-by-character reveal */}
      <ScrollRevealText mode="character" as={Text} fontSize="lg" mb={8}>
        Character reveal mode
      </ScrollRevealText>

      {/* Example 4: Custom styling */}
      <ScrollRevealText
        mode="word"
        withBlur={true}
        as={Heading}
        fontSize="3xl"
        fontWeight="bold"
        color="grassTeal"
      >
        Fully customizable with Chakra UI props
      </ScrollRevealText>
    </Box>
  )
}

export default ScrollRevealTextExample

/**
 * USAGE INSTRUCTIONS:
 *
 * 1. Import the component:
 *    import ScrollRevealText from '../components/scroll-reveal-text'
 *
 * 2. Basic usage (word mode):
 *    <ScrollRevealText mode="word">
 *      Your text here
 *    </ScrollRevealText>
 *
 * 3. With blur effect:
 *    <ScrollRevealText mode="word" withBlur={true}>
 *      Your text here
 *    </ScrollRevealText>
 *
 * 4. Character mode:
 *    <ScrollRevealText mode="character">
 *      Your text here
 *    </ScrollRevealText>
 *
 * 5. With Chakra UI styling:
 *    <ScrollRevealText
 *      mode="word"
 *      withBlur={true}
 *      fontSize="2xl"
 *      color="grassTeal"
 *      fontWeight="bold"
 *    >
 *      Your text here
 *    </ScrollRevealText>
 *
 * Props:
 * - mode: 'word' | 'character' (default: 'word')
 * - withBlur: boolean (default: false)
 * - All Chakra UI Box props are supported
 */
