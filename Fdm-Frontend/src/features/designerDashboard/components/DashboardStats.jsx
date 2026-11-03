import StatCard from '../../../components/common/StatCard.jsx';

export default function DashboardStats({
  activeProjectsCount,
  activeOrdersCount,
  pendingQuotationsCount,
  conversationsCount,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <StatCard label="Active projects" value={activeProjectsCount} />
      <StatCard label="Active orders" value={activeOrdersCount} accent />
      <StatCard label="Pending quotations" value={pendingQuotationsCount} />
      <StatCard label="Conversations" value={conversationsCount} />
    </div>
  );
}