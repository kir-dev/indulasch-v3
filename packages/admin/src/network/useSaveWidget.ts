import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { WidgetConfig, WidgetName } from '../types/kiosk.types';

type WidgetPatchDto = Partial<Omit<WidgetConfig, 'grid'>> & { name: WidgetName };

export function useSaveWidget(kioskId: string) {
  return useNetwork((body: WidgetPatchDto) => {
    return axios.patch(ApiPaths.KIOSK + '/' + kioskId + '/widget', body);
  });
}
