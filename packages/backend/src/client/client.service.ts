import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { decode } from 'html-entities';

import { DepartureQueryDto, MapQueryDto, RouteQueryDto } from '../types/client.types';
import {
  ApiResponse as DepartureApiResponse,
  Departure,
  FutarAPI as DeparturesFutarAPI,
} from '../types/departure.types';
import {
  ApiResponse as MapApiResponse,
  DeparturesData,
  FutarAPI as MapFutarAPI,
  RoutesData,
  VehiclesData,
} from '../types/map.types';
import { ProxyQueryDto } from '../types/proxy.types';
import { ConfigKeys } from '../utils/configuration';

@Injectable()
export class ClientService {
  private readonly departuresApiUrl: URL;
  private readonly vehiclesApiUrl: URL;
  private readonly routesApiUrl: URL;

  constructor(private configService: ConfigService) {
    const apiKey = configService.get<string>(ConfigKeys.FUTAR_API_KEY);

    this.departuresApiUrl = new URL(
      'https://go.bkk.hu/api/query/v1/ws/otp/api/where/arrivals-and-departures-for-location.json'
    );
    this.departuresApiUrl.searchParams.append('minutesBefore', '0');
    this.departuresApiUrl.searchParams.append('limit', '30');
    this.departuresApiUrl.searchParams.append('groupLimit', '1');
    this.departuresApiUrl.searchParams.append('onlyDepartures', 'true');
    this.departuresApiUrl.searchParams.append('key', apiKey);

    this.vehiclesApiUrl = new URL('https://go.bkk.hu/api/query/v1/ws/otp/api/where/vehicles-for-location.json');
    this.vehiclesApiUrl.searchParams.append('includeReferences', 'false');
    this.vehiclesApiUrl.searchParams.append('key', apiKey);

    this.routesApiUrl = new URL('https://go.bkk.hu/api/query/v1/ws/otp/api/where/multi-route-details.json');
    this.routesApiUrl.searchParams.append('includeReferences', 'false');
    this.routesApiUrl.searchParams.append('key', apiKey);
  }

  getDeparturesUrl({ lat, lon, radius }: DepartureQueryDto): URL {
    const url = new URL(this.departuresApiUrl.toString());
    url.searchParams.append('radius', radius.toString());
    url.searchParams.append('lon', lon);
    url.searchParams.append('lat', lat);
    url.searchParams.append('clientLon', lon);
    url.searchParams.append('clientLat', lat);
    return url;
  }

  getVehiclesUrl({ lat, lon, radius }: MapQueryDto): URL {
    const url = new URL(this.vehiclesApiUrl.toString());
    url.searchParams.append('radius', radius.toString());
    url.searchParams.append('lon', lon);
    url.searchParams.append('lat', lat);
    return url;
  }

  getRoutesUrl({ routeId }: RouteQueryDto): URL {
    const url = new URL(this.routesApiUrl.toString());
    routeId.forEach((id) => url.searchParams.append('routeId', id));
    return url;
  }

  async getDepartures(query: DepartureQueryDto): Promise<DepartureApiResponse> {
    const url = this.getDeparturesUrl(query).toString();
    let response: AxiosResponse<DeparturesFutarAPI>;

    try {
      response = await axios.get<DeparturesFutarAPI>(url);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch departures.');
    }

    const { list, references } = response.data.data;
    const departures: Departure[] = [];

    try {
      list?.forEach(({ stopTimes, headsign, routeId }) => {
        stopTimes?.forEach(({ departureTime, predictedDepartureTime, alertIds, stopId }) => {
          const route = references.routes[routeId];
          const departure: Departure = {
            type: route.type,
            style: route.style,
            headsign,
            scheduled: departureTime,
            predicted: predictedDepartureTime ?? departureTime,
            alert: alertIds?.map((id) => {
              const rawDescription = references.alerts[id].description.translations.hu;
              return decode(rawDescription.replace(/(\n)+/g, ' ').replace(/<\/?[^>]+(>|$)/g, ''));
            }),
            isDelayed: (predictedDepartureTime ?? departureTime) - departureTime > 180,
            departureText: '',
            stopId,
          };

          const minutes = Math.floor((departure.predicted * 1000 - Date.now()) / 60000);
          departure.departureText = minutes < 1 ? 'azonnal indul' : `${minutes} perc`;
          departures.push(departure);
        });
      });
    } catch (error) {
      throw new InternalServerErrorException('Error processing departures data.');
    }

    return { departures };
  }

  async getMap(query: MapQueryDto): Promise<MapApiResponse> {
    // Adjust departures API to include data from 30 minutes before
    const departuresUrl = this.getDeparturesUrl(query);
    departuresUrl.searchParams.set('minutesBefore', '30');
    const vehiclesUrl = this.getVehiclesUrl(query).toString();

    let departuresResponse: AxiosResponse<MapFutarAPI<DeparturesData>>;
    let vehiclesResponse: AxiosResponse<MapFutarAPI<VehiclesData>>;
    try {
      [departuresResponse, vehiclesResponse] = await Promise.all([
        axios.get<MapFutarAPI<DeparturesData>>(departuresUrl.toString()),
        axios.get<MapFutarAPI<VehiclesData>>(vehiclesUrl),
      ]);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch map data.');
    }

    const mapApiResponse: MapApiResponse = { routes: [], stops: [], vehicles: [] };

    try {
      const departuresData = departuresResponse.data.data;
      const vehiclesData = vehiclesResponse.data.data;
      const { list: departuresList, references: departuresReferences } = departuresData;
      const { list: vehiclesList } = vehiclesData;

      const routeIds = new Set<string>();
      departuresList?.forEach(({ stopTimes, routeId }) => {
        routeIds.add(routeId);
        stopTimes?.forEach(({ stopId }) => {
          const stop = departuresReferences.stops[stopId];
          if (stop) {
            mapApiResponse.stops.push(stop);
          }
        });
      });

      mapApiResponse.vehicles = vehiclesList || [];

      const routesUrl = this.getRoutesUrl({ routeId: Array.from(routeIds) }).toString();
      let routesResponse: AxiosResponse<MapFutarAPI<RoutesData>>;
      try {
        routesResponse = await axios.get<MapFutarAPI<RoutesData>>(routesUrl);
        const { list: routesList } = routesResponse.data.data;
        if (routesList) {
          mapApiResponse.routes = routesList;
        }
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch route details.');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error processing map data.');
    }

    return mapApiResponse;
  }

  async getResource(proxyQueryDto: ProxyQueryDto): Promise<any> {
    try {
      const response = await axios.get(proxyQueryDto.url);
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch resource.');
    }
  }
}
