import { Style } from './departures.type';

export type MapDto = {
  vehicles: Vehicle[];
  routes: RouteDetails[];
  stops: Stop[];
};

export type Vehicle = {
  vehicleId: string;
  routeId: string;
  location: {
    lat: number;
    lon: number;
  };
  style: Style;
  bearing: number;
};

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

export type Icon = {
  type: string;
  text: string;
  textColor: string;
};

export type VehicleIcon = {
  name: string;
};

export type Stop = {
  id: string;
  lat: number;
  lon: number;
  style: {
    colors: string[];
  };
  direction: number;
};
