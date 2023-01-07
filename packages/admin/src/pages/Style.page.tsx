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
    <Page title={l('title.style')} isLoading={isLoading}>
      <FormProvider {...formProperties}>
        <form onSubmit={formProperties.handleSubmit(onSubmit)}>
          <CardBody>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>{l('page.style.label.theme')}</FormLabel>
                <Select {...formProperties.register('mode')}>
                  <option value='dark'>{l('theme.dark')}</option>
                  <option value='light'>{l('theme.light')}</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>{l('page.style.label.brand')}</FormLabel>
                <ColorPickerField name='brand' />
              </FormControl>
              <FormControl>
                <FormLabel>{l('page.style.label.background')}</FormLabel>
                <ColorPickerField name='background' />
              </FormControl>
              <FormControl>
                <FormLabel>{l('page.style.label.tile')}</FormLabel>
                <ColorPickerField name='tile' />
              </FormControl>
              <FormControl>
                <FormLabel>{l('page.style.label.fontPrimary')}</FormLabel>
                <ColorPickerField name='fontPrimary' />
              </FormControl>
              <FormControl>
                <FormLabel>{l('page.style.label.fontSecondary')}</FormLabel>
                <ColorPickerField name='fontSecondary' />
              </FormControl>
            </VStack>
            {isError && <FormErrorMessage>{l('error.save')}</FormErrorMessage>}
          </CardBody>
          <CardFooter>
            <ButtonGroup justifyContent='space-between' w='100%'>
              <Button isLoading={isLoading} type='submit'>
                {l('button.save')}
              </Button>
              <Button onClick={() => formProperties.reset(defaultValues)} variant='link'>
                {l('button.reset')}
              </Button>
            </ButtonGroup>
          </CardFooter>
        </form>
      </FormProvider>
    </Page>
  );
}
