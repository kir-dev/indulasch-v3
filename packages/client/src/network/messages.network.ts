import axios from 'axios';
import { useQuery } from 'react-query';

import { API_URL } from '../config/environment.config';
import { Message } from '../types/message.type';
import { QueryKeys } from '../types/misc.type';
import { useKioskIdFromPath } from '../utils/useKioskIdFromPath';

export function useMessages() {
  const id = useKioskIdFromPath();

  const url = new URL(`${API_URL}/${id}/messages`);

  return useQuery<Message[], Error>(QueryKeys.MESSAGES, async () => {
    const { data } = await axios.get<Message[]>(url.toString());
    return data;
  });
}
