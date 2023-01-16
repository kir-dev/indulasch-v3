import { useQuery } from 'react-query';
import axios from 'axios';
import { useConfig } from '../layout/ConfigContext';
import { DeparturesConfig } from '../types/widget.type';
import { QueryKeys } from '../types/misc.type';
import { DepartureDto } from '../types/widget/departures.type';
import { API_URL } from '../config/environment.config';

export function useDepartureQuery(config: DeparturesConfig) {
  const {
    config: {
      meta: { coordinates },
    },
  } = useConfig();

  const url = new URL(API_URL + '/departures');

  return useQuery<DepartureDto, Error>(QueryKeys.DEPARTURE, async () => {
    const { data } = await axios.post<DepartureDto>(url.toString(), {
      ...coordinates,
      radius: config.radius,
    });
    return data;
  });
}
