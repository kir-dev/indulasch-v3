import { ReactElement } from 'react';
import { TbBike, TbBus, TbCup, TbPhoto, TbQrcode, TbSettings, TbSun } from 'react-icons/tb';
import * as Yup from 'yup';

export type Kiosk = {
  _id: string;
  refreshNeeded: boolean;
  lastClientQuery: string | undefined;
  config: KioskConfig;
};

export type KioskConfig = {
  style: Style;
  meta: Meta;
  widgets: WidgetConfig[];
};

export type Coordinates = {
  lat: string;
  lon: string;
};

export type Meta = {
  coordinates: Coordinates;
  name: string;
};

export type Style = {
  mode: keyof ColorModeColor;
  colors: ColorsWithScheme;
};

export type ColorNames = 'brand' | 'background' | 'tile' | 'fontPrimary' | 'fontSecondary';

export type ColorsWithScheme = {
  [name in ColorNames]: ColorModeColor;
};

export type Colors = {
  [name in ColorNames]: string;
};

export type ColorModeColor = {
  light: string;
  dark: string;
};

export type WidgetName = 'weather' | 'schpincer' | 'custom' | 'image' | 'qr' | 'departures' | 'bike';

export const WidgetDisplay: Record<WidgetName, { name: string; icon: ReactElement }> = {
  weather: { name: 'Időjárás', icon: TbSun({ size: 50 }) },
  schpincer: { name: 'Schpincér', icon: TbCup({ size: 50 }) },
  custom: { name: 'Egyedi', icon: TbSettings({ size: 50 }) },
  image: { name: 'Kép', icon: TbPhoto({ size: 50 }) },
  qr: { name: 'QR Kód', icon: TbQrcode({ size: 50 }) },
  departures: { name: 'Indulások', icon: TbBus({ size: 50 }) },
  bike: { name: 'Bubi', icon: TbBike({ size: 50 }) },
};

type WidgetConfigField = {
  name: string;
  label: string;
  type: string;
};

export const WidgetConfigValidation = Yup.object().shape({
  name: Yup.string().required('Milyen csempe is ez?'),
  apiKey: Yup.string().required('Máshogy nem tudjuk lekérni az adatot.'),
  url: Yup.string().required('Milyen képek akarsz ide?'),
  message: Yup.string().required('Üres QR kicsit értelmetlen lenne.'),
  label: Yup.string().required('Címke nélkül kicsit ijesztő egy QR...'),
  radius: Yup.number().required('A világ összes indulását nem akarod itt látni...'),
  title: Yup.string().required('Cím kellene.'),
  subtitle: Yup.string().required('Alcím se jön rosszul.'),
});

export const WidgetConfigFields: Record<WidgetName, WidgetConfigField[]> = {
  schpincer: [{ name: 'apiKey', type: 'text', label: 'API Kulcs' }],
  weather: [{ name: 'apiKey', type: 'text', label: 'API Kulcs' }],
  image: [{ name: 'url', type: 'text', label: 'Kép URL címe' }],
  qr: [
    { name: 'message', type: 'text', label: 'QR tartalma' },
    { name: 'label', type: 'text', label: 'QR alatti címke' },
  ],
  departures: [{ name: 'radius', type: 'number', label: 'Hatósugár' }],
  bike: [],
  custom: [
    { name: 'title', type: 'text', label: 'Cím' },
    { name: 'subtitle', type: 'text', label: 'Alcím' },
  ],
};

export type WidgetConfigBase = {
  name: WidgetName;
  grid: GridSettings;
};

export interface WeatherConfig extends WidgetConfigBase {
  name: 'weather';
  apiKey: string;
}

export interface SchpincerConfig extends WidgetConfigBase {
  name: 'schpincer';
  apiKey: string;
}

export interface CustomConfig extends WidgetConfigBase {
  name: 'custom';
  title: string;
  subtitle: string;
}

export interface ImageConfig extends WidgetConfigBase {
  name: 'image';
  url: string;
}

export interface QRConfig extends WidgetConfigBase {
  name: 'qr';
  message: string;
  label: string;
}

export interface DeparturesConfig extends WidgetConfigBase {
  name: 'departures';
  radius: number;
}

export interface BikeConfig extends WidgetConfigBase {
  name: 'bike';
}

export type GridSettings = {
  column: Axis;
  row: Axis;
};

type Axis = {
  start: number;
  end: number;
};

export type WidgetWithoutGrid = Omit<WidgetConfig, 'grid'>;

export type WidgetConfig =
  | WeatherConfig
  | SchpincerConfig
  | CustomConfig
  | ImageConfig
  | QRConfig
  | DeparturesConfig
  | BikeConfig;
