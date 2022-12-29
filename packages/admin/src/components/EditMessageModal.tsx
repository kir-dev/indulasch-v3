import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from '@chakra-ui/react';
import { Message, MessageForm, MessageKinds } from '../types/message.types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useKioskContext } from '../context/kiosk.context';
import { useCreateMessage } from '../network/useCreateMessage.network';
import { useSaveMessage } from '../network/useSaveMessage.network';

const validationSchema = Yup.object().shape({
  text: Yup.string().required('Valamit azért ki kellene írni.'),
  kind: Yup.string().required('Enélkül kicsit személytelen.'),
  from: Yup.date().required('Enélkül nem fog megjelenni...').typeError('Dátumot kellene írni.'),
  until: Yup.date().required('Semmi se örök...').typeError('Dátumot kellene írni.'),
});

interface EditMessageModalProps {
  message?: Message;
  isOpen: boolean;
  onClose: () => void;
}

export function EditMessageModal({ message, isOpen, onClose }: EditMessageModalProps) {
  const { selectedKioskId } = useKioskContext();
  const { isLoading: isCreateLoading, makeRequest: createMessage } = useCreateMessage(selectedKioskId || '');
  const { isLoading: isSaveLoading, makeRequest: saveMessage } = useSaveMessage(
    selectedKioskId || '',
    message?._id || ''
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Message>({ defaultValues: message, resolver: yupResolver(validationSchema) });
  useEffect(() => {
    reset(message);
  }, [message]);
  const onSubmit = (values: MessageForm) => {
    if (message) {
      saveMessage(values, onClose);
    } else {
      createMessage(values, onClose);
    }
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{message ? 'Üzenet szerkesztése' : 'Új üzenet'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Üzenet</FormLabel>
                <Input {...register('text')} />
                {!!errors.text && <FormErrorMessage>{errors.text.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>Típus</FormLabel>
                <Select {...register('kind')}>
                  <option value={MessageKinds.INFO}>Infó</option>
                  <option value={MessageKinds.SUCCESS}>Siker</option>
                  <option value={MessageKinds.WARNING}>Figyelmeztetés</option>
                  <option value={MessageKinds.FUN}>Móka</option>
                </Select>
                {!!errors.kind && <FormErrorMessage>{errors.kind.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>Megjelenítve ettől</FormLabel>
                <Input {...register('from')} type='datetime-local' />
                {!!errors.from && <FormErrorMessage>{errors.from.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>Megjelenítve eddig</FormLabel>
                <Input {...register('until')} type='datetime-local' />
                {!!errors.until && <FormErrorMessage>{errors.until.message}</FormErrorMessage>}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button isLoading={isCreateLoading || isSaveLoading} type='submit'>
                Mentés
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Mégse
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
