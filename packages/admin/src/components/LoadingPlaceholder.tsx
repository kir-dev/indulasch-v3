import { LoadingSpinner } from './LoadingSpinner';
import { Page } from '../layout/Page';
import { MainLayout } from '../layout/MainLayout';
import { CardBody, Center } from '@chakra-ui/react';
import { l } from '../utils/language';

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
