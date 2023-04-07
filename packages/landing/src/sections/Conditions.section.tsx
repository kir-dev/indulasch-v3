import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Heading, List, ListIcon, ListItem } from '@chakra-ui/react';

import { Section } from '@/layout/Section';

export function ConditionsSection() {
  return (
    <Section image='/list.svg'>
      <Heading>Szabályzat és feltételek</Heading>
      <List spacing={3}>
        <ListItem>
          <MyListIcon />
          Exkluzivitást nem tudunk kínálni - a felületen több esemény is osztozhat
        </ListItem>
        <ListItem>
          <MyListIcon />A kioszk kezelői bármikor lecserélhetik a megjelenített tartalmat - igyekszünk minden ígényt
          kiszolgálni ennek ellenére
        </ListItem>
        <ListItem>
          <MyListIcon />
          Időzítés - az adott területen az esemény/megrendelés céldátuma szerinti sorrendben jelenítjük meg te
          képedet/QR kódod
        </ListItem>
        <ListItem>
          <MyListIcon />
          Időtartam - egy plakátot/QR-t az esemény dátumától számítva egy héttel előre rakjuk ki leghamarabb
        </ListItem>
        <ListItem>
          <MyListIcon />
          Méret - Kisebb rendezvényeknél egy csempényi helyet és egy QR kódot kínálunk fel megjelenítésre. Nagyobb
          rendezvényeknél (Konferencia, Qpa, stb.) ez lehet 3 csempe is (egy oszlop)
        </ListItem>
        <ListItem>
          <MyListIcon />
          Tartalom - főként olyan dolgokat jelenítünk meg, melyek tájékoztató jellegűek és nem hirdetés jellegűek. Egy
          esemény poszter egy tájékoztató jellegű tartalom, viszont egy kör toborzó plakátja már hirdetés. Nyitásokat
          természetesen örömmel támogatunk, azt az SchPincér csempe automatikusan intézi, amely az idő nagy részében
          kint van.
        </ListItem>
        <ListItem>
          <MyListIcon />
          Ez a lehetőség segítségnek és nem teljes körű szolgáltatásnak minősül. A feltételek változtatásának jogát
          fenntartjuk, a fenti tájékoztatás nem teljeskörű, csupán alapelv.
        </ListItem>
      </List>
    </Section>
  );
}

function MyListIcon() {
  return <ListIcon as={InfoOutlineIcon} color='blue.300' />;
}
