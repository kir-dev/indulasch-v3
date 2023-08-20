import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { CreateApiKeyDto } from '../types/apiKeys.type';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useCreateApiKey(kioskId: string) {
  return useNetwork((body: CreateApiKeyDto) => {
    return axios.post(joinPath(ApiPaths.KIOSK, kioskId, 'api-key'), body);
  });
}
