import { Heading, Text } from '@chakra-ui/react';

import { Section } from '@/layout/Section';

export function DesignSection() {
  return (
    <Section image='/grid.png'>
      <Heading as='h2'>Felkészülés a megjelenésre</Heading>
      <Text>Első és legfontosabb: mikor lesz az esemény / meddig szeretnéd megjeleníteni a tartalmat.</Text>
      <Text>
        A képen látható méretekkel készítsd el a plakátot, amelyet meg szeretnél jeleníteni. Ezek a méretek bruttó
        méretek, a megjelenített tartalom ennél 2x8 pixellel kevesebb (padding). Célszerű egy kis margót hagyni a plakát
        szélén, ami nem probléma, ha levágásra kerül.
      </Text>
      <Text>
        QR-kódhoz csak a linket kell megadni, illetve opciónálisan egy nagyon rövid címkét alá. Ez utóbbit mi
        megpróbáljuk kitalálni.
      </Text>
      <Text>A felső futószöveghez egy mondatot várunk, illetve opcionálisan egy ütemezést.</Text>
    </Section>
  );
}
