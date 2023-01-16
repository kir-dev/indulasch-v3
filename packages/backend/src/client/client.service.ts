import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DepartureQueryDto } from '../types/client.types';
import axios from 'axios';
import { ApiResponse, Departure, FutarAPI } from '../types/departure.types';
import { decode } from 'html-entities';
import { ConfigService } from '@nestjs/config';
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
    const url = this.apiUrl;
    url.searchParams.append('radius', radius.toString());
    url.searchParams.append('lon', lon);
    url.searchParams.append('lat', lat);
    url.searchParams.append('clientLon', lon);
    url.searchParams.append('clientLat', lat);
    return url;
  }
  async getDepartures(query: DepartureQueryDto) {
    const url = this.getUrl(query).toString();
    const response = await axios.get<FutarAPI>(url);

    const apiResponse: ApiResponse = { departures: [] };

    try {
      const { list, references } = response.data.data;

      list?.forEach(({ stopTimes, headsign, routeId }) => {
        stopTimes?.forEach(({ departureTime, predictedDepartureTime, alertIds }) => {
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
