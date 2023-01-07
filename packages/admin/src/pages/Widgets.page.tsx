import { Page } from '../layout/Page';
import { useKioskContext } from '../context/kiosk.context';
import { useSaveKiosk } from '../network/useSaveKiosk.network';
import { useState } from 'react';
import { Button, ButtonGroup, CardBody, CardFooter, FormErrorMessage } from '@chakra-ui/react';
import { l } from '../utils/language';
import { WidgetGrid } from '../components/widget/WidgetGrid';

export function WidgetsPage() {
  const { kiosk, update, selectedKioskId } = useKioskContext();
  const { isLoading, isError, makeRequest } = useSaveKiosk(selectedKioskId || '');
  const [widgets, setWidgets] = useState(kiosk?.config.widgets);
  const onSave = () => {
    makeRequest({ widgets }, update);
  };
  return (
    <Page title='Csempék' isLoading={isLoading}>
      <CardBody>
        <WidgetGrid widgets={widgets || []} onChange={setWidgets} />
        {isError && <FormErrorMessage>{l('error.saveSettings')}</FormErrorMessage>}
      </CardBody>
      <CardFooter>
        <ButtonGroup justifyContent='space-between' w='100%'>
          <Button isLoading={isLoading} onClick={onSave}>
            Mentés
          </Button>
          {/*<Button onClick={() => setWidgets(kiosk?.config.widgets)} variant='link'>*/}
          {/*  Módosítások elvetése*/}
          {/*</Button>*/}
        </ButtonGroup>
      </CardFooter>
    </Page>
  );
}
