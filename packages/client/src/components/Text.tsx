import { CSSProperties, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { FontSize } from '../utils/theme';
import { useColorsOfScheme } from '../utils/useColorsOfScheme';

export function WidgetHeading({ children, ...css }: CSSProperties & PropsWithChildren) {
  const { fontPrimary } = useColorsOfScheme();
  return <H2 style={{ color: fontPrimary, ...css }}>{children}</H2>;
}

export function WidgetText({ children, ...css }: CSSProperties & PropsWithChildren) {
  const { fontSecondary } = useColorsOfScheme();
  return <P style={{ color: fontSecondary, ...css }}>{children}</P>;
}

export function WidgetDescription({ children, ...css }: CSSProperties & PropsWithChildren) {
  const { fontSecondary } = useColorsOfScheme();
  return (
    <P style={{ color: fontSecondary, ...css }}>
      <i>{children}</i>
    </P>
  );
}

const H2 = styled.h2`
  font-size: ${FontSize.xxl};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const P = styled.p`
  font-size: ${FontSize.lg};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
