export type DepartureDto = {
  departures: Departure[];
};

export type Departure = {
  type: string;
  style: Style;
  headsign: string;
  scheduled: number;
  predicted: number;
  alert: string;
  isDelayed: boolean;
  departureText: string;
  stopId: string;
};

export type Alert = {
  routes: Style[];
  header: string;
  description: string;
  start: number;
  end: number;
};

export interface Style {
  color: string;
  icon: Icon;
  vehicleIcon: VehicleIcon;
}

export interface Icon {
  type: string;
  text: string;
  textColor: string;
}

export interface VehicleIcon {
  name: string;
}

export const VehicleIcons = {
  TRAM: 'tram',
  BUS: 'bus',
  SUBWAY: 'subway',
  TROLLEYBUS: 'trolleybus',
  NIGHT_BUS: 'night-bus',
  SUBURBAN_RAILWAY: 'suburban_railway',
  FERRY: 'ferry',
  CHAIRLIFT: 'chairlift',
  SIKLO: 'siklo',
  AIRPLANE: 'airplane',
  RAIL: 'rail',
};
