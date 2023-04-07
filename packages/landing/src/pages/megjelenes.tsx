import Head from 'next/head';

import { ConditionsSection } from '@/sections/Conditions.section';
import { ContactSection } from '@/sections/Contact.section';
import { DesignSection } from '@/sections/Design.section';
import { PRSection } from '@/sections/PR.section';

export default function Megjelenes() {
  return (
    <main>
      <Head>
        <title>Megjelenés | InduláSch</title>
      </Head>
      <PRSection />
      <ConditionsSection />
      <DesignSection />
      <ContactSection />
    </main>
  );
}
