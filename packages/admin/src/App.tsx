import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RootNavigator } from './navigators/Root.navigator';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import theme from './config/theme';
import { AuthProvider } from './context/auth.context';
import { initAxios, queryClient } from './config/api.config';
import { ErrorBoundary } from './components/ErrorBoundary';

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
