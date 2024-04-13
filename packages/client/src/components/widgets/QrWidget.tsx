import QrCode from 'react-qr-code';

import { Widget } from '@/layout/Widget';
import { QRConfig } from '@/types/widget.type.ts';
import { useColorsOfScheme } from '@/utils/useColorsOfScheme.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

import { WidgetText } from '../Text';

export function QrWidget() {
  const config = useWidgetConfig<QRConfig>('qr');
  const { fontPrimary } = useColorsOfScheme();
  return (
    <Widget grid={config.grid}>
      <QrCode value={config.message} fgColor={fontPrimary} bgColor='transparent' />
      <WidgetText>{config.label}</WidgetText>
    </Widget>
  );
}
