export type WidgetName = 'weather' | 'schpincer' | 'custom' | 'image' | 'qr' | 'departures' | 'bike';

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

export type WidgetConfig =
  | WeatherConfig
  | SchpincerConfig
  | CustomConfig
  | ImageConfig
  | QRConfig
  | DeparturesConfig
  | BikeConfig;
