import {
  Button,
  ButtonGroup,
  HStack,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { TbClipboard, TbTrash } from 'react-icons/tb';

import { ApiKey } from '../types/apiKeys.type';
import { KioskRoleNames, KioskRoles } from '../types/types';
import { l } from '../utils/language';

interface ApiKeyListItemProps {
  apiKey: ApiKey;
  onDeleteApiKey: () => void;
  onChangeRole: (role: KioskRoles) => void;
}

export function ApiKeyListItem({ apiKey, onDeleteApiKey, onChangeRole }: ApiKeyListItemProps) {
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
        <Text isTruncated>{apiKey.name}</Text>
      </HStack>
      <HStack display={['none', null, 'flex']} overflow='hidden'>
        <Text isTruncated>{apiKey.key}</Text>
      </HStack>
      <Select w='fit-content' defaultValue={apiKey.role} onChange={(evt) => onChangeRole(parseInt(evt.target.value))}>
        {Object.entries(KioskRoleNames)
          .filter(([key]) => parseInt(key) <= KioskRoles.EDITOR)
          .map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
      </Select>
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
