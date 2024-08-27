export type WidgetName =
  | 'weather'
  | 'schpincer'
  | 'text'
  | 'image'
  | 'qr'
  | 'departures'
  | 'bike'
  | 'weathercam'
  | 'map'
  | 'cmschEvents';

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
  yOffset: number;
  xOffset: number;
}

export interface CMSchEventsConfig extends WidgetConfigBase {
  name: 'cmschEvents';
  baseUrl: string;
}

export type GridSettings = {
  column: Axis;
  row: Axis;
};

type Axis = {
  start: number;
  end: number;
};

export type WidgetConfig =
  | WeatherConfig
  | SchpincerConfig
  | TextConfig
  | ImageConfig
  | QRConfig
  | DeparturesConfig
  | BikeConfig
  | WeatherCamConfig
  | MapConfig
  | CMSchEventsConfig;
