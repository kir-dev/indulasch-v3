import { Stat, StatNumber, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useKioskContext } from '../context/kiosk.context';
import { KioskRoles } from '../types/types';
import { RoleBadge } from './RoleBadge';

interface KioskGridItemProps {
  name: string;
  id: string;
  role: KioskRoles;
}

export function KioskListItem({ name, id, role }: KioskGridItemProps) {
  const { setSelectedKiosk } = useKioskContext();
  const navigate = useNavigate();
  const color = useColorModeValue('gray.300', 'gray.600');
  return (
    <Stat
      onClick={() => {
        setSelectedKiosk(id);
        navigate('/dashboard');
      }}
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
