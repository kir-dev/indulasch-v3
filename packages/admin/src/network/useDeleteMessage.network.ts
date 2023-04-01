import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useDeleteMessage(kioskId: string) {
  return useNetwork((body: string) => {
    return axios.delete(joinPath(ApiPaths.KIOSK, kioskId, 'message', body));
  });
}
