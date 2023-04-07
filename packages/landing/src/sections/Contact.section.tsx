import { EmailIcon } from '@chakra-ui/icons';
import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export function ContactSection() {
  return (
    <VStack spacing={5} my={5}>
      <Divider />
      <HStack>
        <Text>Készen állsz?</Text>
        <Link href='mailto:hello@kir-dev.hu?subject=InduláSch%20megjelenés'>
          <Button leftIcon={<EmailIcon />}>Írj nekünk</Button>
        </Link>
      </HStack>
      <Divider />
    </VStack>
  );
}
