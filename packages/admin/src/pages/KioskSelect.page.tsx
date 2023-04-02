import { CardBody, CardFooter, Flex, Heading } from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';

import { KioskListItem } from '../components/KioskListItem';
import { NavButton } from '../components/NavButton';
import { UIPaths } from '../config/paths.config';
import { useAuthContext } from '../context/auth.context';
import { Page } from '../layout/Page';
import { l } from '../utils/language';

export function KioskSelectPage() {
  const { user } = useAuthContext();
  return (
    <Page title={`${l('page.kioskSelect.welcome')}, ${user?.displayName} 👋`}>
      <CardBody>
        <Heading mb={5} size='md'>
          {l('page.kioskSelect.yourKiosk')}
        </Heading>
        <Flex gap={3} w='fit-content'>
          {user?.roles.map((role) => (
            <KioskListItem
              key={role.kioskId._id}
              id={role.kioskId._id}
              name={role.kioskId.config.meta.name}
              role={role.role}
            />
          ))}
        </Flex>
      </CardBody>
      <CardFooter>
        <NavButton leftIcon={<FaPlusCircle />} to={UIPaths.NEW_KIOSK}>
          {l('page.kioskSelect.newKiosk')}
        </NavButton>
      </CardFooter>
    </Page>
  );
}
