import React from 'react';

import { Widget } from '../../layout/Widget';
import { TextConfig } from '../../types/widget.type';
import { useWidgetConfig } from '../../utils/useWidgetConfig';
import { WidgetDescription, WidgetHeading } from '../Text';

export function TextWidget() {
  const config = useWidgetConfig<TextConfig>('text');
  return (
    <Widget grid={config.grid}>
      <WidgetHeading>{config.title}</WidgetHeading>
      <WidgetDescription>{config.subtitle}</WidgetDescription>
    </Widget>
  );
}
