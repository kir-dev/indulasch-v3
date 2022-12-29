import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { useNetwork } from '../utils/useNetwork';

export function useRequestRefreshNetwork(kioskId: string) {
  return useNetwork(() => {
    return axios.post(`${ApiPaths.KIOSK}/${kioskId}/refresh`);
  });
}
