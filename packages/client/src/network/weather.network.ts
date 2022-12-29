import { useQuery } from 'react-query';
import { Weather } from '../types/widget/weather.type';
import axios from 'axios';
import { useConfig } from '../layout/ConfigContext';
import { WeatherConfig } from '../types/widget.type';
import { QueryKeys } from '../types/misc.type';

export function useWeatherQuery(config: WeatherConfig) {
  const {
    config: {
      meta: { coordinates },
    },
  } = useConfig();
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.set('lat', coordinates.lat.toString());
  url.searchParams.set('lon', coordinates.lon.toString());
  url.searchParams.set('appid', config.apiKey);

  return useQuery<Weather, Error>(QueryKeys.WEATHER, async () => {
    const { data } = await axios.get<Weather>(url.toString());
    return data;
  });
}
