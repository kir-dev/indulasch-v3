import { KioskConfig, KioskStatus } from '../types/kiosk.types';

const DefaultKiosk: KioskConfig = {
  style: {
    mode: 'light',
    colors: {
      brand: {
        light: '#52155a',
        dark: '#52155a',
      },
      background: {
        light: 'beige',
        dark: 'black',
      },
      tile: {
        light: 'white',
        dark: '#161b1e',
      },
      fontPrimary: {
        light: '#343434',
        dark: 'white',
      },
      fontSecondary: {
        light: 'gray',
        dark: 'gray',
      },
    },
  },
  meta: {
    coordinates: { lat: '47.473443', lon: '19.052844' },
    name: 'unknown',
  },
  widgets: [
    {
      name: 'departures',
      radius: 400,
      grid: { row: { start: 1, end: 4 }, column: { start: 1, end: 3 } },
    },
    {
      name: 'bike',
      grid: { row: { start: 1, end: 4 }, column: { start: 3, end: 4 } },
    },
  ],
};

export function getDefaultConfig(name: string) {
  const config = DefaultKiosk;
  config.meta.name = name;
  return config;
}
