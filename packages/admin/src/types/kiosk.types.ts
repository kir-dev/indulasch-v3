import { ReactElement } from 'react';
import { TbAlignLeft, TbBike, TbBus, TbCloudStorm, TbCup, TbMap, TbPhoto, TbQrcode, TbSun } from 'react-icons/tb';

export type Kiosk = {
  _id: string;
  refreshNeeded: boolean;
  lastClientQuery: string | undefined;
  config: KioskConfig;
  notification: KioskNotification;
};

export type KioskNotification = {
  status: KioskStatus;
  webhookUrl: string;
  webhookEnabled: boolean;
  emailEnabled: boolean;
};

export enum KioskStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  UNKNOWN = 'UNKNOWN',
}

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

export type WidgetName =
  | 'weather'
  | 'schpincer'
  | 'text'
  | 'image'
  | 'qr'
  | 'departures'
  | 'bike'
  | 'weathercam'
  | 'map';

export const WidgetDisplay: Record<WidgetName, { name: string; icon: ReactElement }> = {
  weather: { name: 'Időjárás', icon: TbSun({ size: 50 }) },
  schpincer: { name: 'Schpincér', icon: TbCup({ size: 50 }) },
  text: { name: 'Szöveg', icon: TbAlignLeft({ size: 50 }) },
  image: { name: 'Kép', icon: TbPhoto({ size: 50 }) },
  qr: { name: 'QR Kód', icon: TbQrcode({ size: 50 }) },
  departures: { name: 'Indulások', icon: TbBus({ size: 50 }) },
  bike: { name: 'Bubi', icon: TbBike({ size: 50 }) },
  weathercam: { name: 'Időjárás kamera', icon: TbCloudStorm({ size: 50 }) },
  map: { name: 'Térkép', icon: TbMap({ size: 50 }) },
};

type WidgetConfigField = {
  name: string;
  label: string;
  type: string;
};

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
  text: [
    { name: 'title', type: 'text', label: 'Cím' },
    { name: 'subtitle', type: 'text', label: 'Alcím' },
  ],
  weathercam: [],
  map: [
    { name: 'radius', type: 'number', label: 'Hatósugár' },
    { name: 'zoom', type: 'number', label: 'Nagyítás' },
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

export interface TextConfig extends WidgetConfigBase {
  name: 'text';
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

export interface WeatherCamConfig extends WidgetConfigBase {
  name: 'weathercam';
}
export interface MapConfig extends WidgetConfigBase {
  name: 'map';
  radius: number;
  zoom: number;
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
  | TextConfig
  | ImageConfig
  | QRConfig
  | DeparturesConfig
  | BikeConfig
  | WeatherCamConfig
  | MapConfig;
