import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { Message } from '../types/message.types';

export function useMessages(kioskId: string) {
  return useNetwork(() => {
    return axios.get<Message[]>(`${ApiPaths.KIOSK}/${kioskId}/message`);
  });
}
