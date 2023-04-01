import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { KioskConfig } from '../types/kiosk.types';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useSaveKiosk(kioskId: string) {
  return useNetwork((body: Partial<KioskConfig>) => {
    return axios.patch(joinPath(ApiPaths.KIOSK, kioskId), body);
  });
}
