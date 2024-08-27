import { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { GridSettings } from '../types/widget.type';
import { GlobalSize, Size } from '../utils/theme';
import { useColorsOfScheme } from '../utils/useColorsOfScheme';

interface WidgetProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  grid: GridSettings;
}

export function Widget({ grid, ...props }: WidgetProps) {
  const { tile } = useColorsOfScheme();
  return <WidgetStyle {...grid} style={{ backgroundColor: tile }} {...props} />;
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
