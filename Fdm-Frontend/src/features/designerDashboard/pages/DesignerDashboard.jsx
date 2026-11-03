import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import DashboardStats from '../components/DashboardStats.jsx';
import RecommendedManufacturers from '../components/RecommendedManufacturers.jsx';
import RecentActivity from '../components/RecentActivity.jsx';
import { getMyProjectsApi } from '../../../api/projectApi.js';
import { getMyOrdersAsDesignerApi } from '../../../api/orderApi.js';
import { getMyQuotationsAsDesignerApi } from '../../../api/quotationApi.js';
import { getMyConversationsApi } from '../../../api/conversationApi.js';
import { recommendManufacturersApi } from '../../../api/aiApi.js';

export default function DesignerDashboard() {
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [recommendations, setRecommendations] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    Promise.all([
      getMyProjectsApi(),
      getMyOrdersAsDesignerApi(),
      getMyQuotationsAsDesignerApi(),
      getMyConversationsApi(),
    ])
      .then(([p, o, q, c]) => {
        setProjects(p);
        setOrders(o);
        setQuotations(q);
        setConversations(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const latestActiveProject = projects.find((p) => p.status === 'active') || projects[0];

  useEffect(() => {
    if (!latestActiveProject) return;
    setLoadingRecs(true);
    recommendManufacturersApi(latestActiveProject._id)
      .then(setRecommendations)
      .catch(() => setRecommendations([]))
      .finally(() => setLoadingRecs(false));
  }, [latestActiveProject?._id]);

  const activeProjectsCount = projects.filter((p) => p.status === 'active').length;
  const activeOrdersCount = orders.filter((o) => o.productionStage !== 'delivered').length;
  const pendingQuotationsCount = quotations.filter((q) => q.status === 'pending').length;

  const activity = [
    ...projects.map((p) => ({ title: p.title, type: 'Project created', date: p.createdAt })),
    ...quotations.map((q) => ({
      title: `${q.projectId?.title || 'Project'} — ${q.status}`,
      type: 'Quotation',
      date: q.createdAt,
    })),
    ...orders.map((o) => ({ title: `Order #${o.orderNumber}`, type: 'Order', date: o.createdAt })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <DesignerDashboardShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
            Designer dashboard
          </p>
          <h1 className="font-display uppercase text-3xl tracking-tightest text-ink">
            Your studio, at a glance.
          </h1>
        </div>
        <div className="flex gap-3">
          <Link
            to="/designer/manufacturers"
            className="font-mono text-[11px] uppercase tracking-widest border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            Browse manufacturers
          </Link>
          <Link
            to="/designer/projects/new"
            className="font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-4 py-2 hover:bg-oxblood transition-colors"
          >
            Create project
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : (
        <>
          <DashboardStats
            activeProjectsCount={activeProjectsCount}
            activeOrdersCount={activeOrdersCount}
            pendingQuotationsCount={pendingQuotationsCount}
            conversationsCount={conversations.length}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <RecommendedManufacturers
              loading={loadingRecs}
              project={latestActiveProject}
              recommendations={recommendations}
            />
            <RecentActivity items={activity} />
          </div>
        </>
      )}
    </DesignerDashboardShell>
  );
}