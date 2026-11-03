export default function RecentActivity({ items }) {
  return (
    <div className="bg-paper border border-ink/10 p-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-4">
        Recent activity
      </p>

      {items.length === 0 ? (
        <p className="font-serif italic text-stone2">
          Project and quotation updates will show up here.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-ink/10 pb-2 last:border-0"
            >
              <div>
                <p className="font-body text-ink text-sm">{item.title}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-stone mt-0.5">
                  {item.type}
                </p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone shrink-0 ml-4">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}