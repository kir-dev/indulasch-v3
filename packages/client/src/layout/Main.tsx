import styled from 'styled-components';
import React, { CSSProperties, PropsWithChildren } from 'react';
import { Size } from '../utils/theme';

const MainBase = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: ${Size.s};
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: ${Size.s};
`;

export function Main({ children, ...css }: CSSProperties & PropsWithChildren) {
  return <MainBase style={css}>{children}</MainBase>;
}
