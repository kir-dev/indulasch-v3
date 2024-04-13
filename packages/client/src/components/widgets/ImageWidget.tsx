import { Widget } from '@/layout/Widget';
import { ImageConfig } from '@/types/widget.type.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

import { ImageContainer } from '../ImageContainer';

export function ImageWidget() {
  const config = useWidgetConfig<ImageConfig>('image');
  return (
    <Widget grid={config.grid}>
      <ImageContainer src={config.url} alt='Nem sikerült betölteni a képet' />
    </Widget>
  );
}
