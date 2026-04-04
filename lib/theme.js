import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const colors = {
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D1D1D6',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#0D1117'
  },

  primary: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F'
  },

  ink: {
    light: '#FAFAFA',
    dark: '#18181B',
    stroke: '#3F3F46'
  },

  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  grassTeal: '#F59E0B'
}

const fonts = {
  display: "'JetBrains Mono', 'Fira Code', monospace",
  heading: "'JetBrains Mono', 'Fira Code', monospace",
  serif: "'Instrument Serif', 'Georgia', serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  accent: "'JetBrains Mono', monospace",
  mono: "'JetBrains Mono', 'Fira Code', monospace"
}

const fontSizes = {
  xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
  sm: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
  md: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
  lg: 'clamp(1.125rem, 1rem + 0.65vw, 1.25rem)',
  xl: 'clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem)',
  '2xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
  '3xl': 'clamp(1.875rem, 1.5rem + 2vw, 2.5rem)',
  '4xl': 'clamp(2.25rem, 1.8rem + 2.5vw, 3rem)',
  '5xl': 'clamp(3rem, 2.2rem + 4vw, 4.5rem)',
  '6xl': 'clamp(3.75rem, 2.5rem + 6vw, 6rem)',
  '7xl': 'clamp(4.5rem, 3rem + 8vw, 8rem)',
  hero: 'clamp(4rem, 3rem + 10vw, 12rem)',
  'display-sm': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
  'display-md': 'clamp(2.5rem, 2rem + 3vw, 4rem)',
  'display-lg': 'clamp(3rem, 2.5rem + 4vw, 5rem)',
  'display-xl': 'clamp(4rem, 3rem + 5vw, 6rem)'
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

const space = {
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem'
}

const sizes = {
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    full: '100%'
  }
}

const breakpoints = {
  base: '0px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

const styles = {
  global: props => ({
    'html, body': {
      bg: mode('neutral.50', 'neutral.950')(props),
      color: mode('neutral.900', 'neutral.50')(props),
      transition: 'background-color 0.3s ease, color 0.3s ease',
      scrollBehavior: 'smooth',
      fontFamily: 'body'
    },
    body: {
      minHeight: '100vh',
      overflowX: 'hidden'
    },
    '::selection': {
      bg: mode('neutral.900', 'primary.500')(props),
      color: mode('neutral.50', 'neutral.900')(props)
    },
    '*:focus-visible': {
      outline: '2px solid',
      outlineColor: mode('neutral.900', 'primary.400')(props),
      outlineOffset: '2px',
      boxShadow: 'none'
    },
    '::-webkit-scrollbar': {
      width: '6px'
    },
    '::-webkit-scrollbar-track': {
      bg: 'transparent'
    },
    '::-webkit-scrollbar-thumb': {
      bg: mode('neutral.300', 'neutral.700')(props),
      borderRadius: '3px',
      '&:hover': {
        bg: mode('neutral.400', 'neutral.600')(props)
      }
    }
  })
}

const components = {
  Heading: {
    baseStyle: props => ({
      fontFamily: 'heading',
      fontWeight: '400',
      color: mode('neutral.900', 'neutral.50')(props),
      letterSpacing: 'normal',
      textTransform: 'none'
    }),
    variants: {
      'section-title': props => ({
        fontSize: '3xl',
        fontWeight: '400',
        position: 'relative',
        display: 'inline-block',
        marginBottom: 8,
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-8px',
          left: 0,
          width: '40px',
          height: '2px',
          bg: 'primary.500'
        }
      }),
      display: {
        fontFamily: 'display',
        fontWeight: '400',
        letterSpacing: 'tight',
        lineHeight: 'shorter'
      },
      serif: props => ({
        fontFamily: 'serif',
        fontWeight: '400',
        letterSpacing: 'tight',
        lineHeight: 'shorter',
        textTransform: 'none',
        color: mode('neutral.900', 'neutral.50')(props)
      }),
      refined: props => ({
        fontFamily: 'serif',
        fontWeight: '400',
        letterSpacing: 'tight',
        lineHeight: 'shorter',
        textTransform: 'none'
      })
    }
  },
  Text: {
    baseStyle: props => ({
      fontFamily: 'body',
      color: mode('neutral.700', 'neutral.300')(props),
      fontSize: 'md'
    })
  },
  Link: {
    baseStyle: props => ({
      color: mode('neutral.900', 'primary.300')(props),
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      _hover: {
        color: mode('neutral.700', 'primary.200')(props),
        textDecoration: 'none'
      },
      _focusVisible: {
        outline: '2px solid',
        outlineColor: mode('neutral.900', 'primary.400')(props),
        outlineOffset: '2px'
      }
    })
  },
  Button: {
    baseStyle: {
      fontFamily: 'heading',
      fontWeight: '400',
      borderRadius: 'none',
      transition: 'all 0.2s ease',
      letterSpacing: 'wide',
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'primary.500',
        outlineOffset: '2px'
      }
    },
    variants: {
      solid: props => ({
        bg: mode('neutral.900', 'primary.500')(props),
        color: mode('neutral.50', 'neutral.900')(props),
        border: '1px solid',
        borderColor: mode('neutral.900', 'primary.500')(props),
        _hover: {
          transform: 'translateY(-1px)',
          bg: mode('neutral.800', 'primary.400')(props),
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        },
        _active: {
          transform: 'translateY(0)'
        }
      }),
      ghost: props => ({
        color: mode('neutral.700', 'neutral.300')(props),
        _hover: {
          bg: mode('neutral.100', 'neutral.800')(props)
        }
      }),
      outline: props => ({
        borderWidth: '1px',
        borderColor: mode('neutral.300', 'neutral.600')(props),
        color: mode('neutral.900', 'neutral.200')(props),
        bg: 'transparent',
        _hover: {
          bg: mode('neutral.100', 'neutral.800')(props),
          transform: 'translateY(-1px)'
        }
      })
    },
    defaultProps: {
      variant: 'solid'
    }
  },
  Input: {
    baseStyle: {
      field: {
        fontFamily: 'body',
        _focusVisible: {
          borderColor: 'primary.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)'
        }
      }
    },
    variants: {
      filled: props => ({
        field: {
          bg: mode('neutral.100', 'neutral.800')(props),
          _hover: {
            bg: mode('neutral.200', 'neutral.700')(props)
          },
          _focusVisible: {
            bg: mode('white', 'neutral.900')(props),
            borderColor: 'primary.500'
          }
        }
      })
    },
    defaultProps: {
      variant: 'filled'
    }
  },
  Textarea: {
    baseStyle: {
      fontFamily: 'body',
      _focusVisible: {
        borderColor: 'primary.500',
        boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)'
      }
    }
  },
  Card: {
    baseStyle: props => ({
      container: {
        bg: mode('white', 'rgba(255,255,255,0.03)')(props),
        borderRadius: 'md',
        border: '1px solid',
        borderColor: mode('neutral.200', 'rgba(255,255,255,0.07)')(props),
        transition: 'all 0.2s ease',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: mode(
            '0 8px 30px rgba(0, 0, 0, 0.08)',
            '0 8px 30px rgba(0, 0, 0, 0.4)'
          )(props)
        }
      }
    }),
    variants: {
      refined: props => ({
        container: {
          bg: mode('white', 'rgba(255,255,255,0.03)')(props),
          borderRadius: 'lg',
          border: '1px solid',
          borderColor: mode('neutral.200', 'rgba(255,255,255,0.07)')(props),
          transition: 'all 0.2s ease',
          _hover: {
            bg: mode('neutral.50', 'rgba(255,255,255,0.05)')(props),
            transform: 'translateY(-2px)',
            boxShadow: mode(
              '0 4px 20px rgba(0, 0, 0, 0.08)',
              '0 4px 20px rgba(0, 0, 0, 0.3)'
            )(props)
          }
        }
      }),
      glass: props => ({
        container: {
          bg: mode('rgba(255,255,255,0.8)', 'rgba(255,255,255,0.03)')(props),
          backdropFilter: 'blur(10px)',
          borderRadius: 'lg',
          border: '1px solid',
          borderColor: mode('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.07)')(props),
          transition: 'all 0.2s ease',
          _hover: {
            transform: 'translateY(-2px)'
          }
        }
      })
    }
  },
  Container: {
    baseStyle: {
      maxW: 'container.xl',
      px: { base: 4, md: 8, lg: 16 }
    }
  },
  Divider: {
    baseStyle: props => ({
      borderColor: mode('neutral.200', 'neutral.800')(props)
    })
  }
}

const semanticTokens = {
  colors: {
    'bg.primary': {
      default: 'neutral.50',
      _dark: 'neutral.950'
    },
    'bg.secondary': {
      default: 'white',
      _dark: 'neutral.900'
    },
    'bg.tertiary': {
      default: 'neutral.100',
      _dark: 'neutral.800'
    },
    'bg.card': {
      default: 'white',
      _dark: 'rgba(255,255,255,0.03)'
    },
    'bg.cardHover': {
      default: 'neutral.50',
      _dark: 'rgba(255,255,255,0.05)'
    },
    'bg.cardElevated': {
      default: 'white',
      _dark: 'rgba(255,255,255,0.06)'
    },
    'text.primary': {
      default: 'neutral.900',
      _dark: 'neutral.50'
    },
    'text.secondary': {
      default: 'neutral.700',
      _dark: 'neutral.300'
    },
    'text.tertiary': {
      default: 'neutral.500',
      _dark: 'neutral.500'
    },
    'border.default': {
      default: 'neutral.200',
      _dark: 'rgba(255,255,255,0.08)'
    },
    'border.subtle': {
      default: 'neutral.100',
      _dark: 'rgba(255,255,255,0.05)'
    },
    'accent.primary': {
      default: 'primary.600',
      _dark: 'primary.400'
    },
    'accent.secondary': {
      default: 'primary.700',
      _dark: 'primary.300'
    }
  }
}

const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.15)',
  md: '0 4px 12px rgba(0,0,0,0.15)',
  lg: '0 8px 24px rgba(0,0,0,0.2)',
  xl: '0 16px 48px rgba(0,0,0,0.25)',
  '2xl': '0 24px 64px rgba(0,0,0,0.3)',
  glow: '0 0 30px rgba(245, 158, 11, 0.35)',
  'glow-sm': '0 0 15px rgba(245, 158, 11, 0.25)',
  inner: 'inset 0 1px 2px rgba(0,0,0,0.1)'
}

const radii = {
  none: '0',
  sm: '0.25rem',
  base: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px'
}

const transition = {
  property: {
    common: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    colors: 'background-color, border-color, color, fill, stroke',
    dimensions: 'width, height',
    position: 'left, right, top, bottom',
    background: 'background-color, background-image, background-position'
  },
  easing: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.22, 1, 0.36, 1)'
  },
  duration: {
    'ultra-fast': '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    'ultra-slow': '500ms'
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
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
  colors,
  space,
  sizes,
  breakpoints,
  shadows,
  radii,
  transition,
  semanticTokens
})

export default theme
