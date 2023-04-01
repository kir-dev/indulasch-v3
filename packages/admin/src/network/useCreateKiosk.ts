import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { CreateKioskForm } from '../types/types';
import { useNetwork } from '../utils/useNetwork';

export function useCreateKiosk() {
  return useNetwork((body: CreateKioskForm) => {
    return axios.post(ApiPaths.KIOSK, body);
  });
}
