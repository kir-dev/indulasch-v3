import { Button, ButtonGroup, CardBody, CardFooter, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';

import { WidgetGrid } from '../components/widget/WidgetGrid';
import { useKioskContext } from '../context/kiosk.context';
import { Page } from '../layout/Page';
import { useSaveKiosk } from '../network/useSaveKiosk.network';
import { l } from '../utils/language';

export function WidgetsPage() {
  const { kiosk, update, selectedKioskId } = useKioskContext();
  const { isLoading, isError, makeRequest } = useSaveKiosk(selectedKioskId || '');
  const [widgets, setWidgets] = useState(kiosk?.config.widgets);
  const onSave = () => {
    makeRequest({ widgets }, update);
  };
  return (
    <Page title={l('title.widgets')} isLoading={isLoading}>
      <CardBody>
        <WidgetGrid widgets={widgets || []} onChange={setWidgets} />
        {isError && <FormErrorMessage>{l('error.save')}</FormErrorMessage>}
      </CardBody>
      <CardFooter>
        <ButtonGroup justifyContent='space-between' w='100%'>
          <Button isLoading={isLoading} onClick={onSave}>
            {l('button.save')}
          </Button>
          {/*<Button onClick={() => setWidgets(kiosk?.config.widgets)} variant='link'>*/}
          {/*  Módosítások elvetése*/}
          {/*</Button>*/}
        </ButtonGroup>
      </CardFooter>
    </Page>
  );
}
