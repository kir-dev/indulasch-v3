import { HStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

export function TitleBar() {
  return (
    <HStack justifyContent='space-between' py={5}>
      <Logo height='40px' />
      <ColorModeSwitcher />
    </HStack>
  );
}
