import {
  Button,
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
} from '@chakra-ui/react';
import { WidgetConfigFields, WidgetDisplay, WidgetWithoutGrid } from '../../types/kiosk.types';
import { useForm } from 'react-hook-form';
import { useKioskContext } from '../../context/kiosk.context';
import { useSaveWidget } from '../../network/useSaveWidget';

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
        toast({ status: 'success', title: 'Sikeres mentés!' });
        update();
      },
      () => {
        toast({ status: 'error', title: 'Mentés sikertelen!' });
      }
    );
  };
  const isEditable = Object.keys(widget).length > 2;
  return (
    <>
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
        {widgetDisplay.icon}
        <StatNumber>{widgetDisplay.name}</StatNumber>
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
                  <Input {...register(field.name as keyof WidgetWithoutGrid, { required: 'Ne hagyd üresen!' })} />
                </FormControl>
              ))}
              <Button type='submit'>Mentés</Button>
            </Flex>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
