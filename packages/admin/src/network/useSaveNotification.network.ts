import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { NotificationForm } from '../types/types';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function useSaveNotificationNetwork(kioskId: string) {
  return useNetwork((body: NotificationForm) => {
    return axios.patch(joinPath(ApiPaths.KIOSK, kioskId, 'notification'), body);
  });
}
