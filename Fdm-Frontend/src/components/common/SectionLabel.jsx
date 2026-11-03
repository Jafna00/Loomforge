export default function SectionLabel({ index, children, dark = false }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2">
      <span className={dark ? 'text-ochre' : 'text-oxblood'}>{index}</span>
      <span className={`h-px w-8 ${dark ? 'bg-paper/30' : 'bg-ink/30'}`} />
      <span className={dark ? 'text-stone' : 'text-stone2'}>{children}</span>
    </div>
  );
}