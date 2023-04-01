import axios from 'axios';
import { useQuery } from 'react-query';

import { QueryKeys } from '../types/misc.type';
import { SchpincerConfig } from '../types/widget.type';
import { SchPincerDto } from '../types/widget/schpincer.type';

export function useSchPincerQuery(config: SchpincerConfig) {
  const url = new URL('https://schpincer.sch.bme.hu/api/open/openings');
  url.searchParams.append('token', config.apiKey);
  return useQuery<SchPincerDto, Error>(QueryKeys.SCHPINCER, async () => {
    const { data } = await axios.get<SchPincerDto>(url.toString());
    return data;
  });
}
