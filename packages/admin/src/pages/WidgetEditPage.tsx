import { CardBody, Wrap } from '@chakra-ui/react';

import { WidgetListItem } from '../components/widget/WidgetListItem';
import { useKioskContext } from '../context/kiosk.context';
import { Page } from '../layout/Page';
import { l } from '../utils/language';

export function WidgetEditPage() {
  const { kiosk } = useKioskContext();
  return (
    <Page title={l('title.widgetEdit')}>
      <CardBody>
        <Wrap gap={3} w='fit-content'>
          {kiosk?.config.widgets.map((widget) => <WidgetListItem widget={widget} key={widget.name} />)}
        </Wrap>
      </CardBody>
    </Page>
  );
}
