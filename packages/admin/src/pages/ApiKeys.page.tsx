import { Alert, AlertIcon, Button, CardBody, CardFooter, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { AddApiKeyModal } from '../components/AddApiKeyModal';
import { ApiKeyListItem } from '../components/ApiKeyListItem';
import { useKioskContext } from '../context/kiosk.context';
import { Page } from '../layout/Page';
import { useDeleteApiKey } from '../network/useDeleteApiKey.network';
import { useKioskApiKeys } from '../network/useKioskApiKeys.network';
import { l } from '../utils/language';

export function ApiKeysPage() {
  const { selectedKioskId } = useKioskContext();
  const { isLoading, data, makeRequest } = useKioskApiKeys(selectedKioskId ?? '');
  const deleteApiKey = useDeleteApiKey(selectedKioskId ?? '');
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    makeRequest(undefined);
  }, [selectedKioskId]);

  const onDelete = (id: string) => {
    deleteApiKey.makeRequest(id, () => makeRequest(undefined));
  };

  return (
    <Page title={l('title.apiKeys')} isLoading={isLoading || deleteApiKey.isLoading}>
      <CardBody>
        <Alert mb={5} status='warning'>
          <AlertIcon />
          {l('page.apiKeys.warning')}
        </Alert>
        <VStack w='100%'>
          {data?.map((apiKey) => (
            <ApiKeyListItem
              key={apiKey._id}
              apiKey={apiKey}
              onDeleteApiKey={() => {
                onDelete(apiKey._id);
              }}
            />
          ))}
        </VStack>
      </CardBody>
      <CardFooter>
        <Button onClick={onOpen}>{l('page.apiKeys.newApiKey')}</Button>
        <AddApiKeyModal
          isOpen={isOpen}
          onClose={() => {
            makeRequest(undefined);
            onClose();
          }}
        />
      </CardFooter>
    </Page>
  );
}
