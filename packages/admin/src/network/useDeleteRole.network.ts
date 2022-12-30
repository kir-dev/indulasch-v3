import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';

export function useDeleteRole(kioskId: string) {
  return useNetwork((body: string) => {
    return axios.delete(`${ApiPaths.KIOSK}/${kioskId}/role/${body}`);
  });
}
