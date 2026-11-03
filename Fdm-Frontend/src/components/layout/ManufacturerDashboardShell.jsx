import DashboardShell from './DashboardShell.jsx';

const manufacturerSidebarLinks = [
  { label: 'Dashboard', href: '/manufacturer/dashboard' },
  { label: 'Incoming RFQs', href: '/manufacturer/rfqs' },
  { label: 'Orders', href: '/manufacturer/orders' },
    { label: 'Messages', href: '/manufacturer/messages' },
  { label: 'Company profile', href: '/manufacturer/profile' },

];

export default function ManufacturerDashboardShell({ children }) {
  return <DashboardShell sidebarLinks={manufacturerSidebarLinks}>{children}</DashboardShell>;
}