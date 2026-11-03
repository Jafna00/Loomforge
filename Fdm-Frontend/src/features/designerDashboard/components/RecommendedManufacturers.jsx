import { Link } from 'react-router-dom';

export default function RecommendedManufacturers({ loading, project, recommendations }) {
  return (
    <div className="bg-paper border border-ink/10 p-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-4">
        Recommended manufacturers
      </p>

      {!project ? (
        <p className="font-serif italic text-stone2">
          Create a project to get AI-matched manufacturer suggestions.
        </p>
      ) : loading ? (
        <p className="font-serif italic text-stone2">Finding matches…</p>
      ) : recommendations && recommendations.length > 0 ? (
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-oxblood mb-2">
            For "{project.title}"
          </p>
          {recommendations.slice(0, 3).map((m) => (
            <Link
              key={m.manufacturerId}
              to={`/designer/manufacturers/${m.manufacturerId}`}
              className="flex items-center justify-between border-b border-ink/10 pb-2 last:border-0 hover:opacity-70 transition-opacity"
            >
              <span className="font-body text-ink text-sm">
                {m.companyName || 'Unnamed company'}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood">
                {m.matchScore}%
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="font-serif italic text-stone2">
          No strong matches found yet for your latest project.
        </p>
      )}
    </div>
  );
}