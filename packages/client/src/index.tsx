import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConfigProvider } from './layout/ConfigContext';

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    margin: 0;
    position: absolute;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ErrorBoundary>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
