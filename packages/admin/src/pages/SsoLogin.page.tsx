import { Page } from '../layout/Page';
import { CardBody, Text, VStack } from '@chakra-ui/react';
import { NavButton } from '../components/NavButton';
import { ApiPaths } from '../config/paths.config';
import { API_BASE_URL } from '../config/environment.config';
import { MainLayout } from '../layout/MainLayout';

export function SsoLoginPage() {
  return (
    <MainLayout>
      <Page title='Bejelentkezés' maxW='md'>
        <CardBody>
          <VStack spacing={10}>
            <Text>
              Jelentkezz be AuthSch fiókoddal! A profilod automatikusan létrejön az első bejelentkezés alkalmával.
            </Text>
            <NavButton to={API_BASE_URL + ApiPaths.LOGIN} external>
              Bejelentkezés AuthSch-val
            </NavButton>
          </VStack>
        </CardBody>
      </Page>
    </MainLayout>
  );
}
