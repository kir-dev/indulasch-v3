import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { KioskUser } from '../types/users.type';

export function useKioskUsers(kioskId: string) {
  return useNetwork(() => {
    return axios.get<KioskUser[]>(`${ApiPaths.KIOSK}/${kioskId}/role`);
  });
}
