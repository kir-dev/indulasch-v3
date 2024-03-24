import React from 'react';

import { Widget } from '../../layout/Widget';
import { ImageConfig } from '../../types/widget.type';
import { useWidgetConfig } from '../../utils/useWidgetConfig';
import { ImageContainer } from '../ImageContainer';

export function ImageWidget() {
  const config = useWidgetConfig<ImageConfig>('image');
  return (
    <Widget grid={config.grid}>
      <ImageContainer src={config.url} alt='Nem sikerült betölteni a képet' />
    </Widget>
  );
}
