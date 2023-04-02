import { HStack } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { DrawerMenu } from './DrawerMenu';
import { Logo } from './Logo';

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
