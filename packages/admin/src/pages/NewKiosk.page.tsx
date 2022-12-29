import { Page } from '../layout/Page';
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
import { ApiPaths, UIPaths } from '../config/paths.config';
import { useForm } from 'react-hook-form';
import { CreateKioskForm } from '../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import axios from 'axios';
import { l } from '../utils/language';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth.context';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nem lenne szép üresen hagyni.'),
});

export function NewKioskPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateKioskForm>({ resolver: yupResolver(validationSchema) });
  const { fetchUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const onSubmit = ({ name }: CreateKioskForm) => {
    axios
      .post(ApiPaths.KIOSK, { name })
      .then(async () => {
        await fetchUser();
        navigate(UIPaths.ROOT);
      })
      .catch(() => {
        setError(l('error.createKiosk'));
        setLoading(false);
      });
  };
  return (
    <Page title='Új kioszk'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={!!errors.name?.message}>
              <FormLabel>Kioszk neve</FormLabel>
              <Input {...register('name', { required: true })} />
              {errors.name?.message && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}
            </FormControl>
            {!!error && <Text color='red'>{error}</Text>}
          </VStack>
        </CardBody>
        <CardFooter>
          <Button isLoading={loading} type='submit'>
            Létrehozom
          </Button>
        </CardFooter>
      </form>
    </Page>
  );
}
