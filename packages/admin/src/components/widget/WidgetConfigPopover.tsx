import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  WidgetConfig,
  WidgetConfigFields,
  WidgetDisplay,
  WidgetName,
  WidgetWithoutGrid,
} from '../../types/kiosk.types';
import { TbCirclePlus, TbSettings } from 'react-icons/tb';
import { useForm } from 'react-hook-form';

interface AddWidgetPopoverProps {
  widget?: WidgetWithoutGrid;
  widgets: WidgetConfig[];
  onSave: (rawWidget: WidgetWithoutGrid) => void;
}

export function WidgetConfigPopover({ onSave, widget, widgets }: AddWidgetPopoverProps) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, watch } = useForm<WidgetWithoutGrid>({
    defaultValues: widget,
  });
  const selectableWidgets = useMemo(() => {
    return Object.entries(WidgetDisplay)
      .filter(([key]) => {
        return !widgets.map((v) => v.name as string).includes(key) || key === widget?.name;
      })
      .map(([key, value]) => ({ key, value: value.name }));
  }, [widgets]);
  const configFields = useMemo(() => {
    const nameValue = watch('name');
    return WidgetConfigFields[nameValue as WidgetName] || [];
  }, [watch('name')]);
  const onSubmit = (values: WidgetWithoutGrid) => {
    onSave(values);
    onClose();
  };
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} closeOnBlur={true}>
      <PopoverTrigger>
        {widget ? (
          <Button variant='ghost' colorScheme='gray'>
            <TbSettings size={20} />
          </Button>
        ) : (
          <Button variant='ghost' leftIcon={<TbCirclePlus />}>
            Hozzáadás
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection='column' gridRowGap={3} mt={3}>
            <Select {...register('name')}>
              {selectableWidgets.map((w) => (
                <option key={w.key} value={w.key}>
                  {w.value}
                </option>
              ))}
            </Select>
            {configFields.map((field) => (
              <FormControl key={field.name}>
                <FormLabel>{field.label}</FormLabel>
                <Input {...register(field.name as keyof WidgetWithoutGrid, { required: 'Ne hagyd üresen!' })} />
              </FormControl>
            ))}
            <Button type='submit'>Mentés</Button>
          </Flex>
        </form>
      </PopoverContent>
    </Popover>
  );
}
