import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useDeleteApiKey(kioskId: string) {
  return useNetwork((keyId: string) => {
    return axios.delete(joinPath(ApiPaths.KIOSK, kioskId, 'api-key', keyId));
  });
}
