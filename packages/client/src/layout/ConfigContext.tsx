import React, { createContext, PropsWithChildren } from 'react';

import { ErrorPage, LoadingPage } from '../components/StatusPage';
import { useConfigQuery } from '../network/config.network';
import { ConfigContextType } from '../types/config.type';
import { useKioskIdFromPath } from '../utils/useKioskIdFromPath';

const ConfigContext = createContext<ConfigContextType>({
  fail: false,
  config: {
    style: {
      mode: 'light',
      colors: {
        brand: {
          light: '52155a',
        },
        background: {
          light: 'beige',
          dark: 'black',
        },
        tile: {
          light: 'white',
          dark: 'gray',
        },
        fontPrimary: {
          light: 'black',
          dark: 'white',
        },
        fontSecondary: {
          light: 'gray',
        },
      },
    },
    meta: {
      coordinates: { lat: 47.473443, lon: 19.052844 },
    },
    widgets: [],
  },
});

export const ConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const kioskId = useKioskIdFromPath();
  const { config, fail, notFound } = useConfigQuery(kioskId);
  if (notFound) return <ErrorPage message='Nem található kioszk ezzel az azonosítóval' />;
  if (fail) {
    if (!config)
      return <ErrorPage message='Nem sikerült betölteni a konfigurációt. Ez szerver oldali hiba is lehet.' />;
  }
  if (!config) return <LoadingPage />;

  return <ConfigContext.Provider value={{ fail, config }}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => React.useContext(ConfigContext);
