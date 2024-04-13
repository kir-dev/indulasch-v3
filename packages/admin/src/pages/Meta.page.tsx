import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { MapField } from '../components/Map';
import { useKioskContext } from '../context/kiosk.context';
import { Page } from '../layout/Page';
import { useSaveKiosk } from '../network/useSaveKiosk.network';
import { MetaForm } from '../types/types';
import { l } from '../utils/language';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(l('form.validation.required')),
});

export function MetaPage() {
  const { kiosk, update, selectedKioskId } = useKioskContext();
  const { isLoading, isError, makeRequest } = useSaveKiosk(selectedKioskId || '');
  const meta = kiosk?.config.meta;
  const formProperties = useForm<MetaForm>({
    defaultValues: meta,
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = formProperties;
  const onSubmit = (values: MetaForm) => {
    makeRequest({ meta: values }, update);
  };
  return (
    <Page title={l('title.meta')}>
      <FormProvider {...formProperties}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody>
            <VStack>
              <FormControl isInvalid={Boolean(errors.coordinates)}>
                <FormLabel>{l('page.meta.label.coordinate')}</FormLabel>
                <FormHelperText>
                  <i>{l('page.meta.label.coordinateHelpText')}</i>
                </FormHelperText>
              </FormControl>
              <MapField name='coordinates' />
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel>{l('page.meta.label.name')}</FormLabel>
                <Input {...register('name')} />
                {Boolean(errors.name) && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
              </FormControl>
            </VStack>
            {isError && <FormErrorMessage>{l('error.save')}</FormErrorMessage>}
          </CardBody>
          <CardFooter>
            <ButtonGroup justifyContent='space-between' w='100%'>
              <Button isLoading={isLoading} type='submit'>
                {l('button.save')}
              </Button>
              <Button onClick={() => reset(meta)} variant='link'>
                {l('button.reset')}
              </Button>
            </ButtonGroup>
          </CardFooter>
        </form>
      </FormProvider>
    </Page>
  );
}
