import { Heading, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { Section } from '@/layout/Section';

export function AppSection() {
  return (
    <Section image='/app.png'>
      <Heading as='h2'>A mindennapok útitársa</Heading>
      <Text>
        Indulási idők egy pillantásra. Az InduláSch App a letisztultságra és a gyorsaságra fókuszálva listázza a
        helyzetedhez közeli járatindulásokat. Ne késd le mégegyszer azt a bizonyos buszt!
      </Text>
      <HStack>
        <Link href='https://kir-dev.hu/ly/IIWQJ'>
          <Image src='/appstore.svg' alt='Letöltés az AppStore-ból' width={150} height={40} />
        </Link>
        <Link href='https://kir-dev.hu/ly/tmExk'>
          <Image src='/playstore.svg' alt='Letöltés a PlayStore-ból' width={133} height={40} />
        </Link>
      </HStack>
    </Section>
  );
}
