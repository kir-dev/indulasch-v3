import { WidgetConfig } from './widget.type';
import { Coordinates } from './misc.type';

export type ConfigDto = {
  _id: string;
  refreshNeeded: boolean;
  lastClientQuery: string | undefined;
  config: Config;
};

export type ConfigContextType = {
  config: Config;
  fail: boolean;
};

export type Config = {
  style: Style;
  meta: Meta;
  widgets: WidgetConfig[];
};

type Meta = {
  coordinates: Coordinates;
};

type Style = {
  mode: keyof ColorModeColor;
  colors: ColorsWithScheme;
  logoUrl?: string;
};

export type ColorNames = 'brand' | 'background' | 'tile' | 'fontPrimary' | 'fontSecondary';

type ColorsWithScheme = {
  [name in ColorNames]: ColorModeColor;
};

export type Colors = {
  [name in ColorNames]: string;
};

type ColorModeColor = {
  light: string;
  dark?: string;
};
