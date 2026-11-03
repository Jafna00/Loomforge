import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getProjectByIdApi } from '../../../api/projectApi.js';
import { recommendManufacturersApi } from '../../../api/aiApi.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [recommendations, setRecommendations] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [recsError, setRecsError] = useState('');

  useEffect(() => {
    getProjectByIdApi(id)
      .then(setProject)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleGetRecommendations() {
    setLoadingRecs(true);
    setRecsError('');
    try {
      const result = await recommendManufacturersApi(id);
      setRecommendations(result);
    } catch (err) {
      setRecsError(err.response?.data?.message || 'Could not generate recommendations.');
    } finally {
      setLoadingRecs(false);
    }
  }

  if (loading) {
    return (
      <DesignerDashboardShell>
        <p className="font-serif italic text-stone2">Loading…</p>
      </DesignerDashboardShell>
    );
  }

  if (!project) {
    return (
      <DesignerDashboardShell>
        <p className="font-serif italic text-stone2">Project not found.</p>
      </DesignerDashboardShell>
    );
  }

  return (
    <DesignerDashboardShell>
      <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
        {project.status}
      </p>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-6">
        {project.title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Category</p>
          <p className="font-body text-ink mt-1">{project.category}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Quantity</p>
          <p className="font-body text-ink mt-1">{project.quantity}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Budget</p>
          <p className="font-body text-ink mt-1">${project.budget}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Deadline</p>
          <p className="font-body text-ink mt-1">
            {new Date(project.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="bg-paper border border-ink/10 p-6 mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-3">
          Description
        </p>
        <p className="font-serif italic text-stone2 whitespace-pre-line">{project.description}</p>
      </div>

      <div className="flex gap-3 mb-10">
        <Link
          to={`/designer/projects/${project._id}/quotations`}
          className="font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-6 py-3 hover:bg-oxblood transition-colors"
        >
          View quotations
        </Link>
        <Link
          to="/designer/manufacturers"
          className="font-mono text-[11px] uppercase tracking-widest border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
        >
          Browse manufacturers
        </Link>
      </div>

      {/* AI Manufacturer Recommendations */}
      <div className="border-t border-ink/10 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
              ✦ AI recommendations
            </p>
            <h2 className="font-display uppercase text-2xl tracking-tightest text-ink">
              Best-fit manufacturers for this project.
            </h2>
          </div>
          <button
            onClick={handleGetRecommendations}
            disabled={loadingRecs}
            className="font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-6 py-3 hover:bg-oxblood transition-colors disabled:opacity-50 shrink-0"
          >
            {loadingRecs ? 'Matching…' : 'Get AI recommendations'}
          </button>
        </div>

        {recsError && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2 mb-4">
            {recsError}
          </p>
        )}

        {recommendations && recommendations.length === 0 && (
          <p className="font-serif italic text-stone2">
            No strong matches found yet. Try browsing the full directory instead.
          </p>
        )}

        {recommendations && recommendations.length > 0 && (
          <div className="grid gap-4">
            {recommendations.map((m, i) => (
              <Link
                key={m.manufacturerId}
                to={`/designer/manufacturers/${m.manufacturerId}`}
                className="bg-paper border border-ink/10 p-5 hover:border-ink/30 transition-colors flex items-start justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-stone">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-display text-xl tracking-tightest text-ink">
                      {m.companyName || 'Unnamed company'}
                    </p>
                    {m.verified && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-stone mb-2">
                    {m.location || 'Location not set'} · MOQ {m.minimumOrderQuantity || 0}
                  </p>
                  <ul className="space-y-1">
                    {m.reasons.map((reason, idx) => (
                      <li
                        key={idx}
                        className="font-serif italic text-stone2 text-sm before:content-['✓_'] before:text-oxblood"
                      >
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-display text-3xl tracking-tightest text-oxblood">
                    {m.matchScore}%
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
                    Match
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DesignerDashboardShell>
  );
}