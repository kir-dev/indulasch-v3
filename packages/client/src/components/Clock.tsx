import React, { useState } from 'react';
import { useInterval } from '../utils/useInterval';
import styled from 'styled-components';
import { useColorsOfScheme } from '../utils/useColorsOfScheme';
import { FontSize } from '../utils/theme';

export function Clock() {
  const [time, setTime] = useState(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  const colors = useColorsOfScheme();
  return (
    <ClockWrapper fontPrimary={colors.fontPrimary}>
      <span style={{ color: colors.fontSecondary }}>{time.toLocaleDateString('hu-Hu')}</span>{' '}
      {time.toLocaleTimeString()}
    </ClockWrapper>
  );
}

const ClockWrapper = styled.p<{ fontPrimary: string }>`
  font-size: ${FontSize.xxl};
  margin: 0;
  color: ${({ fontPrimary }) => fontPrimary};
`;
