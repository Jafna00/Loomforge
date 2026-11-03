import { useEffect, useState } from 'react';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { getMyDesignerProfileApi, saveDesignerProfileApi } from '../../../api/designerProfileApi.js';

const inputClass =
  'w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood transition-colors disabled:opacity-60 disabled:cursor-default';
const labelClass = 'font-mono text-[10px] uppercase tracking-widest text-stone';

const emptyForm = {
  brandName: '',
  bio: '',
  location: '',
  categories: '',
  experience: '',
};

export default function DesignerProfile() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    getMyDesignerProfileApi()
      .then((profile) => {
        if (profile) {
          setForm({
            brandName: profile.brandName || '',
            bio: profile.bio || '',
            location: profile.location || '',
            categories: (profile.categories || []).join(', '),
            experience: profile.experience || '',
          });
          setHasProfile(true);
        } else {
          // No profile yet — go straight into edit mode so they can create one
          setIsEditing(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveDesignerProfileApi({
        ...form,
        categories: form.categories
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
      });
      setMessage('Profile saved.');
      setHasProfile(true);
      setIsEditing(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <DesignerDashboardShell>
        <p className="font-serif italic text-stone2">Loading…</p>
      </DesignerDashboardShell>
    );
  }

  return (
    <DesignerDashboardShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
            Your profile
          </p>
          <h1 className="font-display uppercase text-3xl tracking-tightest text-ink">
            {isEditing ? 'Edit your details.' : 'Tell manufacturers who you are.'}
          </h1>
        </div>

        {hasProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="font-mono text-[11px] uppercase tracking-widest border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            Edit profile
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {message && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2">
            {message}
          </p>
        )}

        <div>
          <label className={labelClass}>Brand name</label>
          <input
            disabled={!isEditing}
            value={form.brandName}
            onChange={(e) => update('brandName', e.target.value)}
            className={inputClass}
            placeholder="Studio Rivera"
          />
        </div>

        <div>
          <label className={labelClass}>Bio</label>
          <textarea
            disabled={!isEditing}
            rows={4}
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            className={inputClass}
            placeholder="A few lines about your design practice..."
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Location</label>
            <input
              disabled={!isEditing}
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              className={inputClass}
              placeholder="Kerala, India"
            />
          </div>
          <div>
            <label className={labelClass}>Experience</label>
            <input
              disabled={!isEditing}
              value={form.experience}
              onChange={(e) => update('experience', e.target.value)}
              className={inputClass}
              placeholder="3 years"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Categories (comma-separated)</label>
          <input
            disabled={!isEditing}
            value={form.categories}
            onChange={(e) => update('categories', e.target.value)}
            className={inputClass}
            placeholder="Streetwear, Knitwear"
          />
        </div>

        {isEditing && (
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-ink text-paper font-mono text-[11px] uppercase tracking-widest2 px-6 py-3 hover:bg-oxblood transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save profile'}
            </button>

            {hasProfile && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="font-mono text-[11px] uppercase tracking-widest border border-ink/20 text-stone2 px-6 py-3 hover:border-ink/50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </form>
    </DesignerDashboardShell>
  );
}