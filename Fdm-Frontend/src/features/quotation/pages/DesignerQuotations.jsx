import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getMyQuotationsAsDesignerApi } from '../../../api/quotationApi.js';

export default function DesignerQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyQuotationsAsDesignerApi()
      .then(setQuotations)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DesignerDashboardShell>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-8">
        All quotations.
      </h1>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : quotations.length === 0 ? (
        <p className="font-serif italic text-stone2">
          No quotations yet. Send an RFQ to a manufacturer to get started.
        </p>
      ) : (
        <div className="grid gap-4">
          {quotations.map((q) => (
            <Link
              key={q._id}
              to={`/designer/projects/${q.projectId?._id}/quotations`}
              className="bg-paper border border-ink/10 p-5 hover:border-ink/30 transition-colors flex items-center justify-between"
            >
              <div>
                <p className="font-display text-xl tracking-tightest text-ink">
                  {q.projectId?.title}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone mt-1">
                  {q.manufacturerId?.name} · ${q.price} · {q.productionDays} days
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood">
                {q.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </DesignerDashboardShell>
  );
}