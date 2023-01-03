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
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { MetaForm } from '../types/types';
import { useKioskContext } from '../context/kiosk.context';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSaveKiosk } from '../network/useSaveKiosk.network';
import { l } from '../utils/language';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('A nevet azért ne hagyd üresen!'),
  latitude: Yup.number()
    .required('Ez kellene még a helymeghatározáshoz.')
    .typeError('Valami ilyesminek kellene lennie: x.y'),
  longitude: Yup.number()
    .required('Ez is kellene a helymeghatározáshoz.')
    .typeError('Valami ilyesminek kellene lennie: x.y'),
});

export function MetaPage() {
  const { kiosk, update, selectedKioskId } = useKioskContext();
  const { isLoading, isError, makeRequest } = useSaveKiosk(selectedKioskId || '');
  const meta = kiosk?.config.meta;
  const defaultValues = { name: meta?.name, latitude: meta?.coordinates.lat, longitude: meta?.coordinates.lon };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MetaForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = ({ name, latitude, longitude }: MetaForm) => {
    makeRequest({ meta: { name, coordinates: { lat: latitude, lon: longitude } } }, update);
  };
  return (
    <Page title='Alapbeállítások'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Kioszk neve</FormLabel>
              <Input {...register('name')} />
              {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.latitude}>
              <FormLabel>Szélességi fok</FormLabel>
              <Input {...register('latitude')} />
              {!!errors.latitude && <FormErrorMessage>{errors.latitude.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.longitude}>
              <FormLabel>Hosszúsági fok</FormLabel>
              <Input {...register('longitude')} />
              {!!errors.longitude && <FormErrorMessage>{errors.longitude.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
          {isError && <FormErrorMessage>{l('error.saveSettings')}</FormErrorMessage>}
        </CardBody>
        <CardFooter>
          <ButtonGroup justifyContent='space-between' w='100%'>
            <Button isLoading={isLoading} type='submit'>
              Mentés
            </Button>
            <Button onClick={() => reset(defaultValues)} variant='link'>
              Módosítások elvetése
            </Button>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Page>
  );
}
