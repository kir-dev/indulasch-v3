import { useMemo, useState } from 'react';

import { Widget } from '../../layout/Widget';
import { useSchPincerQuery } from '../../network/schpincer.network';
import { SchpincerConfig } from '../../types/widget.type';
import { useInterval } from '../../utils/useInterval';
import { useWidgetConfig } from '../../utils/useWidgetConfig';
import { WidgetDescription, WidgetHeading, WidgetText } from '../Text';

export function SchPincerWidget() {
  const config = useWidgetConfig<SchpincerConfig>('schpincer');
  const { data, error, refetch } = useSchPincerQuery(config);
  const [shownIndex, setShownIndex] = useState(0);
  useInterval(() => {
    if (data && shownIndex + 1 < (data?.length ?? 0)) {
      setShownIndex(shownIndex + 1);
    } else {
      setShownIndex(0);
      refetch();
    }
  }, 10000);
  const shownOpening = useMemo(() => {
    return data?.[shownIndex];
  }, [data, shownIndex]);
  if (!data || error) {
    return (
      <Widget grid={config.grid}>
        <WidgetDescription>SchPincér hiba</WidgetDescription>
      </Widget>
    );
  } else if (shownOpening) {
    return (
      <Widget grid={config.grid}>
        <WidgetText>{shownOpening.name || 'Ismeretlen'}</WidgetText>
        <WidgetHeading>
          {shownOpening.available.toString() || '?'} / {shownOpening.outOf.toString() || '?'}
        </WidgetHeading>
        <WidgetDescription>{shownOpening.comment}</WidgetDescription>
      </Widget>
    );
  } else
    return (
      <Widget grid={config.grid}>
        <WidgetDescription>Nincs nyitás</WidgetDescription>
      </Widget>
    );
}
