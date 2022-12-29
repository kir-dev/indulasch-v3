import { Page } from '../layout/Page';
import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  VStack,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleForm } from '../types/types';
import { useKioskContext } from '../context/kiosk.context';
import { l } from '../utils/language';
import { ColorPickerField } from '../components/ColorPicker';
import { useSaveKiosk } from '../network/useSaveKiosk.network';
import { Style } from '../types/kiosk.types';

export function StylePage() {
  const { kiosk, update, selectedKioskId } = useKioskContext();
  const { isLoading, isError, makeRequest } = useSaveKiosk(selectedKioskId || '');
  const style = kiosk?.config.style;
  const defaultValues = { mode: style?.mode, ...style?.colors };
  const formProperties = useForm<StyleForm>({
    defaultValues: defaultValues,
  });
  const onSubmit = (values: StyleForm) => {
    const dto: Style = { mode: values.mode, colors: { ...values } };
    makeRequest({ style: dto }, update);
  };
  return (
    <Page title='Megjelenés' isLoading={isLoading}>
      <FormProvider {...formProperties}>
        <form onSubmit={formProperties.handleSubmit(onSubmit)}>
          <CardBody>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>Téma</FormLabel>
                <Select {...formProperties.register('mode')}>
                  <option value='dark'>Sötét</option>
                  <option value='light'>Világos</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Témaszín</FormLabel>
                <ColorPickerField name='brand' />
              </FormControl>
              <FormControl>
                <FormLabel>Háttérszín</FormLabel>
                <ColorPickerField name='background' />
              </FormControl>
              <FormControl>
                <FormLabel>Csempék színe</FormLabel>
                <ColorPickerField name='tile' />
              </FormControl>
              <FormControl>
                <FormLabel>Fő betűszín</FormLabel>
                <ColorPickerField name='fontPrimary' />
              </FormControl>
              <FormControl>
                <FormLabel>Másodlagos betűszín</FormLabel>
                <ColorPickerField name='fontSecondary' />
              </FormControl>
            </VStack>
            {isError && <FormErrorMessage>{l('error.saveSettings')}</FormErrorMessage>}
          </CardBody>
          <CardFooter>
            <ButtonGroup justifyContent='space-between' w='100%'>
              <Button isLoading={isLoading} type='submit'>
                Mentés
              </Button>
              <Button onClick={() => formProperties.reset(defaultValues)} variant='link'>
                Módosítások elvetése
              </Button>
            </ButtonGroup>
          </CardFooter>
        </form>
      </FormProvider>
    </Page>
  );
}
