import styled from 'styled-components';
import { TbAlertTriangle } from 'react-icons/tb';
import React from 'react';

interface ErrorIconProps {
  size?: number;
}

export function ErrorIcon({ size = 5 }: ErrorIconProps) {
  return (
    <ErrorIconContainer size={size}>
      <TbAlertTriangle size={size + 'rem'} color='red' />
    </ErrorIconContainer>
  );
}

const ErrorIconContainer = styled.div<{ size: number }>`
  border-radius: 3000px;
  color: red;
  background-color: #ff000030;
  padding: 1rem;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
`;
