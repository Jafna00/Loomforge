import { useEffect, useState } from 'react';
import ManufacturerDashboardShell from '../../../components/layout/ManufacturerDashboardShell.jsx';
import {
  getMyManufacturerProfileApi,
  saveManufacturerProfileApi,
} from '../../../api/manufacturerProfileApi.js';

const inputClass =
  'w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood transition-colors disabled:opacity-60 disabled:cursor-default';
const labelClass = 'font-mono text-[10px] uppercase tracking-widest text-stone';

const emptyForm = {
  companyName: '',
  location: '',
  minimumOrderQuantity: '',
  productionCapacity: '',
  specializations: '',
  certifications: '',
};

export default function ManufacturerProfile() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    getMyManufacturerProfileApi()
      .then((profile) => {
        if (profile) {
          setForm({
            companyName: profile.companyName || '',
            location: profile.location || '',
            minimumOrderQuantity: profile.minimumOrderQuantity ?? '',
            productionCapacity: profile.productionCapacity || '',
            specializations: (profile.specializations || []).join(', '),
            certifications: (profile.certifications || []).join(', '),
          });
          setHasProfile(true);
        } else {
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
      await saveManufacturerProfileApi({
        ...form,
        minimumOrderQuantity: Number(form.minimumOrderQuantity) || 0,
        specializations: form.specializations.split(',').map((s) => s.trim()).filter(Boolean),
        certifications: form.certifications.split(',').map((c) => c.trim()).filter(Boolean),
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
      <ManufacturerDashboardShell>
        <p className="font-serif italic text-stone2">Loading…</p>
      </ManufacturerDashboardShell>
    );
  }

  return (
    <ManufacturerDashboardShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
            Company profile
          </p>
          <h1 className="font-display uppercase text-3xl tracking-tightest text-ink">
            {isEditing ? 'Edit your details.' : 'Show designers what you can build.'}
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
          <label className={labelClass}>Company name</label>
          <input
            disabled={!isEditing}
            value={form.companyName}
            onChange={(e) => update('companyName', e.target.value)}
            className={inputClass}
            placeholder="LoomTex Industries"
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
              placeholder="Bangalore, India"
            />
          </div>
          <div>
            <label className={labelClass}>Minimum order quantity</label>
            <input
              disabled={!isEditing}
              type="number"
              min="0"
              value={form.minimumOrderQuantity}
              onChange={(e) => update('minimumOrderQuantity', e.target.value)}
              className={inputClass}
              placeholder="300"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Production capacity</label>
          <input
            disabled={!isEditing}
            value={form.productionCapacity}
            onChange={(e) => update('productionCapacity', e.target.value)}
            className={inputClass}
            placeholder="10,000 units/month"
          />
        </div>

        <div>
          <label className={labelClass}>Specializations (comma-separated)</label>
          <input
            disabled={!isEditing}
            value={form.specializations}
            onChange={(e) => update('specializations', e.target.value)}
            className={inputClass}
            placeholder="Streetwear, Hoodies, T-Shirts"
          />
        </div>

        <div>
          <label className={labelClass}>Certifications (comma-separated)</label>
          <input
            disabled={!isEditing}
            value={form.certifications}
            onChange={(e) => update('certifications', e.target.value)}
            className={inputClass}
            placeholder="GOTS, OEKO-TEX"
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
    </ManufacturerDashboardShell>
  );
}