import { Badge } from '@chakra-ui/react';

import { checkThreshold } from '../utils/checkThreshold';
import { l } from '../utils/language';

export function KioskStatusBadge({ date }: { date?: string }) {
  if (!date) return <Badge colorScheme='black'>{l('statusBadge.unknown')}</Badge>;
  if (checkThreshold(date)) {
    return <Badge colorScheme='red'>{l('statusBadge.problem')}</Badge>;
  }
  return <Badge colorScheme='green'>{l('statusBadge.healthy')}</Badge>;
}
