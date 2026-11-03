import StatCard from '../../../components/common/StatCard.jsx';

export default function DashboardStats({
  pendingRfqsCount,
  activeOrdersCount,
  revenue,
  conversationsCount,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <StatCard label="Incoming RFQs" value={pendingRfqsCount} accent />
      <StatCard label="Active orders" value={activeOrdersCount} />
      <StatCard label="Revenue" value={`$${revenue.toLocaleString()}`} />
      <StatCard label="Conversations" value={conversationsCount} />
    </div>
  );
}