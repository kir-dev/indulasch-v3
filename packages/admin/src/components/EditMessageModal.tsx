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
import { DefaultMessage, Message, MessageForm, MessageKinds } from '../types/message.types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useKioskContext } from '../context/kiosk.context';
import { useCreateMessage } from '../network/useCreateMessage.network';
import { useSaveMessage } from '../network/useSaveMessage.network';
import { l } from '../utils/language';

const validationSchema = Yup.object().shape({
  text: Yup.string().required(l('form.validation.required')),
  kind: Yup.string().required(l('form.validation.required')),
  from: Yup.date().required(l('form.validation.required')).typeError(l('form.validation.date')),
  until: Yup.date().required(l('form.validation.required')).typeError(l('form.validation.date')),
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
  } = useForm<MessageForm>({ defaultValues: message, resolver: yupResolver(validationSchema) });
  useEffect(() => {
    reset(DefaultMessage);
    reset(message);
  }, [message]);
  const onSubmit = (values: Message | MessageForm) => {
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
        <ModalHeader>{message ? l('editMessage.header.edit') : l('editMessage.header.new')}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>{l('editMessage.label.text')}</FormLabel>
                <Input {...register('text')} />
                {!!errors.text && <FormErrorMessage>{errors.text.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>{l('editMessage.label.type')}</FormLabel>
                <Select {...register('kind')}>
                  <option value={MessageKinds.INFO}>{l('editMessage.type.info')}</option>
                  <option value={MessageKinds.SUCCESS}>{l('editMessage.type.success')}</option>
                  <option value={MessageKinds.WARNING}>{l('editMessage.type.warning')}</option>
                  <option value={MessageKinds.FUN}>{l('editMessage.type.fun')}</option>
                </Select>
                {!!errors.kind && <FormErrorMessage>{errors.kind.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>{l('editMessage.label.from')}</FormLabel>
                <Input {...register('from')} type='datetime-local' />
                {!!errors.from && <FormErrorMessage>{errors.from.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>{l('editMessage.label.until')}</FormLabel>
                <Input {...register('until')} type='datetime-local' />
                {!!errors.until && <FormErrorMessage>{errors.until.message}</FormErrorMessage>}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button isLoading={isCreateLoading || isSaveLoading} type='submit'>
                {l('button.save')}
              </Button>
              <Button variant='ghost' onClick={onClose}>
                {l('button.cancel')}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
