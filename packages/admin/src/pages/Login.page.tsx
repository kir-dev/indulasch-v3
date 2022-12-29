import { Page } from '../layout/Page';
import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NavButton } from '../components/NavButton';
import { ApiPaths, UIPaths } from '../config/paths.config';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../types/types';
import { useAuthContext } from '../context/auth.context';
import axios, { isAxiosError } from 'axios';
import { LoginResponseDto } from '../types/dto.types';
import { useState } from 'react';
import { l } from '../utils/language';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Így nehéz lesz kitalálni ki is vagy.'),
  password: Yup.string().required('Jelszó azért kellene.'),
});

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({ resolver: yupResolver(validationSchema) });
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const onSubmit = ({ username, password }: LoginCredentials) => {
    axios
      .post<LoginResponseDto>(ApiPaths.LOGIN, { username, password })
      .then((res) => {
        login(res.data.access_token);
      })
      .catch((err) => {
        if (isAxiosError(err) && err.response?.status === 401) {
          setError(l('error.wrongCredentials'));
        } else {
          setError(l('error.auth'));
        }
        setLoading(false);
      });
  };
  return (
    <Page title='Bejelentkezés' maxW='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={!!errors.password?.message}>
              <FormLabel>Felhasználónév</FormLabel>
              <Input {...register('username', { required: true })} />
              {errors.username?.message && <FormErrorMessage>{errors.username?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.password?.message}>
              <FormLabel>Jelszó</FormLabel>
              <Input {...register('password', { required: true })} type='password' />
              {errors.password?.message && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
            </FormControl>
            {!!error && <Text color='red'>{error}</Text>}
          </VStack>
        </CardBody>
        <CardFooter>
          <ButtonGroup justifyContent='space-between' w='100%'>
            <Button isLoading={loading} type='submit'>
              Nyomás!
            </Button>
            <NavButton to={UIPaths.REGISTER} variant='link'>
              Regisztráció
            </NavButton>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Page>
  );
}
