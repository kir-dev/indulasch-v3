import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { Open_Sans as OpenSans } from 'next/font/google';

const opensans = OpenSans({ subsets: ['latin'] });

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  fonts: {
    opensans: opensans.style.fontFamily,
  },
  colors: {
    brand: {
      100: '#dcd0de',
      200: '#baa1bd',
      300: '#97739c',
      400: '#75447b',
      500: '#52155a',
      600: '#421148',
      700: '#310d36',
      800: '#210824',
      900: '#100412',
    },
  },
  config,
  styles: {
    global: {
      body: {
        fontFamily: 'opensans',
        bg: 'gray.900',
        maxW: '1000px',
        mx: 'auto',
        p: 5,
      },
      h1: {
        color: 'gray.100',
      },
      h2: {
        color: 'gray.100',
      },
      p: {
        color: 'gray.400',
      },
      li: {
        color: 'gray.400',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'solid',
        colorScheme: 'brand',
      },
    },
    VStack: {
      defaultProps: {
        alignItems: 'flex-start',
        textAlign: 'left',
      },
    },
  },
});

export default theme;
