import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ManufacturerDashboardShell from '../../../components/layout/ManufacturerDashboardShell.jsx';
import DashboardStats from '../components/DashboardStats.jsx';
import ActiveProductionList from '../components/ActiveProductionList.jsx';
import { getMyReceivedRfqsApi } from '../../../api/rfqApi.js';
import { getMyOrdersAsManufacturerApi } from '../../../api/orderApi.js';
import { getMyConversationsApi } from '../../../api/conversationApi.js';

export default function ManufacturerDashboard() {
  const [rfqs, setRfqs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyReceivedRfqsApi(), getMyOrdersAsManufacturerApi(), getMyConversationsApi()])
      .then(([r, o, c]) => {
        setRfqs(r);
        setOrders(o);
        setConversations(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const pendingRfqsCount = rfqs.filter((r) => r.status === 'pending').length;
  const activeOrdersCount = orders.filter((o) => o.productionStage !== 'delivered').length;
  const revenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);

  return (
    <ManufacturerDashboardShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
            Manufacturer dashboard
          </p>
          <h1 className="font-display uppercase text-3xl tracking-tightest text-ink">
            What's on the floor.
          </h1>
        </div>
        <div className="flex gap-3">
          <Link
            to="/manufacturer/profile"
            className="font-mono text-[11px] uppercase tracking-widest border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            Edit profile
          </Link>
          <Link
            to="/manufacturer/rfqs"
            className="font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-4 py-2 hover:bg-oxblood transition-colors"
          >
            Manage RFQs
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : (
        <>
          <DashboardStats
            pendingRfqsCount={pendingRfqsCount}
            activeOrdersCount={activeOrdersCount}
            revenue={revenue}
            conversationsCount={conversations.length}
          />
          <ActiveProductionList orders={orders} />
        </>
      )}
    </ManufacturerDashboardShell>
  );
}