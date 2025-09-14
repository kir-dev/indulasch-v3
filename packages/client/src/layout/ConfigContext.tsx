import React, { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';

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
  widgets: [],
});

const DEFAULT_PAGE_DURATION_SEC = 10;

export const ConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const kioskId = useKioskIdFromPath();
  const { config, fail, notFound } = useConfigQuery(kioskId);
  const [widgets, setWidgets] = useState(() => config?.widgets || []);
  const pageIndexRef = useRef(0);

  useEffect(() => {
    if (!config) return;
    const pages = config.pages || [];
    if (!pages.length) {
      setWidgets(config.widgets || []);
      return;
    }

    pageIndexRef.current = 0;
    setWidgets(pages[0]?.widgets || []);

    let timer: ReturnType<typeof setTimeout> | undefined;
    const scheduleNext = () => {
      const current = pageIndexRef.current;
      const globalDefault = config.meta.pageDurationSec || DEFAULT_PAGE_DURATION_SEC;
      const durationSec = pages[current]?.durationSec || globalDefault;
      const ms = Math.max(1, durationSec) * 1000;
      timer = setTimeout(() => {
        const next = (pageIndexRef.current + 1) % pages.length;
        pageIndexRef.current = next;
        setWidgets(pages[next]?.widgets || []);
        scheduleNext();
      }, ms);
    };
    scheduleNext();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [config]);
  if (notFound) return <ErrorPage message='Nem található kioszk ezzel az azonosítóval' />;
  if (fail) {
    if (!config)
      return <ErrorPage message='Nem sikerült betölteni a konfigurációt. Ez szerver oldali hiba is lehet.' />;
  }
  if (!config) return <LoadingPage />;

  return <ConfigContext.Provider value={{ fail, config, widgets }}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => React.useContext(ConfigContext);
