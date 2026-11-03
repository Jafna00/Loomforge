import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import ManufacturerDashboardShell from '../../../components/layout/ManufacturerDashboardShell.jsx';
import { getOrderByIdApi, updateProductionStageApi } from '../../../api/orderApi.js';
import { PRODUCTION_STAGES } from '../../../constants/productionStages.js';

export default function OrderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const Shell = user?.role === 'manufacturer' ? ManufacturerDashboardShell : DesignerDashboardShell;

  useEffect(() => {
    getOrderByIdApi(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  const currentIndex = order
    ? PRODUCTION_STAGES.findIndex((s) => s.key === order.productionStage)
    : -1;
  const nextStage = PRODUCTION_STAGES[currentIndex + 1];

  async function handleAdvance() {
    if (!nextStage) return;
    setUpdating(true);
    try {
      const updated = await updateProductionStageApi(id, nextStage.key);
      setOrder((prev) => ({ ...prev, productionStage: updated.productionStage }));
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <Shell>
        <p className="font-serif italic text-stone2">Loading…</p>
      </Shell>
    );
  }

  if (!order) {
    return (
      <Shell>
        <p className="font-serif italic text-stone2">Order not found.</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
        Order #{order.orderNumber}
      </p>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-6">
        {order.projectId?.title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Quantity</p>
          <p className="font-body text-ink mt-1">{order.quantity}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Price</p>
          <p className="font-body text-ink mt-1">${order.price}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4 col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
            {user?.role === 'manufacturer' ? 'Designer' : 'Manufacturer'}
          </p>
          <p className="font-body text-ink mt-1">
            {user?.role === 'manufacturer' ? order.designerId?.name : order.manufacturerId?.name}
          </p>
        </div>
      </div>

      <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-4">
        Production timeline
      </p>

      <div className="space-y-2 mb-8">
        {PRODUCTION_STAGES.map((stage, i) => {
          const isDone = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div
              key={stage.key}
              className={`flex items-center gap-4 px-4 py-3 border ${
                isCurrent
                  ? 'border-oxblood bg-oxblood/5'
                  : isDone
                  ? 'border-ink/20 bg-paper'
                  : 'border-ink/10 bg-paper/50 opacity-50'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isDone ? 'bg-oxblood' : 'bg-stone'
                }`}
              />
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
                {stage.label}
              </span>
              {isCurrent && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood ml-auto">
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>

      {user?.role === 'manufacturer' && nextStage && (
        <button
          onClick={handleAdvance}
          disabled={updating}
          className="bg-ink text-paper font-mono text-[11px] uppercase tracking-widest2 px-6 py-3 hover:bg-oxblood transition-colors disabled:opacity-50"
        >
          {updating ? 'Updating…' : `Mark as ${nextStage.label}`}
        </button>
      )}

      {user?.role === 'manufacturer' && !nextStage && (
        <p className="font-serif italic text-stone2">Order complete — delivered.</p>
      )}
    </Shell>
  );
}