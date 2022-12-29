import { KioskRoles } from '../types/types';
import { Stat, StatNumber, useColorModeValue } from '@chakra-ui/react';
import { useKioskContext } from '../context/kiosk.context';
import { RoleBadge } from './RoleBadge';

interface KioskGridItemProps {
  name: string;
  id: string;
  role: KioskRoles;
}
export function KioskListItem({ name, id, role }: KioskGridItemProps) {
  const { setSelectedKiosk } = useKioskContext();
  const color = useColorModeValue('gray.300', 'gray.600');
  return (
    <Stat
      onClick={() => setSelectedKiosk(id)}
      borderColor={color}
      cursor='pointer'
      _hover={{ backgroundColor: color }}
      borderRadius='lg'
      borderWidth='0.1rem'
      p={10}
    >
      <StatNumber>{name}</StatNumber>
      <RoleBadge role={role} />
    </Stat>
  );
}
