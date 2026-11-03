import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import { createProjectApi } from '../../../api/projectApi.js';
import { analyzeRequirementApi } from '../../../api/aiApi.js';

const inputClass =
  'w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood transition-colors';
const labelClass = 'font-mono text-[10px] uppercase tracking-widest text-stone';

export default function CreateProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    budget: '',
    deadline: '',
    visibility: 'public',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // AI requirement analyzer state
  const [aiText, setAiText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiApplied, setAiApplied] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleAnalyze() {
    if (!aiText.trim()) return;
    setAnalyzing(true);
    setAiError('');
    setAiApplied(false);
    try {
      const result = await analyzeRequirementApi(aiText);

      setForm((prev) => ({
  ...prev,
  category: result.category || prev.category,
  title: prev.title || result.product || prev.title,
  description: prev.description || aiText,
  quantity: result.quantity != null ? String(result.quantity) : prev.quantity,
  budget: result.budget != null ? String(result.budget) : prev.budget, // add this line
  deadline:
    result.timelineDays != null
      ? new Date(Date.now() + result.timelineDays * 86400000).toISOString().slice(0, 10)
      : prev.deadline,
}));

      setAiApplied(true);
    } catch (err) {
      setAiError(
        err.response?.data?.message || 'AI analysis failed. Please fill the form manually.'
      );
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const project = await createProjectApi({
        ...form,
        quantity: Number(form.quantity),
        budget: Number(form.budget),
      });
      navigate(`/designer/projects/${project._id}`);
    } catch (err) {
      const message =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DesignerDashboardShell>
      <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
        New project
      </p>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-8">
        Create a manufacturing project.
      </h1>

      {/* AI Requirement Analyzer */}
      <div className="max-w-2xl bg-paper border border-ink/10 p-6 mb-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood mb-2">
          ✦ AI requirement analyzer
        </p>
        <p className="font-serif italic text-stone2 mb-4">
          Describe what you need in plain language and we'll fill out the form for you.
        </p>

        {aiError && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2 mb-4">
            {aiError}
          </p>
        )}
        {aiApplied && !aiError && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink bg-ink/5 border border-ink/10 px-3 py-2 mb-4">
            Fields below have been filled in — review and edit before submitting.
          </p>
        )}

        <textarea
          rows={3}
          value={aiText}
          onChange={(e) => setAiText(e.target.value)}
          placeholder="e.g. I need 500 oversized hoodies made from organic cotton, preferably within 30 days"
          className={inputClass}
        />

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={analyzing || !aiText.trim()}
          className="mt-4 font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-6 py-3 hover:bg-oxblood transition-colors disabled:opacity-50"
        >
          {analyzing ? 'Analyzing…' : 'Analyze with AI'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <label className={labelClass}>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className={inputClass}
            placeholder="SS26 oversized hoodie capsule"
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className={inputClass}
            placeholder="Fabric, fit, print details, references..."
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Category</label>
            <input
              required
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className={inputClass}
              placeholder="Streetwear"
            />
          </div>
          <div>
            <label className={labelClass}>Quantity</label>
            <input
              required
              type="number"
              min="1"
              value={form.quantity}
              onChange={(e) => update('quantity', e.target.value)}
              className={inputClass}
              placeholder="300"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Budget (USD)</label>
            <input
              required
              type="number"
              min="0"
              value={form.budget}
              onChange={(e) => update('budget', e.target.value)}
              className={inputClass}
              placeholder="12000"
            />
          </div>
          <div>
            <label className={labelClass}>Deadline</label>
            <input
              required
              type="date"
              value={form.deadline}
              onChange={(e) => update('deadline', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Visibility</label>
          <div className="flex gap-3 mt-2">
            {['public', 'private'].map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => update('visibility', v)}
                className={`flex-1 py-2 font-mono text-[11px] uppercase tracking-widest border transition-colors ${
                  form.visibility === v
                    ? 'bg-ink text-paper border-ink'
                    : 'border-ink/20 text-stone2 hover:border-ink/50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-ink text-paper font-mono text-[11px] uppercase tracking-widest2 px-6 py-3 hover:bg-oxblood transition-colors disabled:opacity-50"
        >
          {submitting ? 'Creating…' : 'Create project'}
        </button>
      </form>
    </DesignerDashboardShell>
  );
}