import {
  Button,
  ButtonGroup,
  HStack,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { TbClipboard, TbTrash } from 'react-icons/tb';

import { ApiKey } from '../types/apiKeys.type';
import { KioskRoleNames } from '../types/types';
import { l } from '../utils/language';

interface ApiKeyListItemProps {
  apiKey: ApiKey;
  onDeleteApiKey: () => void;
}

export function ApiKeyListItem({ apiKey, onDeleteApiKey }: ApiKeyListItemProps) {
  const toast = useToast();
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const copy = () => {
    navigator.clipboard
      .writeText(apiKey.key)
      .then(() => toast({ status: 'success', title: l('page.apiKeys.copySuccess') }))
      .catch(() => toast({ status: 'error', title: l('page.apiKeys.copyFail') }));
  };

  return (
    <HStack justifyContent='space-between' p={3} backgroundColor={bgColor} borderRadius='lg' w='100%'>
      <HStack overflow='hidden'>
        <Text isTruncated>{apiKey.key}</Text>
      </HStack>
      <Text>{KioskRoleNames[apiKey.role]}</Text>
      <HStack>
        <ButtonGroup>
          <Button mr={1} variant='ghost' onClick={copy}>
            <TbClipboard />
          </Button>
          <Button variant='ghost' onClick={onOpen} colorScheme='red'>
            <TbTrash />
          </Button>
        </ButtonGroup>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{l('header.confirmDelete')}</ModalHeader>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={() => {
                  onDeleteApiKey();
                  onClose();
                }}
                colorScheme='red'
                variant='ghost'
              >
                {l('button.delete')}
              </Button>
              <Button onClick={onClose} colorScheme='red'>
                {l('button.cancel')}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
}
