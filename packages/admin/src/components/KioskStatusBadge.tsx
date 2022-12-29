import { Badge } from '@chakra-ui/react';
import { checkThreshold } from '../utils/checkThreshold';

export function KioskStatusBadge({ date }: { date?: string }) {
  if (!date) return <Badge colorScheme='black'>Ismeretlen</Badge>;
  if (checkThreshold(date)) {
    return <Badge colorScheme='red'>Probléma</Badge>;
  }
  return <Badge colorScheme='green'>Egészséges</Badge>;
}
