import React, { useMemo, useState } from 'react';

import { useSchPincerQuery } from '../../network/schpincer.network';
import { useWidgetConfig } from '../../utils/useWidgetConfig';
import { SchpincerConfig } from '../../types/widget.type';
import { Widget } from '../../layout/Widget';
import { WidgetDescription, WidgetHeading, WidgetText } from '../Text';
import { useInterval } from '../../utils/useInterval';

export function SchPincerWidget() {
  const config = useWidgetConfig<SchpincerConfig>('schpincer');
  const { data, error } = useSchPincerQuery(config);
  const [shownIndex, setShownIndex] = useState(0);
  useInterval(() => {
    if (data) {
      setShownIndex(shownIndex + 1 >= data.length ? 0 : shownIndex + 1);
    } else setShownIndex(0);
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
  } else if (!shownOpening) {
    return (
      <Widget grid={config.grid}>
        <WidgetDescription>Nincs nyitás</WidgetDescription>
      </Widget>
    );
  } else
    return (
      <Widget grid={config.grid}>
        <WidgetText>{shownOpening.name || 'Ismeretlen'}</WidgetText>
        <WidgetHeading>
          {shownOpening.available.toString() || '?'} / {shownOpening.outOf.toString() || '?'}
        </WidgetHeading>
        <WidgetDescription>{shownOpening.comment}</WidgetDescription>
      </Widget>
    );
}
