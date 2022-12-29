import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { KioskConfig } from '../types/kiosk.types';

export function useSaveKiosk(kioskId: string) {
  return useNetwork((body: Partial<KioskConfig>) => {
    return axios.patch(ApiPaths.KIOSK + '/' + kioskId, body);
  });
}
