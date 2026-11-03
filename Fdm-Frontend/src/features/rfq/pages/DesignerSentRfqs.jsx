import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getMySentRfqsApi } from '../../../api/rfqApi.js';

export default function DesignerSentRfqs() {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMySentRfqsApi()
      .then(setRfqs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DesignerDashboardShell>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-8">
        Sent RFQs.
      </h1>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : rfqs.length === 0 ? (
        <p className="font-serif italic text-stone2">
          You haven't sent any RFQs yet. Visit a manufacturer's profile to send one.
        </p>
      ) : (
        <div className="grid gap-4">
          {rfqs.map((r) => (
            <Link
              key={r._id}
              to={`/designer/rfqs/${r._id}`}
              className="bg-paper border border-ink/10 p-5 hover:border-ink/30 transition-colors flex items-center justify-between"
            >
              <div>
                <p className="font-display text-xl tracking-tightest text-ink">
                  {r.projectId?.title}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone mt-1">
                  To {r.manufacturerId?.name} · Qty {r.projectId?.quantity} · $
                  {r.projectId?.budget}
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood">
                {r.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </DesignerDashboardShell>
  );
}