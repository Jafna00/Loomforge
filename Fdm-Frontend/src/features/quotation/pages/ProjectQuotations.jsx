import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getQuotationsForProjectApi, acceptQuotationApi } from '../../../api/quotationApi.js';

export default function ProjectQuotations() {
  const { projectId } = useParams();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState('');

  useEffect(() => {
    load();
  }, [projectId]);

  function load() {
    setLoading(true);
    getQuotationsForProjectApi(projectId)
      .then(setQuotations)
      .finally(() => setLoading(false));
  }

  async function handleAccept(id) {
    setAccepting(id);
    try {
      await acceptQuotationApi(id);
      load();
    } finally {
      setAccepting('');
    }
  }

  return (
    <DesignerDashboardShell>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-8">
        Compare quotations.
      </h1>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : quotations.length === 0 ? (
        <p className="font-serif italic text-stone2">No quotations received yet.</p>
      ) : (
        <div className="grid gap-4">
          {quotations.map((q) => (
            <div
              key={q._id}
              className="bg-paper border border-ink/10 p-5 flex items-center justify-between"
            >
              <div>
                <p className="font-display text-xl tracking-tightest text-ink">
                  {q.manufacturerId?.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone mt-1">
                  ${q.price} · {q.productionDays} days
                </p>
                {q.message && (
                  <p className="font-serif italic text-stone2 mt-2 max-w-md">{q.message}</p>
                )}
              </div>

              <div className="text-right">
                <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood block mb-2">
                  {q.status}
                </span>
                {q.status === 'pending' && (
                  <button
                    onClick={() => handleAccept(q._id)}
                    disabled={accepting === q._id}
                    className="font-mono text-[11px] uppercase tracking-widest bg-ink text-paper px-4 py-2 hover:bg-oxblood transition-colors disabled:opacity-50"
                  >
                    {accepting === q._id ? 'Accepting…' : 'Accept'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </DesignerDashboardShell>
  );
}