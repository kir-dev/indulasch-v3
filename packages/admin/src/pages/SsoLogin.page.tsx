import { CardBody, Text, VStack } from '@chakra-ui/react';

import { NavButton } from '../components/NavButton';
import { API_BASE_URL } from '../config/environment.config';
import { ApiPaths } from '../config/paths.config';
import { MainLayout } from '../layout/MainLayout';
import { Page } from '../layout/Page';
import { l } from '../utils/language';

export function SsoLoginPage() {
  return (
    <MainLayout>
      <Page title={l('title.login')} maxW='md'>
        <CardBody>
          <VStack spacing={10}>
            <Text>{l('page.login.text')}</Text>
            <NavButton to={API_BASE_URL + ApiPaths.LOGIN} external>
              {l('page.login.button')}
            </NavButton>
          </VStack>
        </CardBody>
      </Page>
    </MainLayout>
  );
}
