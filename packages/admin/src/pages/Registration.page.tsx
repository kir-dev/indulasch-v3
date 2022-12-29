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
import { RegistrationForm } from '../types/types';
import { useAuthContext } from '../context/auth.context';
import axios from 'axios';
import { LoginResponseDto } from '../types/dto.types';
import { useState } from 'react';
import { l } from '../utils/language';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('És hogy szólítsunk?'),
  password: Yup.string().min(8, 'Egy pár (8) karaktert még gépelj ide!').required('Jelszót azért állíts be!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Nem találtad el az előző mezőt.')
    .required('Biztos az előbbi a jelszó?'),
});

export function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({ resolver: yupResolver(validationSchema) });
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>();
  const onSubmit = ({ username, password }: RegistrationForm) => {
    axios
      .post<LoginResponseDto>(ApiPaths.REGISTER, { username, password })
      .then((res) => {
        login(res.data.access_token);
      })
      .catch(() => {
        setApiError(l('error.register'));
        setLoading(false);
      });
  };
  return (
    <Page title='Regisztráció' maxW='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={!!errors.password?.message}>
              <FormLabel>Felhasználónév</FormLabel>
              <Input {...register('username')} />
              {errors.username?.message && <FormErrorMessage>{errors.username?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.password?.message}>
              <FormLabel>Jelszó</FormLabel>
              <Input {...register('password')} type='password' />
              {errors.password?.message && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword?.message}>
              <FormLabel>Jelszó megerősítése</FormLabel>
              <Input {...register('confirmPassword')} type='password' />
              {errors.confirmPassword?.message && (
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
              )}
            </FormControl>
            {!!apiError && <Text color='red'>{apiError}</Text>}
          </VStack>
        </CardBody>
        <CardFooter>
          <ButtonGroup justifyContent='space-between' w='100%'>
            <Button isLoading={loading} type='submit'>
              Nyomás!
            </Button>
            <NavButton to={UIPaths.LOGIN} variant='link'>
              Bejelentkezés
            </NavButton>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Page>
  );
}
