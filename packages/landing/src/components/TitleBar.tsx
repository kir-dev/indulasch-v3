import { HStack } from '@chakra-ui/react';
import Link from 'next/link';

import { Logo } from './Logo';

export function TitleBar() {
  return (
    <Link href='/'>
      <HStack justifyContent='space-between' py={5}>
        <Logo height='40px' />
      </HStack>
    </Link>
  );
}
