import React from 'react';
import QrCode from 'react-qr-code';

import { useWidgetConfig } from '../../utils/useWidgetConfig';
import { QRConfig } from '../../types/widget.type';
import { Widget } from '../../layout/Widget';
import { WidgetText } from '../Text';
import { useColorsOfScheme } from '../../utils/useColorsOfScheme';

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
