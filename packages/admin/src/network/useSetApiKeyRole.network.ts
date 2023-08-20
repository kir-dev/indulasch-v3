import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { KioskRoles } from '../types/types';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useSetApiKeyRole(kioskId: string) {
  return useNetwork(({ keyId, role }: { keyId: string; role: KioskRoles }) => {
    return axios.patch(joinPath(ApiPaths.KIOSK, kioskId, 'api-key', keyId, 'role'), { role });
  });
}
