import { Button, Flex, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { TbTrash } from 'react-icons/tb';

import { WidgetConfig, WidgetDisplay } from '@/types/kiosk.types.ts';

import { ArrowButton } from './ArrowButton';
import { WidgetConfigPopover } from './WidgetConfigPopover';

interface WidgetTileProps {
  widgets: WidgetConfig[];
  widget: WidgetConfig | undefined;
  onUpdate: (widget: WidgetConfig) => void;
  onRemove: () => void;
  topGrow: boolean;
  bottomGrow: boolean;
  leftGrow: boolean;
  rightGrow: boolean;
  verticalShrink: boolean;
  horizontalShrink: boolean;
}

export function WidgetTile({
  onUpdate,
  widget,
  horizontalShrink,
  verticalShrink,
  leftGrow,
  rightGrow,
  topGrow,
  bottomGrow,
  onRemove,
  widgets,
}: WidgetTileProps) {
  const bgColor = useColorModeValue('gray.300', 'gray.600');
  if (!widget) return null;
  const {
    grid: { row, column },
    name,
  } = widget;
  const widgetDisplay = WidgetDisplay[name];
  const changeGrid = ({
    rowStartDiff = 0,
    rowEndDiff = 0,
    columnEndDiff = 0,
    columnStartDiff = 0,
  }: {
    rowStartDiff?: number;
    rowEndDiff?: number;
    columnStartDiff?: number;
    columnEndDiff?: number;
  }) => {
    onUpdate({
      ...widget,
      grid: {
        column: { start: column.start + columnStartDiff, end: column.end + columnEndDiff },
        row: { start: row.start + rowStartDiff, end: row.end + rowEndDiff },
      },
    });
  };
  return (
    <VStack
      justifyContent='space-between'
      gridColumnStart={column.start}
      gridColumnEnd={column.end}
      gridRowStart={row.start}
      gridRowEnd={row.end}
      backgroundColor={bgColor}
      borderRadius='lg'
      w='100%'
      h='100%'
    >
      <Flex w='100%' justifyContent='space-between'>
        <WidgetConfigPopover
          widgets={widgets}
          onSave={(raw) => onUpdate({ ...raw, grid: { column, row } } as WidgetConfig)}
          widget={widget}
        />
        <VStack>
          <ArrowButton direction='up' show={topGrow} onClick={() => changeGrid({ rowStartDiff: -1 })} />
          <ArrowButton direction='down' show={verticalShrink} onClick={() => changeGrid({ rowStartDiff: 1 })} />
        </VStack>
        <Button colorScheme='red' variant='ghost' onClick={onRemove}>
          <TbTrash size={20} />
        </Button>
      </Flex>

      <HStack w='100%' justifyContent='space-between'>
        <HStack>
          <ArrowButton direction='left' show={leftGrow} onClick={() => changeGrid({ columnStartDiff: -1 })} />
          <ArrowButton direction='right' show={horizontalShrink} onClick={() => changeGrid({ columnStartDiff: 1 })} />
        </HStack>
        <VStack>
          {widgetDisplay.icon}
          <Text>{widgetDisplay.name}</Text>
        </VStack>
        <HStack>
          <ArrowButton direction='left' show={horizontalShrink} onClick={() => changeGrid({ columnEndDiff: -1 })} />
          <ArrowButton direction='right' show={rightGrow} onClick={() => changeGrid({ columnEndDiff: 1 })} />
        </HStack>
      </HStack>
      <VStack>
        <ArrowButton direction='up' show={verticalShrink} onClick={() => changeGrid({ rowEndDiff: -1 })} />
        <ArrowButton direction='down' show={bottomGrow} onClick={() => changeGrid({ rowEndDiff: 1 })} />
      </VStack>
    </VStack>
  );
}
