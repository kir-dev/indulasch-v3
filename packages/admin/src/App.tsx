import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { initAxios, queryClient } from './config/api.config';
import theme from './config/theme';
import { AuthProvider } from './context/auth.context';
import { RootNavigator } from './navigators/Root.navigator';

initAxios();

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            <AuthProvider>
              <Helmet titleTemplate='%s | iSch Admin' />
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <QueryClientProvider client={queryClient} />
              <RootNavigator />
            </AuthProvider>
          </ErrorBoundary>
        </ChakraProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
