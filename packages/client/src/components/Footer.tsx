import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TrolleybusIcon } from '../assets/icons/trolleybus.svg';
import { useColorsOfScheme } from '../utils/useColorsOfScheme';
import { FontSize } from '../utils/theme';
import { KirDev } from './KirDev';

export function Footer() {
  const { fontPrimary } = useColorsOfScheme();
  return (
    <FooterWrapper color={fontPrimary}>
      <FooterPart>&copy; 2022.</FooterPart>
      <FooterPart>
        Made with <TrolleybusIcon /> by <KirDev />
      </FooterPart>
      <FooterPart>UI v3.0.0</FooterPart>
    </FooterWrapper>
  );
}

const FooterPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterWrapper = styled.footer<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${FontSize.lg};
  white-space: nowrap;
  svg {
    height: ${FontSize.lg};
    margin: 0 0.5rem;
    .logo-dark {
      fill: ${({ color }) => color};
    }
  }
`;
