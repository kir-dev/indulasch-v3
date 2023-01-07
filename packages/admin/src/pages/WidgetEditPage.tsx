import { Page } from '../layout/Page';
import { CardBody, Flex } from '@chakra-ui/react';
import { useKioskContext } from '../context/kiosk.context';
import { WidgetListItem } from '../components/widget/WidgetListItem';
import { l } from '../utils/language';

export function WidgetEditPage() {
  const { kiosk } = useKioskContext();
  return (
    <Page title={l('title.widgetEdit')}>
      <CardBody>
        <Flex gap={3} w='fit-content'>
          {kiosk?.config.widgets.map((widget, index) => (
            <WidgetListItem widget={widget} key={index} />
          ))}
        </Flex>
      </CardBody>
    </Page>
  );
}
