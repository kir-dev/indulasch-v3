import {
  Button,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { UIPaths } from '../config/paths.config';
import { useAuthContext } from '../context/auth.context';
import { Page } from '../layout/Page';
import { useCreateKiosk } from '../network/useCreateKiosk';
import { CreateKioskForm } from '../types/types';
import { l } from '../utils/language';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(l('form.validation.required')),
});

export function NewKioskPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateKioskForm>({ resolver: yupResolver(validationSchema) });
  const { fetchUser } = useAuthContext();
  const { makeRequest, isLoading, isError } = useCreateKiosk();
  const navigate = useNavigate();
  const onSubmit = (values: CreateKioskForm) => {
    makeRequest(values, async () => {
      await fetchUser();
      navigate(UIPaths.ROOT);
    });
  };
  return (
    <Page title={l('title.newKiosk')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={Boolean(errors.name?.message)}>
              <FormLabel>{l('page.newKiosk.name')}</FormLabel>
              <Input {...register('name', { required: true })} />
              {errors.name?.message && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}
            </FormControl>
            {isError && <Text color='red'>{l('error.create')}</Text>}
          </VStack>
        </CardBody>
        <CardFooter>
          <Button isLoading={isLoading} type='submit'>
            {l('button.create')}
          </Button>
        </CardFooter>
      </form>
    </Page>
  );
}
