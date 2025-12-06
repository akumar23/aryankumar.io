import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      // 90s teal/cyan background (light mode) and deep purple starfield (dark mode)
      bg: mode('#00CED1', '#1a0033')(props),
      // Add retro texture
      backgroundImage: mode(
        'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)',
        'none'
      )(props),
      color: mode('#000080', '#00FF00')(props) // Navy blue (light) / Lime green (dark)
    },
    // Global focus styles for accessibility
    '*:focus-visible': {
      outline: '3px solid',
      outlineColor: '#FF00FF',
      outlineOffset: '2px',
      boxShadow: '0 0 10px #FF00FF'
    }
  })
}

const components = {
  Heading: {
    baseStyle: props => ({
      fontWeight: 'bold',
      textShadow: mode(
        '3px 3px 0px #FF1493, -1px -1px 0px #00FFFF',
        '2px 2px 0px #FF00FF, -1px -1px 0px #00FF00'
      )(props)
    }),
    variants: {
      'section-title': props => ({
        textDecoration: 'underline',
        fontSize: 24,
        textUnderlineOffset: 6,
        textDecorationColor: mode('#FF1493', '#FFFF00')(props),
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: '2px'
      })
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#0000FF', '#00FFFF')(props), // Blue (light) / Cyan (dark)
      textUnderlineOffset: 3,
      textDecoration: 'underline',
      fontWeight: 'bold',
      _hover: {
        color: mode('#FF1493', '#FF00FF')(props), // Hot pink / Magenta
        textShadow: '0 0 5px currentColor'
      },
      _focusVisible: {
        outline: '3px solid',
        outlineColor: '#FF00FF',
        outlineOffset: '2px',
        boxShadow: '0 0 10px #FF00FF'
      }
    })
  },
  Button: {
    baseStyle: props => ({
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: '0px', // Square 90s buttons
      border: '3px solid',
      borderColor: mode('#000080', '#00FFFF')(props),
      boxShadow: mode(
        '4px 4px 0px #000000, inset 2px 2px 0px rgba(255,255,255,0.5)',
        '4px 4px 0px #FF00FF, inset 2px 2px 0px rgba(255,255,255,0.2)'
      )(props),
      _hover: {
        transform: 'translate(2px, 2px)',
        boxShadow: mode(
          '2px 2px 0px #000000, inset 2px 2px 0px rgba(255,255,255,0.5)',
          '2px 2px 0px #FF00FF, inset 2px 2px 0px rgba(255,255,255,0.2)'
        )(props)
      },
      _active: {
        transform: 'translate(4px, 4px)',
        boxShadow: 'none'
      },
      _focusVisible: {
        outline: '3px solid',
        outlineColor: '#FF00FF',
        outlineOffset: '2px',
        boxShadow: '0 0 10px #FF00FF'
      }
    })
  },
  Input: {
    baseStyle: {
      field: {
        _focusVisible: {
          borderColor: '#88ccca',
          boxShadow: '0 0 0 1px #88ccca'
        }
      }
    }
  },
  Textarea: {
    baseStyle: {
      _focusVisible: {
        borderColor: '#88ccca',
        boxShadow: '0 0 0 1px #88ccca'
      }
    }
  },
  Select: {
    baseStyle: {
      field: {
        _focusVisible: {
          borderColor: '#88ccca',
          boxShadow: '0 0 0 1px #88ccca'
        }
      }
    }
  },
  IconButton: {
    baseStyle: {
      _focusVisible: {
        outline: '2px solid',
        outlineColor: '#88ccca',
        outlineOffset: '2px',
        boxShadow: '0 0 0 3px rgba(136, 204, 202, 0.3)'
      }
    }
  },
  Menu: {
    baseStyle: {
      item: {
        _focus: {
          bg: 'rgba(136, 204, 202, 0.1)'
        },
        _focusVisible: {
          outline: '2px solid',
          outlineColor: '#88ccca',
          outlineOffset: '-2px'
        }
      }
    }
  },
  Accordion: {
    baseStyle: {
      button: {
        _focusVisible: {
          outline: '2px solid',
          outlineColor: '#88ccca',
          outlineOffset: '2px',
          boxShadow: '0 0 0 3px rgba(136, 204, 202, 0.2)'
        }
      }
    }
  }
}

const fonts = {
  // 90s retro fonts - Comic Sans for headings, system fonts for body
  heading: "'Comic Sans MS', 'Comic Sans', cursive, sans-serif",
  body: "'Courier New', Courier, monospace"
}

const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  md: '1rem',       // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem',  // 72px
  '8xl': '6rem',    // 96px
  '9xl': '8rem'     // 128px
}

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
}

const lineHeights = {
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: 2
}

const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
}

const colors = {
  // 90s neon color palette
  grassTeal: '#00FFFF', // Bright cyan
  neonPink: '#FF1493',
  neonPurple: '#FF00FF',
  neonGreen: '#00FF00',
  neonYellow: '#FFFF00',
  electricBlue: '#0000FF',
  hotPink: '#FF69B4'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({
  config,
  styles,
  components,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  colors
})

export default theme