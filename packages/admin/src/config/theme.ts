import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
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
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('gray.100', 'gray.900')(props),
      },
    }),
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
