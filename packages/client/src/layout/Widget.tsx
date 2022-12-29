import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useColorsOfScheme } from '../utils/useColorsOfScheme';
import { GridSettings } from '../types/widget.type';
import { GlobalSize, Size } from '../utils/theme';

interface WidgetProps extends PropsWithChildren {
  grid: GridSettings;
}

export function Widget({ children, grid }: WidgetProps) {
  const { tile } = useColorsOfScheme();
  return (
    <WidgetStyle {...grid} style={{ backgroundColor: tile }}>
      {children}
    </WidgetStyle>
  );
}

const WidgetStyle = styled.div<GridSettings>`
  box-sizing: border-box;
  border-radius: ${GlobalSize.borderRadius};
  background-color: white;
  padding: ${Size.xs};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  grid-column: ${({ column }) => `${column.start} / ${column.end}`};
  grid-row: ${({ row }) => `${row.start} / ${row.end}`};
`;
