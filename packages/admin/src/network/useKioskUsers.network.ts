import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { KioskUser } from '../types/users.type';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useKioskUsers(kioskId: string) {
  return useNetwork(() => {
    return axios.get<KioskUser[]>(joinPath(ApiPaths.KIOSK, kioskId, 'role'));
  });
}
