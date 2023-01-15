import { Page } from '../layout/Page';
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
import { FormProvider, useForm } from 'react-hook-form';
import { MetaForm } from '../types/types';
import { useKioskContext } from '../context/kiosk.context';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSaveKiosk } from '../network/useSaveKiosk.network';
import { l } from '../utils/language';
import { MapField } from '../components/Map';

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
              <FormControl isInvalid={!!errors.coordinates}>
                <FormLabel>{l('page.meta.label.coordinate')}</FormLabel>
                <FormHelperText>
                  <i>{l('page.meta.label.coordinateHelpText')}</i>
                </FormHelperText>
              </FormControl>
              <MapField name='coordinates' />
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>{l('page.meta.label.name')}</FormLabel>
                <Input {...register('name')} />
                {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
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
