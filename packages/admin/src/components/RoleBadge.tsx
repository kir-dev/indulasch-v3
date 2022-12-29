import { Badge } from '@chakra-ui/react';
import { KioskRoleNames, KioskRoles } from '../types/types';

export function RoleBadge({ role }: { role: KioskRoles }) {
  let color = 'gray';
  switch (role) {
    case KioskRoles.MARKETING:
      color = 'blue';
      break;
    case KioskRoles.EDITOR:
      color = 'orange';
      break;
    case KioskRoles.OWNER:
      color = 'purple';
      break;
  }
  return <Badge colorScheme={color}>{KioskRoleNames[role]}</Badge>;
}
