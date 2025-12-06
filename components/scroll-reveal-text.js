import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Box } from '@chakra-ui/react'

const ScrollRevealText = ({
  children,
  mode = 'word', // 'word' or 'character'
  withBlur = false,
  className,
  style,
  ...props
}) => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'start 0.3']
  })

  const splitText = text => {
    if (typeof text !== 'string') return []
    if (mode === 'word') {
      return text.split(' ')
    } else {
      return text.split('')
    }
  }

  const renderText = () => {
    const textContent = typeof children === 'string' ? children : ''
    const elements = splitText(textContent)

    if (elements.length === 0) return children

    return elements.map((element, index) => {
      const start = index / elements.length
      const end = start + 1 / elements.length

      return (
        <Word
          key={index}
          progress={scrollYProgress}
          range={[start, end]}
          withBlur={withBlur}
        >
          {element}
          {mode === 'word' && index < elements.length - 1 ? ' ' : ''}
        </Word>
      )
    })
  }

  return (
    <Box ref={containerRef} className={className} style={style} {...props}>
      {renderText()}
    </Box>
  )
}

const Word = ({ children, progress, range, withBlur }) => {
  const opacity = useTransform(progress, range, [0.2, 1])
  const blur = withBlur
    ? useTransform(progress, range, [4, 0])
    : useTransform(progress, range, [0, 0])

  return (
    <motion.span
      style={{
        opacity,
        filter: useTransform(blur, value => `blur(${value}px)`),
        display: 'inline-block',
        willChange: 'opacity, filter'
      }}
    >
      {children}
    </motion.span>
  )
}

export default ScrollRevealText
