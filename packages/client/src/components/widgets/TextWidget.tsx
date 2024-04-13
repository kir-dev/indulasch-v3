import { Widget } from '@/layout/Widget';
import { TextConfig } from '@/types/widget.type.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

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
