import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { TbMenu } from 'react-icons/tb';

export function DrawerMenu() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant='ghost' onClick={onOpen} display={['block', null, 'none']}>
        <TbMenu />
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <NavBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
