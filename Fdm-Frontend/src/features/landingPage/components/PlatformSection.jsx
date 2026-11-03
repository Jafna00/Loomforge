import { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsapConfig";
import SectionLabel from "../../../components/common/SectionLabel";

const features = [
  {
    title: "AI Matching",
    description:
      "Intelligently connects designers with verified manufacturers based on category, MOQ, production capacity and specialization.",
  },
  {
    title: "Verified Manufacturers",
    description:
      "Discover trusted production partners with detailed profiles, certifications, capabilities and factory information.",
  },
  {
    title: "Real-Time Collaboration",
    description:
      "Manage quotations, exchange files, communicate with manufacturers and keep every discussion in one place.",
  },
  {
    title: "Production Visibility",
    description:
      "Monitor project progress from sampling to final production through a centralized dashboard.",
  },
];

export default function PlatformSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-platform]", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="px-6 md:px-10 py-28 md:py-36"
    >
      <SectionLabel index="—">Platform</SectionLabel>

      {/* Heading */}

      <div
        data-platform
        className="grid md:grid-cols-12 gap-10 items-end mt-8"
      >
        <div className="md:col-span-7">
          <h2 className="font-display uppercase leading-[0.85] tracking-tightest text-[14vw] md:text-[5.8vw]">
            THE FUTURE OF
            <br />
            <span className="text-oxblood">FASHION</span>
            <br />
            SOURCING.
          </h2>
        </div>

        <div className="md:col-span-5">
          <p className="font-serif italic text-lg leading-relaxed text-stone2">
            LoomForge is an AI-powered  platform that connects fashion
            designers with trusted manufacturers. Discover production partners,
            collaborate seamlessly, and manage your manufacturing journey from a
            single workspace.
          </p>
        </div>
      </div>

      {/* Full Width Image */}

      <div
        data-platform
        className="mt-20 overflow-hidden aspect-[16/7] bg-stone/10"
      >
        <img
          src="/src/assets/images/gallery/f.jpg"
          alt="Designer collaborating with garment manufacturer"
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
      </div>

      {/* Feature Grid */}

      <div
        data-platform
        className="grid md:grid-cols-2 gap-x-20 gap-y-14 mt-24"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="border-t border-ink/10 pt-6"
          >
            <h3 className="font-display uppercase text-3xl tracking-tight">
              {feature.title}
            </h3>

            <p className="mt-4 text-stone2 leading-relaxed max-w-md">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}