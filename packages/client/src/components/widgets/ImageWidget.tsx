import React from 'react';
import styled from 'styled-components';

import { Widget } from '../../layout/Widget';
import { ImageConfig } from '../../types/widget.type';
import { GlobalSize, Size } from '../../utils/theme';
import { useWidgetConfig } from '../../utils/useWidgetConfig';

export function ImageWidget() {
  const config = useWidgetConfig<ImageConfig>('image');
  return (
    <Widget grid={config.grid}>
      <ImageContainer src={config.url} alt='Nem sikerült betölteni a képet' />
    </Widget>
  );
}

const ImageContainer = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: calc(${GlobalSize.borderRadius} - ${Size.xs});
`;
