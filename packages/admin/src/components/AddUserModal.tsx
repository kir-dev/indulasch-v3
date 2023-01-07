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
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useKioskContext } from '../context/kiosk.context';
import { KioskUserForm } from '../types/users.type';
import { KioskRoleNames } from '../types/types';
import { useChangeRole } from '../network/useChangeRole.network';
import { isAxiosError } from 'axios';
import { l } from '../utils/language';

const validationSchema = Yup.object().shape({
  mail: Yup.string().email('E-mail cím kell ide, nem más').required('Mindenkit nem akarsz meghívni.'),
  role: Yup.number().required('Jogosultság kellene'),
});

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const { selectedKioskId } = useKioskContext();
  const { isLoading, makeRequest, isError } = useChangeRole(selectedKioskId || '');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<KioskUserForm>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (values: KioskUserForm) => {
    makeRequest(values, onClose, (err) => {
      if (isAxiosError(err) && err.response?.status === 404) {
        setError('mail', { message: l('addUserModal.error.notFound') });
      }
    });
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{l('addUserModal.header')}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <FormControl isInvalid={!!errors.mail}>
                <FormLabel>{l('addUserModal.label.email')}</FormLabel>
                <Input {...register('mail')} />
                {!!errors.mail && <FormErrorMessage>{errors.mail.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={!!errors.role}>
                <FormLabel>{l('addUserModal.label.role')}</FormLabel>
                <Select {...register('role')}>
                  {Object.entries(KioskRoleNames).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
                {!!errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>}
              </FormControl>
              {isError && <FormErrorMessage>{l('form.validation.email')}</FormErrorMessage>}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button isLoading={isLoading} type='submit'>
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
