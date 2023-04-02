import React from 'react';
import styled from 'styled-components';

import { useConfig } from '../layout/ConfigContext';
import { Size } from '../utils/theme';
import { Clock } from './Clock';
import { ErrorIcon } from './ErrorIcon';
import { Logo } from './Logo';
import { Messages } from './Messages';

export function Titlebar() {
  const {
    fail,
    config: {
      style: { mode },
    },
  } = useConfig();
  return (
    <TitlebarWrapper>
      <LogoWrapper mode={mode}>
        <Logo />
        {fail && <ErrorIcon size={3} />}
      </LogoWrapper>
      <Messages />
      <Clock />
    </TitlebarWrapper>
  );
}

const TitlebarWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto 1fr auto;
  grid-gap: ${Size.s};
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div<{ mode: 'dark' | 'light' }>`
  display: inline-flex;
  gap: ${Size.s};
  > svg {
    height: ${Size.xxl};
    ${({ mode }) => mode === 'dark' && 'fill: white'}
  }
`;
