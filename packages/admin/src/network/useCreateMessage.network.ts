import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { MessageForm } from '../types/message.types';
import { joinPath } from '../utils/path';

export function useCreateMessage(kioskId: string) {
  return useNetwork((body: MessageForm) => {
    return axios.post(joinPath(ApiPaths.KIOSK, kioskId, 'message'), body);
  });
}
