import { Coordinates } from './misc.type';
import { WidgetConfig } from './widget.type';

export type ConfigDto = {
  _id: string;
  refreshNeeded: boolean;
  lastClientQuery: string | undefined;
  config: Config;
};

export type ConfigContextType = {
  config: Config;
  fail: boolean;
  widgets: WidgetConfig[];
};

export type Config = {
  style: Style;
  meta: Meta;
  // Backward compatibility: single-page widgets
  widgets?: WidgetConfig[];
  pages?: Page[];
};

type Meta = {
  coordinates: Coordinates;
  pageDurationSec?: number;
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

export type Page = {
  durationSec?: number;
  title?: string;
  widgets: WidgetConfig[];
};
