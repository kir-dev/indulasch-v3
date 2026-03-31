import styled from 'styled-components';

import { Widget } from '@/layout/Widget';
import { IframeConfig } from '@/types/widget.type.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

export function IframeWidget() {
  const config = useWidgetConfig<IframeConfig>('iframe');
  return (
    <Widget grid={config.grid} style={{ padding: 0 }}>
      <StyledIframe src={config.url} title='Iframe widget' />
    </Widget>
  );
}

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: inherit;
`;
