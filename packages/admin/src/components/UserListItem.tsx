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
} from '@chakra-ui/react';
import { TbTrash } from 'react-icons/tb';

import { useAuthContext } from '../context/auth.context';
import { KioskRoleNames, KioskRoles } from '../types/types';
import { KioskUser } from '../types/users.type';
import { l } from '../utils/language';

interface UserListItemProps {
  user: KioskUser;
  onEditRole: (role: KioskRoles) => void;
  onDeleteUser: () => void;
}

export function UserListItem({ user, onDeleteUser, onEditRole }: UserListItemProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user: myUser } = useAuthContext();
  return (
    <HStack justifyContent='space-between' p={3} backgroundColor={bgColor} borderRadius='lg' w='100%'>
      <HStack overflow='hidden'>
        <Text isTruncated>{user.mail}</Text>
      </HStack>
      <Select w='fit-content' defaultValue={user.role} onChange={(evt) => onEditRole(parseInt(evt.target.value))}>
        {Object.entries(KioskRoleNames).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
      <HStack>
        <ButtonGroup>
          {myUser?.mail !== user.mail && (
            <Button variant='ghost' onClick={onOpen} colorScheme='red'>
              <TbTrash />
            </Button>
          )}
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
                  onDeleteUser();
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
