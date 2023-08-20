import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { ApiKey } from '../types/apiKeys.type';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useKioskApiKeys(kioskId: string) {
  return useNetwork(() => {
    return axios.get<ApiKey[]>(joinPath(ApiPaths.KIOSK, kioskId, 'api-key'));
  });
}
