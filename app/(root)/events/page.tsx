import { ScrollTransition } from '@/components/animation/scroll/ScrollTransition';
import Footer from '@/components/shared/footer/Footer';
import EventSection from './components/EventSection';
import HeroSection from './components/HeroSection';

export default function EventsPage() {
  return (
    <ScrollTransition
      section1ClassName="sticky top-0 h-screen"
      section2ClassName="relative h-screen bg-white"
      // scaleRange={[1, 0.8]}
      yOffset={0}
    >
      <HeroSection />
      <div>
        <EventSection />
        <Footer />
      </div>
    </ScrollTransition>
  );
}
