'use client';

import { ScrollTransition } from '@/components/animation/scroll/ScrollTransition';
import HeroSection from './components/HeroSection';
import MenusSection from './components/MenusSection';

export default function Menus() {
  return (
    <ScrollTransition
      section1ClassName=""
      section2ClassName="bg-background"
      // scaleRange={[1, 0.8]}
      yOffset={50}
    >
      <HeroSection />
      <div>
        <MenusSection />
      </div>
    </ScrollTransition>
  );
}
