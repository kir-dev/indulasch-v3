import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import styled from 'styled-components';

import { Departure } from '../../../types/widget/departures.type';
import { GlobalSize, Size } from '../../../utils/theme';
import { useColorsOfScheme } from '../../../utils/useColorsOfScheme';
import { VehicleIcon } from './VehicleIcon';

interface FieldProps {
  departure: Departure;
}

export function Field({ departure }: FieldProps) {
  const { tile } = useColorsOfScheme();
  return (
    <FieldWrapper backgroundColor={tile}>
      <LineElement>
        <VehicleIcon name={departure.style.vehicleIcon.name} />
        <LineNumber circle={departure.style.icon.type !== 'BOX'} backgroundColor={departure.style.color}>
          <LineText color={departure.style.icon.textColor}>{departure.style.icon.text}</LineText>
        </LineNumber>
        {departure.alert.length > 1 && <FiAlertCircle size={40} color='orange' />}
      </LineElement>
      <DestinationElement>
        <DestinationText>{departure.headsign}</DestinationText>
      </DestinationElement>
      <TimeElement>
        <TimeText delayed={departure.isDelayed}>{departure.departureText}</TimeText>
      </TimeElement>
    </FieldWrapper>
  );
}

const FieldWrapper = styled.div<{ backgroundColor: string }>`
  :first-of-type {
    margin-top: 0;
  }
  width: 100%;
  box-sizing: border-box;
  border-radius: ${GlobalSize.borderRadius};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 10px;
  display: grid;
  grid-template-columns: 250px calc(100% - 250px - 20% - 10px) 20%;
  grid-gap: 5px;
  margin-top: ${Size.s};
`;

const FieldElement = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LineElement = styled(FieldElement)`
  justify-content: flex-start;
  align-items: center;
  grid-column: 1;
`;

const DestinationElement = styled(FieldElement)`
  grid-column: 2;
  justify-content: center;
`;

const DestinationText = styled.h1`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
`;

const TimeElement = styled(FieldElement)`
  justify-content: flex-end;
  grid-column: 3;
`;

export const LineNumber = styled.div<{
  circle?: boolean;
  backgroundColor: string;
}>`
  margin: 0 5px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ circle }) => (circle ? '300px' : '10px')};
  width: ${({ circle }) => (circle ? '60px' : '100px')};
`;

export const LineText = styled.h1<{ color: string }>`
  font-weight: bold;
  color: #${({ color }) => color};
`;

const TimeText = styled.h1<{ delayed?: boolean }>`
  color: ${({ delayed }) => (delayed ? 'red' : 'forestgreen')};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
