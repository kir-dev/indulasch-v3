import { Heading, Text } from '@chakra-ui/react';
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
      <Link href='https://kir-dev.hu/ly/IIWQJ'>
        <Image src='/appstore.svg' alt='Letöltés at AppStore-ból' width={150} height={40} />
      </Link>
    </Section>
  );
}
