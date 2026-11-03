import { Link } from 'react-router-dom';
import { PRODUCTION_STAGES } from '../../../constants/productionStages.js';

export default function ActiveProductionList({ orders }) {
  const active = orders.filter((o) => o.productionStage !== 'delivered');

  return (
    <div className="bg-paper border border-ink/10 p-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-4">
        Active production
      </p>

      {active.length === 0 ? (
        <p className="font-serif italic text-stone2">
          No active production right now. Accepted orders will appear here.
        </p>
      ) : (
        <div className="space-y-3">
          {active.map((o) => {
            const stageLabel = PRODUCTION_STAGES.find((s) => s.key === o.productionStage)?.label;
            return (
              <Link
                key={o._id}
                to={`/manufacturer/orders/${o._id}`}
                className="flex items-center justify-between border-b border-ink/10 pb-2 last:border-0 hover:opacity-70 transition-opacity"
              >
                <div>
                  <p className="font-body text-ink text-sm">{o.projectId?.title}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-stone mt-0.5">
                    #{o.orderNumber}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood shrink-0 ml-4">
                  {stageLabel}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}