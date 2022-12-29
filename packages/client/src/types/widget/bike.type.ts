export type BikeDto = {
  countries: NextBikeCountry[];
};

type NextBikeCountry = {
  lat: number;
  lng: number;
  zoom: number;
  name: string;
  hotline: string;
  domain: string;
  language: string;
  email: string;
  timezone: string;
  currency: string;
  country_calling_code: string;
  system_operator_address: string;
  country: string;
  country_name: string;
  terms: string;
  policy: string;
  website: string;
  show_bike_types: boolean;
  show_bike_type_groups: boolean;
  show_free_racks: boolean;
  booked_bikes: number;
  set_point_bikes: number;
  available_bikes: number;
  capped_available_bikes: boolean;
  no_registration: boolean;
  pricing: string;
  cities: NextBikeCity[];
};

type NextBikeCity = {
  uid: number;
  lat: number;
  lng: number;
  zoom: number;
  maps_icon: string;
  alias: string;
  break: boolean;
  name: string;
  num_places: number;
  refresh_rate: string;
  bounds: {
    south_west: {
      lat: number;
      lng: number;
    };
    north_east: {
      lat: number;
      lng: number;
    };
  };
  booked_bikes: number;
  set_point_bikes: number;
  available_bikes: number;
  return_to_official_only: boolean;
  bike_types: Record<string, number>;
  website: string;
  places: BikePlace[];
};

export type BikePlace = {
  uid: number;
  lat: number;
  lng: number;
  bike: boolean;
  name: string;
  address?: null;
  spot: boolean;
  number: number;
  booked_bikes: number;
  bikes: number;
  bikes_available_to_rent: number;
  bike_racks: number;
  free_racks: number;
  special_racks: number;
  free_special_racks: number;
  maintenance: boolean;
  terminal_type: string;
  bike_list?: BikeListEntity[];
  bike_numbers?: string[];
  bike_types: Record<string, number>;
  place_type: string;
  rack_locks: boolean;
};

export interface BikeListEntity {
  number: string;
  bike_type: number;
  lock_types?: string[] | null;
  active: boolean;
  state: string;
  electric_lock: boolean;
  boardcomputer: number;
  pedelec_battery?: null;
  battery_pack?: null;
}
