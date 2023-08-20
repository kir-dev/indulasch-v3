import {
  Alert,
  AlertIcon,
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useKioskContext } from '../context/kiosk.context';
import { useCreateApiKey } from '../network/useCreateApiKey.network';
import { CreateApiKeyDto } from '../types/apiKeys.type';
import { KioskRoleNames } from '../types/types';
import { l } from '../utils/language';

interface AddApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nem lenne szép üresen hagyni'),
  role: Yup.number().required('Jogosultság kellene'),
});

export function AddApiKeyModal({ isOpen, onClose }: AddApiKeyModalProps) {
  const { selectedKioskId } = useKioskContext();
  const { isLoading, makeRequest } = useCreateApiKey(selectedKioskId ?? '');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApiKeyDto>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: CreateApiKeyDto) => {
    makeRequest(values, onClose);
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{l('addUserModal.header')}</ModalHeader>
        <ModalCloseButton />
        <Alert status='warning'>
          <AlertIcon />
          {l('addApiKeyModal.warning')}
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>{l('addApiKeyModal.label.name')}</FormLabel>
                <Input {...register('name')} />
                {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
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
