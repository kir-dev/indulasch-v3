import React from 'react';
import styled from 'styled-components';
import { Clock } from './Clock';
import { useConfig } from '../layout/ConfigContext';
import { Size } from '../utils/theme';
import { ErrorIcon } from './ErrorIcon';
import { Logo } from './Logo';

export function Titlebar() {
  const {
    fail,
    config: {
      style: { mode },
    },
  } = useConfig();
  return (
    <TitlebarWrapper mode={mode}>
      <Logo />
      {fail && <ErrorIcon size={3} />}
      <Clock />
    </TitlebarWrapper>
  );
}

const TitlebarWrapper = styled.div<{ mode: 'dark' | 'light' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > svg {
    height: ${Size.xxl};
    ${({ mode }) => mode === 'dark' && 'fill: white'}
  }
`;
