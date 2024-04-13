import { useState } from 'react';
import styled from 'styled-components';

import { FontSize } from '../utils/theme';
import { useColorsOfScheme } from '../utils/useColorsOfScheme';
import { useInterval } from '../utils/useInterval';

export function Clock() {
  const [time, setTime] = useState(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  const colors = useColorsOfScheme();
  return (
    <ClockWrapper fontPrimary={colors.fontPrimary}>
      <span style={{ color: colors.fontSecondary }}>
        {time.toLocaleDateString('hu-Hu', { month: '2-digit', day: '2-digit' })}
      </span>{' '}
      {time.toLocaleTimeString()}
    </ClockWrapper>
  );
}

const ClockWrapper = styled.p<{ fontPrimary: string }>`
  font-size: ${FontSize.xxl};
  white-space: nowrap;
  margin: 0;
  color: ${({ fontPrimary }) => fontPrimary};
`;
