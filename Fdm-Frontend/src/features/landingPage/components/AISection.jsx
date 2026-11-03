import { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "../../../components/common/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "Share your brief",
    copy: "Tell us the fabric, quantities, certifications and timeline your project needs.",
  },
  {
    id: 2,
    title: "Parse the requirements",
    copy: "The model breaks your brief into structured specs it can compare against real production data.",
  },
  {
    id: 3,
    title: "Cross-reference partners",
    copy: "Hundreds of manufacturer profiles are checked against those specs in seconds, not weeks.",
  },
  {
    id: 4,
    title: "Surface the fit",
    copy: "You get a short, ranked shortlist suited to this specific project — not a generic directory.",
  },
];

export default function AISection() {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const pulseRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-ai]", {
        opacity: 0,
        y: 70,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Ambient signal that the model is continuously working —
      // not tied to any single visitor's data.
      if (railRef.current && pulseRef.current) {
        gsap.fromTo(
          pulseRef.current,
          { top: "0%" },
          {
            top: "100%",
            duration: 3.2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="px-6 md:px-10 py-32 overflow-hidden"
    >
      <SectionLabel index="—">AI Matching Engine</SectionLabel>

      <div className="max-w-6xl">
        <h2
          data-ai
          className="font-display uppercase leading-[0.82] tracking-tightest text-[13vw] md:text-[5vw] mt-8"
        >
          FIND THE
          <br />
          PERFECT
          <span className="text-oxblood"> MANUFACTURER.</span>
        </h2>

        <p
          data-ai
          className="mt-8 max-w-xl text-stone2 font-serif italic text-lg"
        >
          Our AI reads your fashion project, compares it against hundreds of
          manufacturers, and surfaces the strongest production partner —
          here's how that actually works.
        </p>
      </div>

      {/* PROCESS PANEL */}
      <div
        data-ai
        className="mt-20 rounded-3xl border border-ink/10 bg-paper/70 backdrop-blur-xl p-8 md:p-14"
      >
        <div className="relative pl-14 md:pl-20">
          {/* rail */}
          <div
            ref={railRef}
            className="absolute left-[15px] md:left-[23px] top-2 bottom-2 w-px bg-ink/10"
          >
            <span
              ref={pulseRef}
              className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-oxblood shadow-[0_0_12px_2px_rgba(155,28,28,0.45)]"
            />
          </div>

          <div className="space-y-14 md:space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="absolute -left-14 md:-left-20 top-0 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-ink/15 bg-paper font-mono text-xs text-stone">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h4 className="font-display uppercase text-2xl md:text-3xl">
                  {step.title}
                </h4>
                <p className="mt-2 max-w-lg text-stone2 font-serif text-base leading-relaxed">
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}