import { Page } from '../layout/Page';
import { CardBody, VStack } from '@chakra-ui/react';
import { NavButton } from '../components/NavButton';
import { ApiPaths } from '../config/paths.config';
import { API_BASE_URL } from '../config/environment.config';

export function SsoLoginPage() {
  return (
    <Page title='Bejelentkezés' maxW='md'>
      <CardBody>
        <VStack>
          <NavButton to={API_BASE_URL + ApiPaths.LOGIN} external>
            AuthSch
          </NavButton>
        </VStack>
      </CardBody>
    </Page>
  );
}
