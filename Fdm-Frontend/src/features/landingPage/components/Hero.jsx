import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Seal from '../../../components/common/Seal.jsx';

export default function Hero() {
  const collageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-word]', {
        yPercent: 110,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.15,
      });
      gsap.from('[data-hero-frame]', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.5,
      });
      gsap.from('[data-hero-note]', {
        opacity: 0,
        duration: 0.8,
        delay: 1.1,
      });

      // Gentle parallax between the two collage frames on scroll.
      gsap.to('[data-parallax="slow"]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: collageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to('[data-parallax="fast"]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: collageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-16 px-6 md:px-10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-6 items-start">
        {/* Headline block */}
        <div className="md:col-span-7">
          <h1 className="font-display uppercase leading-[0.82] tracking-tightest text-[16vw] md:text-[6.4vw]">
            <span className="block overflow-hidden">
              <span data-hero-word className="block">Design.</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-word className="block text-oxblood">Connect.</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-word className="block">Manufacture.</span>
            </span>
          </h1>

          <p className="mt-8 max-w-md font-serif italic text-lg md:text-xl text-stone2">
           Connect fashion designers with trusted manufacturers to transform ideas into production—from first sketch to finished collection.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <a
              href="#work"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 border border-ink px-5 py-3 hover:bg-ink hover:text-paper transition-colors"
            >
            Explore Platform
            </a>
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-stone">
              AI Manufacturing Platform
            </span>
          </div>
        </div>

        {/* Image collage */}
        <div
          ref={collageRef}
          className="md:col-span-5 relative h-[70vh] md:h-[80vh]"
        >
          <div
            data-hero-frame
            data-parallax="slow"
            className="absolute top-0 left-0 w-[62%] h-[55%] overflow-hidden bg-stone/20"
          >
            <img
              src="/src/assets/images/hero/premium_photo-a.avif"
              alt="Pattern maker cutting fabric by hand"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            data-hero-frame
            data-parallax="fast"
            className="absolute top-[18%] right-0 w-[45%] h-[40%] overflow-hidden"
          >
            <img
              src="/src/assets/images/hero/d.avif"
              alt="Fabric caught mid-drape between two makers"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            data-hero-frame
            data-parallax="slow"
            className="absolute bottom-0 left-[8%] w-[50%] h-[42%] overflow-hidden"
          >
            <img
              src="/src/assets/images/hero/e.avif"
              alt="Fitting and finishing at the studio table"
              className="w-full h-full object-cover"
            />
          </div>

          
        </div>
      </div>

      <Seal className="absolute -bottom-6 left-6 md:left-10 text-ink hidden md:block" />
    </section>
  );
}