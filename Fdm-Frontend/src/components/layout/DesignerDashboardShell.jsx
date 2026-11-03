import DashboardShell from './DashboardShell.jsx';

const designerSidebarLinks = [
  { label: 'Dashboard', href: '/designer/dashboard' },
  { label: 'Projects', href: '/designer/projects' },
  { label: 'Manufacturers', href: '/designer/manufacturers' },
    { label: 'Sent RFQs', href: '/designer/rfqs' },
  { label: 'Quotations', href: '/designer/quotations' },
  { label: 'Orders', href: '/designer/orders' },
  { label: 'Messages', href: '/designer/messages' },
  { label: 'Profile', href: '/designer/profile' },
];

export default function DesignerDashboardShell({ children }) {
  return <DashboardShell sidebarLinks={designerSidebarLinks}>{children}</DashboardShell>;
}