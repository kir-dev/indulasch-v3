import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { decode } from 'html-entities';

import { DepartureQueryDto } from '../types/client.types';
import { ApiResponse, Departure, FutarAPI } from '../types/departure.types';
import { ConfigKeys } from '../utils/configuration';

@Injectable()
export class ClientService {
  private readonly apiUrl: URL;

  constructor(private configService: ConfigService) {
    this.apiUrl = new URL('https://go.bkk.hu/api/query/v1/ws/otp/api/where/arrivals-and-departures-for-location.json');
    this.apiUrl.searchParams.append('minutesBefore', '0');
    this.apiUrl.searchParams.append('limit', '30');
    this.apiUrl.searchParams.append('groupLimit', '1');
    this.apiUrl.searchParams.append('onlyDepartures', 'true');
    this.apiUrl.searchParams.append('key', configService.get<string>(ConfigKeys.FUTAR_API_KEY));
  }

  getUrl({ lat, lon, radius }: DepartureQueryDto) {
    const url = new URL(this.apiUrl);
    url.searchParams.append('radius', radius.toString());
    url.searchParams.append('lon', lon);
    url.searchParams.append('lat', lat);
    url.searchParams.append('clientLon', lon);
    url.searchParams.append('clientLat', lat);
    return url;
  }

  async getDepartures(query: DepartureQueryDto) {
    const url = this.getUrl(query).toString();
    let response: AxiosResponse<FutarAPI>;
    try {
      response = await axios.get<FutarAPI>(url);
    } catch (e) {
      throw new AxiosError();
    }

    const apiResponse: ApiResponse = { departures: [] };

    try {
      const { list, references } = response.data.data;

      list?.forEach(({ stopTimes, headsign, routeId }) => {
        stopTimes?.forEach(({ departureTime, predictedDepartureTime, alertIds, stopId }) => {
          const departure: Departure = {
            type: references.routes[routeId].type,
            style: references.routes[routeId].style,
            headsign: headsign,
            scheduled: departureTime,
            predicted: predictedDepartureTime || departureTime,
            alert: alertIds?.map((id) =>
              decode(
                references.alerts[id].description.translations.hu.replace(/(\n)+/g, ' ').replace(/<\/?[^>]+(>|$)/g, '')
              )
            ),
            isDelayed: (predictedDepartureTime || departureTime) - departureTime > 180,
            departureText: '',
            stopId: stopId,
          };
          const minutes = Math.floor((departure.predicted * 1000 - Date.now()) / 60000);

          departure.departureText = minutes < 1 ? 'azonnal indul' : minutes + ' perc';
          apiResponse.departures.push(departure);
        });
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
    return apiResponse;
  }
}
