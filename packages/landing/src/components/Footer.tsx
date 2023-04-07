import { HStack, Text } from '@chakra-ui/react';
import { TbHeart } from 'react-icons/tb';

import { KirDev } from './KirDev';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <HStack justifyContent='space-between' color='gray.600' fontSize='1.5rem' py={5}>
        <Text>{year}</Text>
        <HStack display={['none', null, 'flex']}>
          <Text>Made with</Text> <TbHeart color='red' /> <Text>by</Text> <KirDev size='1.5rem' />
        </HStack>
        <Text>v3</Text>
      </HStack>
    </footer>
  );
}
