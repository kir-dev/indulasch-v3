import { EmailIcon } from '@chakra-ui/icons';
import { Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { Section } from '@/layout/Section';

export function PRSection() {
  return (
    <Section image='/advert.png'>
      <Heading>Turbózd fel az eseményeid PR-ját!</Heading>
      <Text>Segítünk népszerűsíteni a rendezvényed, csak adj egy plakátot a megadott formátumban!</Text>
      <Text>Hosszabb szöveg kellene? A szövegedet időzítetten megjelenítjük a felső sávban.</Text>
      <Text>
        A webcímet, melyet a QR-kódba helyezünk, egy Shorz linkké alakítjuk, mellyel a látogatószámot is mérni tudjuk.
      </Text>
      <Link href='mailto:hello@kir-dev.hu?subject=InduláSch%20megjelenés'>
        <Button leftIcon={<EmailIcon />}>Írj nekünk</Button>
      </Link>
    </Section>
  );
}
