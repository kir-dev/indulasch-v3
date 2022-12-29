import {
  Badge,
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
} from '@chakra-ui/react';
import { Message, MessageKinds } from '../types/message.types';
import { TbAlertTriangle, TbCheckbox, TbEdit, TbInfoCircle, TbSmartHome, TbTrash } from 'react-icons/tb';

interface MessageListItemProps {
  message: Message;
  onEditMessage: () => void;
  onDeleteMessage: () => void;
}

export function MessageListItem({ message, onEditMessage, onDeleteMessage }: MessageListItemProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <HStack justifyContent='space-between' p={3} backgroundColor={bgColor} borderRadius='lg' w='100%'>
      <HStack overflow='hidden'>
        <HStack>
          <MessageKindIcon kind={message.kind} />
        </HStack>
        <Text isTruncated fontSize={20}>
          {message.text}
        </Text>
      </HStack>
      <HStack>
        <MessageStatusBadge from={new Date(message.from)} until={new Date(message.until)} />
        <ButtonGroup>
          <Button variant='ghost' onClick={onEditMessage}>
            <TbEdit />
          </Button>
          <Button variant='ghost' onClick={onOpen} colorScheme='red'>
            <TbTrash />
          </Button>
        </ButtonGroup>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Biztosan törlöd?</ModalHeader>
          <ModalFooter>
            <ButtonGroup>
              <Button onClick={onDeleteMessage} colorScheme='red' variant='ghost'>
                Törlés
              </Button>
              <Button onClick={onClose} colorScheme='red'>
                Mégse
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
}

function MessageKindIcon({ kind }: { kind: MessageKinds }) {
  switch (kind) {
    case MessageKinds.FUN:
      return <TbSmartHome size={30} color='purple' />;
    case MessageKinds.INFO:
      return <TbInfoCircle size={30} color='dodgerblue' />;
    case MessageKinds.SUCCESS:
      return <TbCheckbox size={30} color='lightgreen' />;
    case MessageKinds.WARNING:
      return <TbAlertTriangle size={30} color='orange' />;
    default:
      return null;
  }
}

function MessageStatusBadge({ from, until }: { from: Date; until: Date }) {
  const currentDate = new Date();
  if (new Date(from) > currentDate) {
    return <Badge>Időzített</Badge>;
  } else if (new Date(until) > currentDate) {
    return <Badge colorScheme='green'>Aktuális</Badge>;
  }
  return <Badge colorScheme='red'>Lejárt</Badge>;
}
