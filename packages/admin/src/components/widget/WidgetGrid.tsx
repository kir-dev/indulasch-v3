import { Grid } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';

import { GridSettings, WidgetConfig } from '../../types/kiosk.types';
import { EmptyTile } from './EmptyTile';
import { WidgetTile } from './WidgetTile';

interface WidgetGridProps {
  widgets: WidgetConfig[];
  onChange: (widgets: WidgetConfig[]) => void;
}

export function WidgetGrid({ widgets, onChange }: WidgetGridProps) {
  const updateWidget = (index: number, widget: WidgetConfig) => {
    widgets[index] = widget;
    onChange([...widgets]);
  };

  const isCellFree = useCallback(
    (r: number, c: number) => {
      for (const {
        grid: { column, row },
      } of widgets) {
        if (r < row.end && r >= row.start && c < column.end && c >= column.start) return false;
      }
      return true;
    },
    [widgets]
  );

  const topGrowPossible = useCallback(
    (index: number) => {
      const { row, column } = widgets[index].grid;
      if (row.start === 1) return false;
      for (let i = column.start; i < column.end; i++) {
        if (!isCellFree(row.start - 1, i)) return false;
      }
      return true;
    },
    [widgets]
  );

  const bottomGrowPossible = useCallback(
    (index: number) => {
      const { row, column } = widgets[index].grid;
      if (row.end === 4) return false;
      for (let i = column.start; i < column.end; i++) {
        if (!isCellFree(row.end, i)) return false;
      }
      return true;
    },
    [widgets]
  );

  const rightGrowPossible = useCallback(
    (index: number) => {
      const { row, column } = widgets[index].grid;
      if (column.end === 4) return false;
      for (let i = row.start; i < row.end; i++) {
        if (!isCellFree(i, column.end)) return false;
      }
      return true;
    },
    [widgets]
  );

  const leftGrowPossible = useCallback(
    (index: number) => {
      const { row, column } = widgets[index].grid;
      if (column.start === 1) return false;
      for (let i = row.start; i < row.end; i++) {
        if (!isCellFree(i, column.start - 1)) return false;
      }
      return true;
    },
    [widgets]
  );

  const horizontalShrinkPossible = useCallback(
    (index: number) => {
      const { column } = widgets[index].grid;
      return column.end - column.start > 1;
    },
    [widgets]
  );

  const verticalShrinkPossible = useCallback(
    (index: number) => {
      const { row } = widgets[index].grid;
      return row.end - row.start > 1;
    },
    [widgets]
  );

  const emptyTiles = useMemo(() => {
    const tiles: GridSettings[] = [];
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (isCellFree(i, j)) tiles.push({ row: { start: i, end: i + 1 }, column: { start: j, end: j + 1 } });
      }
    }
    return tiles;
  }, [widgets]);

  const removeTile = useCallback(
    (index: number) => {
      onChange(widgets.filter((_, idx) => index !== idx));
    },
    [widgets]
  );

  return (
    <Grid
      overflow='auto'
      templateColumns={['repeat(3, 15rem)', null, 'repeat(3, 1fr)']}
      templateRows='repeat(3, 15rem)'
      gridGap={3}
    >
      {widgets.map((w, index) => (
        <WidgetTile
          widgets={widgets}
          onUpdate={(widget) => {
            updateWidget(index, widget);
          }}
          onRemove={() => removeTile(index)}
          bottomGrow={bottomGrowPossible(index)}
          topGrow={topGrowPossible(index)}
          leftGrow={leftGrowPossible(index)}
          rightGrow={rightGrowPossible(index)}
          verticalShrink={verticalShrinkPossible(index)}
          horizontalShrink={horizontalShrinkPossible(index)}
          widget={w}
          key={index}
        />
      ))}
      {emptyTiles.map((et, index) => (
        <EmptyTile
          widgets={widgets}
          onAddWidget={(w) => {
            onChange([...widgets, w]);
          }}
          key={index}
          grid={et}
        />
      ))}
    </Grid>
  );
}
