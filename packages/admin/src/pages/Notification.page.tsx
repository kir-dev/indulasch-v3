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
  Switch,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useKioskContext } from '../context/kiosk.context';
import { Page } from '../layout/Page';
import { useSaveNotificationNetwork } from '../network/useSaveNotification.network';
import { NotificationForm } from '../types/types';
import { l } from '../utils/language';

const validationSchema = z.object({
  emailEnabled: z.boolean({ required_error: l('form.validation.required') }),
  webhookEnabled: z.boolean({ required_error: l('form.validation.required') }),
  webhookUrl: z.string().url('URL formátumú legyen!'),
});

export function NotificationPage() {
  const { kiosk, update, selectedKioskId } = useKioskContext();
  const { isLoading, isError, makeRequest } = useSaveNotificationNetwork(selectedKioskId || '');
  const notification = kiosk?.notification;
  const formProperties = useForm<NotificationForm>({
    defaultValues: {
      webhookEnabled: notification?.webhookEnabled,
      emailEnabled: notification?.emailEnabled,
      webhookUrl: notification?.webhookUrl,
    },
    resolver: zodResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = formProperties;

  const onSubmit = (values: NotificationForm) => {
    makeRequest(values, update);
  };
  return (
    <Page title={l('title.notifications')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={Boolean(errors.emailEnabled)}>
              <FormLabel>{l('page.notification.email.label')}</FormLabel>
              <Switch {...register('emailEnabled')} />
              <FormHelperText>
                <i>{l('page.notification.email.helper')}</i>
              </FormHelperText>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.webhookUrl)}>
              <FormLabel>{l('page.notification.webhookUrl.label')}</FormLabel>
              <Input {...register('webhookUrl')} />
              <FormHelperText>
                <i>{l('page.notification.webhookUrl.helper')}</i>
              </FormHelperText>
              {Boolean(errors.webhookUrl) && <FormErrorMessage>{errors.webhookUrl?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={Boolean(errors.webhookEnabled)}>
              <FormLabel>{l('page.notification.webhookEnabled.title')}</FormLabel>
              <Switch {...register('webhookEnabled')} />
            </FormControl>
          </VStack>
          {isError && <FormErrorMessage>{l('error.save')}</FormErrorMessage>}
        </CardBody>
        <CardFooter>
          <ButtonGroup justifyContent='space-between' w='100%'>
            <Button isLoading={isLoading} type='submit'>
              {l('button.save')}
            </Button>
            <Button onClick={() => reset(notification)} variant='link'>
              {l('button.reset')}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Page>
  );
}
