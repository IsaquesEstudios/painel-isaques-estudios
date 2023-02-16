import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    Black: {
      "500": "#393d40",
      "600": "#333739",
      "700": "#181819",
      "800": "#121212",
      "900": "#0e0e0e"
    },
    Yellow: {
      "500": "#FAD200",
      "600": "#FFDA2A",
      "700": "#EAD13D",
      "800": "#E8BD00",
      "900": "#EA9C00"
    }
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  fonts: {
    heading: 'poppins, sans-serif',
    body: 'poppins, sans-serif'
  },
  styles: {
    global: {
      body: {
        bg: 'Black.800',
        color: '#d9d9d9'
      }
    }
  }
})
