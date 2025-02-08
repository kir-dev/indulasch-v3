export type DepartureQueryDto = {
  lat: string;
  lon: string;
  radius: number;
};

export type MapQueryDto = {
  lat: string;
  lon: string;
  radius: number;
};

export type RouteQueryDto = {
  routeId: string[];
};
