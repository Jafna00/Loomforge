import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function DashboardShell({ sidebarLinks, children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#ede7dd] flex">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-60 shrink-0 bg-ink text-paper flex flex-col justify-between py-8 overflow-y-auto z-50">
        <div>
          <Link to="/" className="font-display text-lg tracking-tightest px-6 block mb-10">
            LOOMFORGE
          </Link>
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-mono text-[11px] uppercase tracking-widest px-6 py-3 opacity-70 hover:opacity-100 hover:bg-paper/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone mb-2">
            {user?.role}
          </p>
          <p className="font-body text-sm mb-4">{user?.name}</p>
          <button
            onClick={logout}
            className="font-mono text-[10px] uppercase tracking-widest text-oxblood hover:text-ochre transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main content with left margin to account for fixed sidebar */}
      <main className="flex-1 ml-60 px-10 py-10 min-h-screen">
        {children}
      </main>
    </div>
  );
}