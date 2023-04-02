import { HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { TbHeart } from 'react-icons/tb';

import { UI_VERSION } from '../config/environment.config';
import { KirDev } from './KirDev';

export function Footer() {
  const color = useColorModeValue('gray.400', 'gray.600');
  return (
    <HStack justifyContent='space-between' color={color} fontSize='1.5rem' py={5}>
      <Text>{new Date().getFullYear()}.</Text>
      <HStack display={['none', null, 'flex']}>
        <Text>Made with</Text> <TbHeart color='red' /> <Text>by</Text> <KirDev size='1.5rem' />
      </HStack>
      <Text>UI v{UI_VERSION}</Text>
    </HStack>
  );
}
