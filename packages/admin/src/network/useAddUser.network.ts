import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { KioskUserForm } from '../types/users.type';

export function useAddUser(kioskId: string) {
  return useNetwork((body: KioskUserForm) => {
    return axios.post(`${ApiPaths.KIOSK}/${kioskId}/role`, body);
  });
}
