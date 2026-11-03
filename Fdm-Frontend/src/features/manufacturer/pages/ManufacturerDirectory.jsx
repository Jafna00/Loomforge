import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getAllManufacturersApi } from '../../../api/manufacturerProfileApi.js';

export default function ManufacturerDirectory() {
  const [manufacturers, setManufacturers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    load();
  }, []);

  function load(filters = {}) {
    setLoading(true);
    getAllManufacturersApi(filters)
      .then(setManufacturers)
      .finally(() => setLoading(false));
  }

function handleSearch(e) {
  e.preventDefault();
  load(searchTerm ? { search: searchTerm } : {});
}

  return (
    <DesignerDashboardShell>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-6">
        Manufacturer directory.
      </h1>

    <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-md">
  <input
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by company name or location..."
    className="flex-1 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood transition-colors"
  />
  <button
    type="submit"
    className="font-mono text-[11px] uppercase tracking-widest border border-ink px-4 hover:bg-ink hover:text-paper transition-colors"
  >
    Search
  </button>
</form>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : manufacturers.length === 0 ? (
        <p className="font-serif italic text-stone2">No manufacturers found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {manufacturers.map((m) => (
            <Link
              key={m._id}
              to={`/designer/manufacturers/${m._id}`}
              className="bg-paper border border-ink/10 p-5 hover:border-ink/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-display text-xl tracking-tightest text-ink">
                  {m.companyName || 'Unnamed company'}
                </p>
                {m.verified && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
                {m.location || 'Location not set'} · MOQ {m.minimumOrderQuantity || 0}
              </p>
              {m.specializations?.length > 0 && (
                <p className="font-serif italic text-stone2 mt-2">
                  {m.specializations.join(', ')}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </DesignerDashboardShell>
  );
}