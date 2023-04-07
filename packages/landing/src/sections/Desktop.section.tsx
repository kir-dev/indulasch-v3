import { Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { Section } from '@/layout/Section';

export function DesktopSection() {
  return (
    <Section image='/desktop.png'>
      <Heading as='h2'>A járókelők tájékoztatásának oszlopos tagja</Heading>
      <Text>
        Hozz létre egyedi kioszk konfigurációt az admin felületen, majd nyisd meg bármilyen eszközön egy böngészőben! A
        felület innetől kezdve készen áll a használatra.
      </Text>
      <Link href='https://admin.indulasch.kir-dev.hu' target='_blank' referrerPolicy='origin'>
        <Button>Nézzük meg!</Button>
      </Link>
    </Section>
  );
}
