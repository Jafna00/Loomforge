import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getManufacturerByIdApi } from '../../../api/manufacturerProfileApi.js';
import { getMyProjectsApi } from '../../../api/projectApi.js';
import { createRfqApi, getMySentRfqsApi } from '../../../api/rfqApi.js';

export default function ManufacturerPublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [myProjects, setMyProjects] = useState([]);
  const [alreadySentProjectIds, setAlreadySentProjectIds] = useState(new Set());
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    getManufacturerByIdApi(id)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [id]);

  async function openPicker() {
    setShowPicker(true);
    setFeedback('');

    const [projects, sentRfqs] = await Promise.all([
      myProjects.length === 0 ? getMyProjectsApi() : Promise.resolve(myProjects),
      getMySentRfqsApi(),
    ]);

    if (myProjects.length === 0) setMyProjects(projects);

    const sentToThisManufacturer = sentRfqs
      .filter((r) => r.manufacturerId?._id === profile?.userId?._id)
      .map((r) => r.projectId?._id);

    setAlreadySentProjectIds(new Set(sentToThisManufacturer));
  }

  const availableProjects = myProjects.filter((p) => !alreadySentProjectIds.has(p._id));

  async function handleSendRfq(e) {
    e.preventDefault();
    if (!selectedProjectId) return;
    setSending(true);
    setFeedback('');
    try {
      await createRfqApi({
        projectId: selectedProjectId,
        manufacturerId: profile.userId._id,
        message,
      });
      setFeedback('RFQ sent successfully.');
      setShowPicker(false);
      setMessage('');
      setSelectedProjectId('');
      setAlreadySentProjectIds((prev) => new Set(prev).add(selectedProjectId));
    } catch (err) {
      setFeedback(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <DesignerDashboardShell>
        <p className="font-serif italic text-stone2">Loading…</p>
      </DesignerDashboardShell>
    );
  }

  if (!profile) {
    return (
      <DesignerDashboardShell>
        <p className="font-serif italic text-stone2">Manufacturer not found.</p>
      </DesignerDashboardShell>
    );
  }

  return (
    <DesignerDashboardShell>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display uppercase text-3xl tracking-tightest text-ink">
          {profile.companyName || 'Unnamed company'}
        </h1>
        {profile.verified && (
          <span className="font-mono text-[11px] uppercase tracking-widest text-oxblood">
            ✓ Verified
          </span>
        )}
      </div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-8">
        {profile.location || 'Location not set'}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">MOQ</p>
          <p className="font-body text-ink mt-1">{profile.minimumOrderQuantity || 0}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Capacity</p>
          <p className="font-body text-ink mt-1">{profile.productionCapacity || '—'}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4 col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
            Specializations
          </p>
          <p className="font-body text-ink mt-1">
            {profile.specializations?.join(', ') || '—'}
          </p>
        </div>
      </div>

      <div className="bg-paper border border-ink/10 p-6 mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-3">
          Certifications
        </p>
        <p className="font-body text-ink">{profile.certifications?.join(', ') || 'None listed'}</p>
      </div>

      {feedback && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2 mb-4 max-w-md">
          {feedback}
        </p>
      )}

      {!showPicker ? (
        <button
          onClick={openPicker}
          className="bg-ink text-paper font-mono text-[11px] uppercase tracking-widest2 px-6 py-3 hover:bg-oxblood transition-colors"
        >
          Send RFQ
        </button>
      ) : (
        <form onSubmit={handleSendRfq} className="max-w-md space-y-4 bg-paper border border-ink/10 p-6">
          {availableProjects.length === 0 ? (
            <p className="font-serif italic text-stone2">
              You've already sent an RFQ to this manufacturer for all your projects.
            </p>
          ) : (
            <>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-stone">
                  Select project
                </label>
                <select
                  required
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood"
                >
                  <option value="">Choose a project…</option>
                  {availableProjects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-stone">
                  Message (optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood"
                  placeholder="Any specific notes for this manufacturer..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="bg-ink text-paper font-mono text-[11px] uppercase tracking-widest2 px-6 py-3 hover:bg-oxblood transition-colors disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Confirm send'}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setShowPicker(false)}
            className="font-mono text-[11px] uppercase tracking-widest border border-ink/20 text-stone2 px-6 py-3 hover:border-ink/50 transition-colors ml-3"
          >
            Cancel
          </button>
        </form>
      )}
    </DesignerDashboardShell>
  );
}