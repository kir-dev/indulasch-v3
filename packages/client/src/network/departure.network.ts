import axios from 'axios';
import { useQuery } from 'react-query';

import { API_URL } from '../config/environment.config';
import { useConfig } from '../layout/ConfigContext';
import { QueryKeys } from '../types/misc.type';
import { DeparturesConfig } from '../types/widget.type';
import { DepartureDto } from '../types/widget/departures.type';

export function useDepartureQuery(config: DeparturesConfig) {
  const {
    config: {
      meta: { coordinates },
    },
  } = useConfig();

  const url = new URL(`${API_URL}/departures`);

  return useQuery<DepartureDto, Error>(QueryKeys.DEPARTURE, async () => {
    const { data } = await axios.post<DepartureDto>(url.toString(), {
      ...coordinates,
      radius: config.radius,
    });
    return data;
  });
}
