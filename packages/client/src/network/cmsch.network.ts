import axios from 'axios';
import { useQuery } from 'react-query';

import { API_URL } from '@/config/environment.config.ts';
import { QueryKeys } from '@/types/misc.type.ts';
import { CMSchEventsConfig } from '@/types/widget.type.ts';
import { EventListView } from '@/types/widget/cmsch.type.ts';

export function useCmschEventsQuery(config: CMSchEventsConfig) {
  const url = new URL(`https://${config.baseUrl}/api/events`);

  return useQuery<EventListView[], Error>(
    QueryKeys.CMSCH_EVENTS,
    async () => {
      const { data } = await axios.post<{ allEvents: EventListView[] }>(`${API_URL}/proxy`, {
        url: url.toString(),
      });
      data.allEvents.forEach((event) => {
        event.timestampStart *= 1000;
        event.timestampEnd *= 1000;
      });
      return data.allEvents;
    },
    {
      refetchInterval: 60000,
      select: (data) =>
        data.filter((event) => event.timestampEnd > Date.now()).sort((a, b) => a.timestampStart - b.timestampStart),
    }
  );
}
