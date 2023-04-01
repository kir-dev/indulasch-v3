import React from 'react';
import styled from 'styled-components';

import { Spinner } from '../Spinner';
import { GlobalSize } from '../utils/theme';
import { ErrorIcon } from './ErrorIcon';
import { WidgetHeading } from './Text';

interface ErrorMessageProps {
  message: string;
  onAction?: () => void;
}

export function ErrorPage({ message, onAction }: ErrorMessageProps) {
  return (
    <PageBackground>
      <MessageCard>
        <ErrorIcon />
        <WidgetHeading fontSize='2rem'>{message}</WidgetHeading>
      </MessageCard>
    </PageBackground>
  );
}

export function LoadingPage() {
  return (
    <PageBackground>
      <MessageCard>
        <Spinner />
        <WidgetHeading fontSize='2rem'>Konfiguráció betöltése...</WidgetHeading>
      </MessageCard>
    </PageBackground>
  );
}

const PageBackground = styled.div`
  background-color: #edf2f7;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageCard = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;
  border-radius: ${GlobalSize.borderRadius};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
