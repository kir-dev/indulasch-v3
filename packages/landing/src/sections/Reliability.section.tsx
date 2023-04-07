import { Heading, Text } from '@chakra-ui/react';

import { Section } from '@/layout/Section';

export function ReliabilitySection() {
  return (
    <Section image='/health.png' reverse>
      <Heading as='h2'>Soha nem hagy cserben</Heading>
      <Text>
        A kliens úgy lett kialakítva, hogy a kapcsolat mindig fennálljon. A konfiguráció fél percenként frissül, a
        kliens állapotát pedig követni tudod az admin felületen.
      </Text>
      <Text>
        Szoftverfrissítés? Csak kattints rá az újraindítás gombra, és a kliens a következő lekérdezésnél újraindítja
        magát.
      </Text>
    </Section>
  );
}
