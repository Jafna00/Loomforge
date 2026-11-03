export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-paper px-6 md:px-10 pt-24 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-paper/15 pt-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-stone mb-4">
            Start a run
          </p>
          <h2 className="font-display text-[13vw] md:text-[6vw] leading-[0.9] tracking-tightest">
            LET'S MAKE
            <br />
            IT REAL.
          </h2>
        </div>

        <a
          href="mailto:studio@forme-atelier.com"
          className="font-serif italic text-2xl md:text-3xl underline underline-offset-8 decoration-oxblood decoration-2 hover:decoration-ochre transition-colors"
        >
          studio@forme-atelier.com
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-16 font-mono text-[11px] uppercase tracking-widest text-stone">
        <p>© {new Date().getFullYear()}  LoomForge Atelier. Design &amp; manufacture, one roof.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-paper transition-colors">Instagram</a>
          <a href="#" className="hover:text-paper transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}