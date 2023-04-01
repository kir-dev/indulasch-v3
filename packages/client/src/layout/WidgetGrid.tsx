import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Size } from '../utils/theme';

export function WidgetGrid({ children }: PropsWithChildren) {
  return <WidgetGridStyle>{children}</WidgetGridStyle>;
}

const WidgetGridStyle = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${Size.s};
  overflow: hidden;
`;
