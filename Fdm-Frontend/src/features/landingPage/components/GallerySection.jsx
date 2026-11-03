import { useEffect, useRef } from 'react';
import { gsap } from '../../../utils/gsapConfig.js';
import SectionLabel from '../../../components/common/SectionLabel.jsx';

const pieces = [
  {
    src: "/src/assets/images/gallery/factory1.webp",
    alt: "Modern garment manufacturing facility",
    tag: "Streetwear",
    caption:
      "Verified manufacturer specializing in premium streetwear with flexible MOQs.",
    span: "md:col-span-7",
  },
  {
    src: "/src/assets/images/gallery/factory2.jpeg",
    alt: "Quality inspection in garment factory",
    tag: "Sustainable",
    caption:
      "Eco-certified production partner focused on sustainable fashion manufacturing.",
    span: "md:col-span-5",
  },
];

export default function GallerySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manufacturers" ref={sectionRef} className="px-6 md:px-10 py-24 md:py-32">
      <SectionLabel index="—">Verified Manufacturers</SectionLabel>

      <h2 className="font-display uppercase text-[11vw] md:text-[4vw] leading-[0.9] tracking-tightest mt-6 max-w-4xl">
        FROM DESIGNERS TO FACTORIES
      </h2>

      <div className="grid md:grid-cols-12 gap-6 mt-14">
        {pieces.map((piece) => (
          <figure
            key={piece.src}
            data-reveal
            className={`${piece.span} col-span-12 group`}
          >
            <div className="overflow-hidden bg-stone/15 aspect-[4/3]">
              <img
                src={piece.src}
                alt={piece.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <figcaption className="flex items-baseline justify-between mt-4 gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood shrink-0">
                {piece.tag}
              </span>
              <span className="font-serif italic text-stone2 text-right">
                {piece.caption}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}