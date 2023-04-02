import { Button, CardBody, CardFooter, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { EditMessageModal } from '../components/EditMessageModal';
import { MessageListItem } from '../components/MessageListItem';
import { useKioskContext } from '../context/kiosk.context';
import { Page } from '../layout/Page';
import { useDeleteMessage } from '../network/useDeleteMessage.network';
import { useMessages } from '../network/useMessages.network';
import { Message } from '../types/message.types';
import { l } from '../utils/language';

export function MessagesPage() {
  const { selectedKioskId } = useKioskContext();
  const { isLoading, data, makeRequest } = useMessages(selectedKioskId || '');
  const { isLoading: isDeleteLoading, makeRequest: deleteRequest } = useDeleteMessage(selectedKioskId || '');
  const [selectedMessage, setSelectedMessage] = useState<Message>();
  useEffect(() => {
    makeRequest(undefined);
  }, [selectedKioskId]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const onDelete = (id: string) => {
    deleteRequest(id, () => {
      makeRequest(undefined);
    });
  };
  return (
    <Page title={l('title.messages')} isLoading={isLoading || isDeleteLoading}>
      <CardBody>
        <VStack w='100%'>
          {data?.map((msg) => (
            <MessageListItem
              onEditMessage={() => {
                setSelectedMessage(msg);
                onOpen();
              }}
              onDeleteMessage={() => {
                onDelete(msg._id);
              }}
              message={msg}
              key={msg._id}
            />
          ))}
        </VStack>
      </CardBody>
      <CardFooter>
        <Button onClick={onOpen}>{l('page.messages.newMessage')}</Button>
      </CardFooter>
      <EditMessageModal
        isOpen={isOpen}
        message={selectedMessage}
        onClose={() => {
          setSelectedMessage(undefined);
          makeRequest(undefined);
          onClose();
        }}
      />
    </Page>
  );
}
