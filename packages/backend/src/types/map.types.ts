export type FutarAPI<T> = {
  currentTime: number;
  version: number;
  status: string;
  code: number;
  text: string;
  data: T;
};

export type Data = {
  outOfRange: boolean;
  limitExceeded: boolean;
  references: References;
  className: string; // Renamed 'class' as it's a reserved keyword
};

export type DeparturesData = Data & {
  list?: DeparturesListEntity[] | null;
};

export type VehiclesData = Data & {
  list?: Vehicle[];
};

export type RoutesData = Data & {
  list?: RouteDetails[];
};

export type DeparturesListEntity = {
  routeId: string;
  headsign: string;
  stopTimes?: StopTimesEntity[] | null;
};

export type StopTimesEntity = {
  stopId: string;
  stopHeadsign: string;
  departureTime: number;
  predictedDepartureTime?: number | null;
  tripId: string;
  serviceDate: string;
  alertIds?: string[] | null;
};

export type References = {
  agencies: Record<string, Agency>;
  routes: Record<string, Route>;
  stops: Record<string, Stop>;
  trips: Record<string, Trip>;
  alerts: Record<string, Alert>;
};

export type Agency = {
  id: string;
  name: string;
  url: string;
  timezone: string;
  lang: string;
  phone: string;
};

export type Alert = {
  id: string;
  start: number;
  end: number;
  timestamp: number;
  modifiedTime: number;
  stopIds?: string[] | null;
  routeIds?: string[] | null;
  url: TranslatedEntity;
  header: TranslatedEntity;
  description: TranslatedEntity;
  routes?: RoutesEntity[] | null;
};

export type TranslatedEntity = {
  translations: Translations;
  someTranslation: string;
};

export type Translations = {
  en: string;
  hu: string;
};

export type RoutesEntity = {
  routeId: string;
  stopIds?: string[] | null;
};

export interface ApiResponse {
  vehicles: Vehicle[];
  routes: RouteDetails[];
  stops: Stop[];
}

export interface Vehicle {
  vehicleId: string;
  stopId: string;
  stopSequence: number | null;
  routeId: string;
  bearing: number;
  location: {
    lat: number;
    lon: number;
  };
  serviceDate: string;
  licensePlate: string;
  label: string | null;
  model: string | null;
  deviated: boolean;
  stale: boolean | null;
  lastUpdateTime: number;
  status: string;
  congestionLevel: string;
  stopDistancePercent: number;
  wheelchairAccessible: boolean;
  tripId: string;
  vertex: string;
  style: {
    icon: {
      name: string;
    };
  };
}

export type Departure = {
  type: string;
  style: Style;
  headsign: string;
  scheduled: number;
  predicted: number;
  alert?: string[];
  isDelayed: boolean;
  departureText: string;
  stopId: string;
};

export type Style = {
  color: string;
  icon: Icon;
  vehicleIcon: VehicleIcon;
};

export type Icon = {
  type: string;
  text: string;
  textColor: string;
};

export type VehicleIcon = {
  name: string;
};

export interface Route {
  id: string;
  shortName: string;
  description: string;
  type: string;
  color: string;
  textColor: string;
  agencyId: string;
  iconDisplayType: string;
  iconDisplayText: string;
  bikesAllowed: boolean;
  style: RouteStyle;
  sortOrder: number;
}

export interface RouteDetails {
  id: string;
  shortName: string;
  description: string;
  type: string;
  color: string;
  textColor: string;
  agencyId: string;
  bikesAllowed: boolean;
  style: RouteStyle;
  variants: RouteVariant[];
  sortOrder: number;
}

export interface RouteVariant {
  name: string;
  stopIds: string[];
  mayRequireBooking: boolean;
  bookableStopIds: string[];
  direction: string;
  headsign: string;
  polyline: Polyline;
  routeId: string;
  type: string;
}

export interface Polyline {
  levels: string;
  points: string;
  length: number;
}

export type RouteStyle = {
  color: string;
  icon: Icon;
  vehicleIcon: VehicleIcon;
};

export interface Stop {
  id: string;
  lat: number;
  lon: number;
  name: string;
  code: string;
  direction: string;
  description: string;
  locationType: number;
  parentStationId: string;
  type: string;
  wheelchairBoarding: boolean;
  routeIds?: string[] | null;
  stopColorType: string;
  style: StopStyle;
}

export type StopStyle = {
  colors?: string[] | null;
};

export type Trip = {
  id: string;
  routeId: string;
  shapeId: string;
  blockId: string;
  tripHeadsign: string;
  serviceId: string;
  directionId: string;
  bikesAllowed: boolean;
  wheelchairAccessible: boolean;
};
