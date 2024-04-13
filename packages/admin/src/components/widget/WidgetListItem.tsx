import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stat,
  StatNumber,
  useColorModeValue,
  useDisclosure,
  useToast,
  WrapItem,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useSaveWidget } from '@/network/useSaveWidget.ts';
import { WidgetConfigFields, WidgetDisplay, WidgetWithoutGrid } from '@/types/kiosk.types.ts';
import { l } from '@/utils/language.ts';

import { useKioskContext } from '../../context/kiosk.context';

interface WidgetListItemProps {
  widget: WidgetWithoutGrid;
}

export function WidgetListItem({ widget }: WidgetListItemProps) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { selectedKioskId, update } = useKioskContext();
  const toast = useToast();
  const { makeRequest } = useSaveWidget(selectedKioskId || '');
  const color = useColorModeValue('gray.300', 'gray.600');

  const { register, handleSubmit } = useForm<WidgetWithoutGrid>({
    defaultValues: widget,
  });
  const configFields = WidgetConfigFields[widget.name];
  const widgetDisplay = WidgetDisplay[widget.name];
  const onSave = (raw: WidgetWithoutGrid) => {
    makeRequest(
      raw,
      () => {
        toast({ status: 'success', title: l('success.save') });
        update();
      },
      () => {
        toast({ status: 'error', title: l('error.save') });
      }
    );
  };
  const isEditable = Object.keys(widget).length > 2;
  return (
    <WrapItem>
      <Stat
        onClick={() => {
          if (isEditable) onOpen();
        }}
        borderColor={color}
        cursor='pointer'
        _hover={isEditable ? { backgroundColor: color } : undefined}
        borderRadius='lg'
        borderWidth='0.1rem'
        opacity={isEditable ? 1 : 0.5}
        p={10}
      >
        <Center flexDirection='column'>
          {widgetDisplay.icon}
          <StatNumber>{widgetDisplay.name}</StatNumber>
        </Center>
      </Stat>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSave)}>
            <Flex flexDirection='column' gridRowGap={3} mt={3}>
              {configFields.map((field) => (
                <FormControl key={field.name}>
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    {...register(field.name as keyof WidgetWithoutGrid, { required: l('form.validation.required') })}
                  />
                </FormControl>
              ))}
              <Button type='submit'>{l('button.save')}</Button>
            </Flex>
          </form>
        </ModalContent>
      </Modal>
    </WrapItem>
  );
}
