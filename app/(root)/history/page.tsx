import { ScrollTransition } from '@/components/animation/scroll/ScrollTransition';
import HeroSection from './components/HeroSection';
import OurStory from './components/OurStory';

export default function StoryPage() {
  return (
    <ScrollTransition
      section1ClassName="sticky top-0"
      section2ClassName="relative bg-background"
      // scaleRange={[1, 0.8]}
      yOffset={0}
    >
      <HeroSection />
      <div>
        <OurStory />
      </div>
    </ScrollTransition>
  );
}
