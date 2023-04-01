import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { MessageForm } from '../types/message.types';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useSaveMessage(kioskId: string, messageId: string) {
  return useNetwork((body: MessageForm) => {
    return axios.patch(joinPath(ApiPaths.KIOSK, kioskId, 'message', messageId), body);
  });
}
