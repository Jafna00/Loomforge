import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getMyProjectsApi } from '../../../api/projectApi.js';



export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProjectsApi()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DesignerDashboardShell >
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display uppercase text-3xl tracking-tightest text-ink">
          Your projects.
        </h1>
        <Link
          to="/designer/projects/new"
          className="font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-4 py-2 hover:bg-oxblood transition-colors"
        >
          Create project
        </Link>
      </div>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : projects.length === 0 ? (
        <p className="font-serif italic text-stone2">
          No projects yet. Create your first one to get started.
        </p>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <Link
              key={p._id}
              to={`/designer/projects/${p._id}`}
              className="bg-paper border border-ink/10 p-5 hover:border-ink/30 transition-colors flex items-center justify-between"
            >
              <div>
                <p className="font-display text-xl tracking-tightest text-ink">{p.title}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone mt-1">
                  {p.category} · Qty {p.quantity} · ${p.budget}
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood">
                {p.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </DesignerDashboardShell>
  );
}