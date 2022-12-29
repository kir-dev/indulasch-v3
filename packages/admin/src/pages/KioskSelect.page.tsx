import { Page } from '../layout/Page';
import { useAuthContext } from '../context/auth.context';
import { CardBody, CardFooter, Flex, Heading } from '@chakra-ui/react';
import { KioskListItem } from '../components/KioskListItem';
import { NavButton } from '../components/NavButton';
import { FaPlusCircle } from 'react-icons/fa';
import { UIPaths } from '../config/paths.config';

export function KioskSelectPage() {
  const { user } = useAuthContext();
  return (
    <Page title={`Üdvözöllek, ${user?.username} 👋`}>
      <CardBody>
        <Heading mb={5} size='md'>
          A te kioszkjaid:
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
          Új Kiosk
        </NavButton>
      </CardFooter>
    </Page>
  );
}
