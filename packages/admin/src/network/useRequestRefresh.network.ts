import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useRequestRefreshNetwork(kioskId: string) {
  return useNetwork(() => {
    return axios.post(joinPath(ApiPaths.KIOSK, kioskId, 'refresh'));
  });
}
