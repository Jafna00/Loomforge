export default function Marquee({ items }) {
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-paper py-5">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-display text-2xl md:text-3xl tracking-tightest px-6">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-oxblood shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}