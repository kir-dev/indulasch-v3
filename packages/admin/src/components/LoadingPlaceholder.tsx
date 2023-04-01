import { CardBody, Center } from '@chakra-ui/react';

import { MainLayout } from '../layout/MainLayout';
import { Page } from '../layout/Page';
import { l } from '../utils/language';
import { LoadingSpinner } from './LoadingSpinner';

export function LoadingPlaceholder() {
  return (
    <MainLayout>
      <Page title={l('title.loading')} w='fit-content'>
        <CardBody>
          <Center>
            <LoadingSpinner />
          </Center>
        </CardBody>
      </Page>
    </MainLayout>
  );
}
