import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { WidgetConfig, WidgetName } from '../types/kiosk.types';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

type WidgetPatchDto = Partial<Omit<WidgetConfig, 'grid'>> & { name: WidgetName };

export function useSaveWidget(kioskId: string) {
  return useNetwork((body: WidgetPatchDto) => {
    return axios.patch(joinPath(ApiPaths.KIOSK, kioskId, 'widget'), body);
  });
}
