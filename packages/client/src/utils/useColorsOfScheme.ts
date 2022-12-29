import { useConfig } from '../layout/ConfigContext';
import { ColorNames, Colors } from '../types/config.type';

export function useColorsOfScheme() {
  const {
    config: {
      style: { mode, colors },
    },
  } = useConfig();
  return Object.keys(colors)
    .map((key) => {
      const color = colors[key as ColorNames];
      const value = mode === 'light' ? color.light : color.dark || color.light;
      return { [key]: value };
    })
    .reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        ...currentValue,
      };
    }) as Colors;
}
