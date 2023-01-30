import { useMessages } from '../network/messages.network';
import { useCallback, useMemo, useState } from 'react';
import { useTimeout } from '../utils/useTimeout';
import styled, { css } from 'styled-components';
import { useColorsOfScheme } from '../utils/useColorsOfScheme';
import { GlobalSize } from '../utils/theme';
import { Message, MessageKinds } from '../types/message.type';
import { IoCheckmarkCircleSharp, IoHappy, IoInformationCircle, IoWarning } from 'react-icons/io5';
import { useInterval } from '../utils/useInterval';

export function Messages() {
  const { data, isError, refetch } = useMessages();
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const onFinish = useCallback(() => {
    if (!data) return;
    if (messageIndex + 1 >= data.length) {
      setMessageIndex(0);
    } else setMessageIndex(messageIndex + 1);
  }, [data, messageIndex, setMessageIndex]);
  const message = useMemo(() => data?.[messageIndex], [data, messageIndex]);
  useInterval(refetch, 10000);
  if (isError || !data || !message || data.length === 0) return <div />;
  return <MessageComponent key={message.text + data.length} message={message} onFinish={onFinish} />;
}

export function MessageComponent({ message, onFinish }: { message: Message; onFinish: () => void }) {
  const { tile, brand, fontPrimary } = useColorsOfScheme();
  const duration = (message.text.length * 10 + 1000) / 200;
  useTimeout(onFinish, duration * 1000);
  let icon = <InfoIcon />;
  switch (message?.kind) {
    case MessageKinds.WARNING:
      icon = <WarningIcon />;
      break;
    case MessageKinds.SUCCESS:
      icon = <SuccessIcon />;
      break;
    case MessageKinds.FUN:
      icon = <FunIcon theme={brand} />;
      break;
  }
  return (
    <MessagesWrapper backgroundColor={tile}>
      {icon}
      <ScrollingTextContainer duration={duration} color={fontPrimary}>
        <h1>{message?.text}</h1>
      </ScrollingTextContainer>
    </MessagesWrapper>
  );
}

const IconBaseStyle = css`
  height: 60px;
  width: 60px;
`;

const MessagesWrapper = styled.div<{ backgroundColor: string }>`
  box-sizing: border-box;
  border-radius: ${GlobalSize.borderRadius};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
`;

const InfoIcon = styled(IoInformationCircle)`
  color: dodgerblue;
  ${IconBaseStyle}
`;

const WarningIcon = styled(IoWarning)`
  color: orange;
  ${IconBaseStyle}
`;

const SuccessIcon = styled(IoCheckmarkCircleSharp)`
  color: limegreen;
  ${IconBaseStyle}
`;

const FunIcon = styled(IoHappy)<{ theme: string }>`
  color: ${({ theme }) => theme};
  ${IconBaseStyle}
`;

const ScrollingTextContainer = styled.div<{ duration: number; color: string }>`
  overflow: hidden;
  height: 60px;
  display: flex;
  align-items: center;
  h1{
    white-space: nowrap;
    padding-left: 100%;
    width: fit-content;
    animation: scroll ${({ duration }) => duration}s linear running;
    animation-iteration-count: infinite;
    display: inline-block;
    color: ${({ color }) => color};
  }
  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
`;
