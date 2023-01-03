import { HStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { DrawerMenu } from './DrawerMenu';

interface TitleBarProps {
  drawerEnabled?: boolean;
}

export function TitleBar({ drawerEnabled }: TitleBarProps) {
  return (
    <HStack justifyContent='space-between' py={5}>
      <Logo height='40px' />
      <HStack>
        <ColorModeSwitcher />
        {drawerEnabled && <DrawerMenu />}
      </HStack>
    </HStack>
  );
}
