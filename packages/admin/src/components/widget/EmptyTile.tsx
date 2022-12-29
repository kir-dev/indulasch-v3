import { GridSettings, WidgetConfig } from '../../types/kiosk.types';
import { Center, useColorModeValue } from '@chakra-ui/react';
import { WidgetConfigPopover } from './WidgetConfigPopover';

interface EmptyTileProps {
  grid: GridSettings;
  widgets: WidgetConfig[];
  onAddWidget: (widget: WidgetConfig) => void;
}

export function EmptyTile({ grid: { column, row }, onAddWidget, widgets }: EmptyTileProps) {
  const color = useColorModeValue('gray.300', 'gray.600');
  return (
    <Center
      gridColumnStart={column.start}
      gridColumnEnd={column.end}
      gridRowStart={row.start}
      gridRowEnd={row.end}
      borderColor={color}
      borderWidth='0.2rem'
      borderStyle='dashed'
      borderRadius='lg'
      w='100%'
      h='100%'
    >
      <WidgetConfigPopover
        widgets={widgets}
        onSave={(rawWidget) => {
          onAddWidget({ ...rawWidget, grid: { column, row } as GridSettings } as WidgetConfig);
        }}
      />
    </Center>
  );
}
