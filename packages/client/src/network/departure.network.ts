import { useQuery } from 'react-query';
import axios from 'axios';
import { useConfig } from '../layout/ConfigContext';
import { DeparturesConfig } from '../types/widget.type';
import { QueryKeys } from '../types/misc.type';
import { DepartureDto } from '../types/widget/departures.type';

export function useDepartureQuery(config: DeparturesConfig) {
  const {
    config: {
      meta: { coordinates },
    },
  } = useConfig();

  const url = new URL('https://indula.sch.bme.hu/api');

  return useQuery<DepartureDto, Error>(QueryKeys.DEPARTURE, async () => {
    const { data } = await axios.post<DepartureDto>(url.toString(), {
      ...coordinates,
      radius: config.radius,
    });
    return data;
  });
}
