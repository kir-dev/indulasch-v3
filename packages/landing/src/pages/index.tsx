import { MainHead } from '@/components/MainHead';
import { AdvertisementSection } from '@/sections/Advertisement.section';
import { AppSection } from '@/sections/App.section';
import { DesktopSection } from '@/sections/Desktop.section';
import { ReliabilitySection } from '@/sections/Reliability.section';

export default function Home() {
  return (
    <main>
      <MainHead />
      <DesktopSection />
      <AdvertisementSection />
      <ReliabilitySection />
      <AppSection />
    </main>
  );
}
