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
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useKioskContext } from '../context/kiosk.context';
import { useCreateMessage } from '../network/useCreateMessage.network';
import { useSaveMessage } from '../network/useSaveMessage.network';
import { DefaultMessage, Message, MessageForm, MessageKinds } from '../types/message.types';
import { l } from '../utils/language';

const validationSchema = z.object({
  text: z.string({ required_error: l('form.validation.required') }),
  kind: z.string({ required_error: l('form.validation.required') }),
  from: z.date({ required_error: l('form.validation.required') }),
  until: z.date({ required_error: l('form.validation.required') }),
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
  } = useForm<MessageForm>({ defaultValues: message, resolver: zodResolver(validationSchema) });
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
                {Boolean(errors.text) && <FormErrorMessage>{errors.text?.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>{l('editMessage.label.type')}</FormLabel>
                <Select {...register('kind')}>
                  <option value={MessageKinds.INFO}>{l('editMessage.type.info')}</option>
                  <option value={MessageKinds.SUCCESS}>{l('editMessage.type.success')}</option>
                  <option value={MessageKinds.WARNING}>{l('editMessage.type.warning')}</option>
                  <option value={MessageKinds.FUN}>{l('editMessage.type.fun')}</option>
                </Select>
                {Boolean(errors.kind) && <FormErrorMessage>{errors.kind?.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>{l('editMessage.label.from')}</FormLabel>
                <Input {...register('from')} type='datetime-local' />
                {Boolean(errors.from) && <FormErrorMessage>{errors.from?.message}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>{l('editMessage.label.until')}</FormLabel>
                <Input {...register('until')} type='datetime-local' />
                {Boolean(errors.until) && <FormErrorMessage>{errors.until?.message}</FormErrorMessage>}
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
