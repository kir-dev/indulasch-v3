import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export function AdvertisementSection() {
  return (
    <VStack spacing={5}>
      <Divider />
      <HStack>
        <Text>Szeretnél megjeleníteni a földszinti TV-n?</Text>
        <Link href='/megjelenes'>
          <Button variant='link' rightIcon={<ArrowForwardIcon />}>
            Hirdetési tudnivalók
          </Button>
        </Link>
      </HStack>
      <Divider />
    </VStack>
  );
}
