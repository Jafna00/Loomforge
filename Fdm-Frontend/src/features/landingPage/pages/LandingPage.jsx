import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import ProcessSection from '../components/ProcessSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import Footer from '../components/Footer.jsx';
import useLenis from '../../../hooks/useLenis.js';
import PlatformSection from '../components/PlatformSection.jsx';
import AISection from '../components/AISection.jsx';

export default function LandingPage() {
  useLenis();
  return (
    <>
      <Header />
      <Hero />
      <Marquee items={['DESIGN', 'CONNECT', 'MANUFACTURE']} />
       <PlatformSection />
      <ProcessSection />
      <GallerySection />
      <AISection/>
      <Footer />
    </>
  );
}