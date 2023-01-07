import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { Message } from '../types/message.types';
import { joinPath } from '../utils/path';

export function useMessages(kioskId: string) {
  return useNetwork(() => {
    return axios.get<Message[]>(joinPath(ApiPaths.KIOSK, kioskId, 'message'));
  });
}
