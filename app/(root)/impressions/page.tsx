import { ScrollTransition } from '@/components/animation/scroll/ScrollTransition';
import Footer from '@/components/shared/footer/Footer';
import GallerySection from './components/GallerySection';
import HeroSection from './components/HeroSection';

export default function Impressions() {
  return (
    <ScrollTransition
      section1ClassName="sticky top-0 h-screen"
      section2ClassName="relative h-screen bg-white"
      // scaleRange={[1, 0.8]}
      yOffset={0}
    >
      <HeroSection />
      <div>
        <GallerySection />
        <Footer />
      </div>
    </ScrollTransition>
  );
}
