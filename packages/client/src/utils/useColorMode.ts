import { useConfig } from '../layout/ConfigContext';

export function useColorMode<T>(light: T, dark?: T) {
  const {
    config: {
      style: { mode },
    },
  } = useConfig();
  if (mode === 'light') {
    return light;
  } else return dark || light;
}
