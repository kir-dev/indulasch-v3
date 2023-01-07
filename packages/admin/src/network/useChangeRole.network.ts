import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { KioskUserForm } from '../types/users.type';
import { joinPath } from '../utils/path';

export function useChangeRole(kioskId: string) {
  return useNetwork((body: KioskUserForm) => {
    return axios.post(joinPath(ApiPaths.KIOSK, kioskId, 'role'), body);
  });
}
