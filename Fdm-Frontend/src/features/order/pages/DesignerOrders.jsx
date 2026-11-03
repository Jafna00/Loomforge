import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getMyOrdersAsDesignerApi } from '../../../api/orderApi.js';
import { PRODUCTION_STAGES } from '../../../constants/productionStages.js';

export default function DesignerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrdersAsDesignerApi()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DesignerDashboardShell>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-8">
        Your orders.
      </h1>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="font-serif italic text-stone2">No orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((o) => {
            const stageLabel =
              PRODUCTION_STAGES.find((s) => s.key === o.productionStage)?.label || o.productionStage;
            return (
              <Link
                key={o._id}
                to={`/designer/orders/${o._id}`}
                className="bg-paper border border-ink/10 p-5 hover:border-ink/30 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-display text-xl tracking-tightest text-ink">
                    {o.projectId?.title}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-stone mt-1">
                    #{o.orderNumber} · {o.manufacturerId?.name}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood">
                  {stageLabel}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </DesignerDashboardShell>
  );
}