import { AdvertisementHead } from '@/components/AdvertisementHead';
import { ConditionsSection } from '@/sections/Conditions.section';
import { ContactSection } from '@/sections/Contact.section';
import { DesignSection } from '@/sections/Design.section';
import { PRSection } from '@/sections/PR.section';

export default function Megjelenes() {
  return (
    <main>
      <AdvertisementHead />
      <PRSection />
      <ConditionsSection />
      <DesignSection />
      <ContactSection />
    </main>
  );
}
