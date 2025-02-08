import axios from 'axios';
import { useQuery } from 'react-query';

import { MapDto } from '@/types/widget/map.type';

import { API_URL } from '../config/environment.config';
import { useConfig } from '../layout/ConfigContext';
import { QueryKeys } from '../types/misc.type';
import { MapConfig } from '../types/widget.type';

export function useMapQuery(config: MapConfig) {
  const {
    config: {
      meta: { coordinates },
    },
  } = useConfig();

  const url = new URL(`${API_URL}/map`);

  return useQuery<MapDto, Error>(QueryKeys.MAP, async () => {
    const { data } = await axios.post<MapDto>(url.toString(), {
      ...coordinates,
      radius: config.radius,
    });
    return data;
  });
}
