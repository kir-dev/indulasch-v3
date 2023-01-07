import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { useNetwork } from '../utils/useNetwork';
import { joinPath } from '../utils/path';

export function useRequestRefreshNetwork(kioskId: string) {
  return useNetwork(() => {
    return axios.post(joinPath(ApiPaths.KIOSK, kioskId, 'refresh'));
  });
}
