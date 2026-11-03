export default function StatCard({ label, value, accent = false }) {
  return (
    <div className="bg-paper border border-ink/10 p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
        {label}
      </p>
      <p
        className={`font-display text-3xl tracking-tightest mt-2 ${
          accent ? 'text-oxblood' : 'text-ink'
        }`}
      >
        {value}
      </p>
    </div>
  );
}