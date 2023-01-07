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
  name: Yup.string().required(l('form.validation.required')),
  latitude: Yup.number().required(l('form.validation.required')).typeError(l('form.validation.number')),
  longitude: Yup.number().required(l('form.validation.required')).typeError(l('form.validation.number')),
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
    <Page title={l('title.meta')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>{l('page.meta.label.name')}</FormLabel>
              <Input {...register('name')} />
              {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.latitude}>
              <FormLabel>{l('page.meta.label.latitude')}</FormLabel>
              <Input {...register('latitude')} />
              {!!errors.latitude && <FormErrorMessage>{errors.latitude.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.longitude}>
              <FormLabel>{l('page.meta.label.longitude')}</FormLabel>
              <Input {...register('longitude')} />
              {!!errors.longitude && <FormErrorMessage>{errors.longitude.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
          {isError && <FormErrorMessage>{l('error.save')}</FormErrorMessage>}
        </CardBody>
        <CardFooter>
          <ButtonGroup justifyContent='space-between' w='100%'>
            <Button isLoading={isLoading} type='submit'>
              {l('button.save')}
            </Button>
            <Button onClick={() => reset(defaultValues)} variant='link'>
              {l('button.reset')}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Page>
  );
}
