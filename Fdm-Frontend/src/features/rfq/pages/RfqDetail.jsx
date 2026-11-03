import { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import ManufacturerDashboardShell from '../../../components/layout/ManufacturerDashboardShell.jsx';
import { getRfqByIdApi, markRfqReviewedApi } from '../../../api/rfqApi.js';
import { createQuotationApi } from '../../../api/quotationApi.js';

export default function RfqDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [rfq, setRfq] = useState(null);
  const [loading, setLoading] = useState(true);

  const Shell = user?.role === 'manufacturer' ? ManufacturerDashboardShell : DesignerDashboardShell;

  useEffect(() => {
    getRfqByIdApi(id)
      .then(setRfq)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleMarkReviewed() {
    const updated = await markRfqReviewedApi(id);
    setRfq((prev) => ({ ...prev, status: updated.status }));
  }

  if (loading) {
    return (
      <Shell>
        <p className="font-serif italic text-stone2">Loading…</p>
      </Shell>
    );
  }

  if (!rfq) {
    return (
      <Shell>
        <p className="font-serif italic text-stone2">RFQ not found.</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-2">
        {rfq.status}
      </p>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-6">
        {rfq.projectId?.title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Category</p>
          <p className="font-body text-ink mt-1">{rfq.projectId?.category}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Quantity</p>
          <p className="font-body text-ink mt-1">{rfq.projectId?.quantity}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Budget</p>
          <p className="font-body text-ink mt-1">${rfq.projectId?.budget}</p>
        </div>
        <div className="bg-paper border border-ink/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">Deadline</p>
          <p className="font-body text-ink mt-1">
            {rfq.projectId?.deadline && new Date(rfq.projectId.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="bg-paper border border-ink/10 p-6 mb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-3">
          Project description
        </p>
        <p className="font-serif italic text-stone2 whitespace-pre-line">
          {rfq.projectId?.description}
        </p>
      </div>

      {rfq.message && (
        <div className="bg-paper border border-ink/10 p-6 mb-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-3">
            Message from designer
          </p>
          <p className="font-body text-ink">{rfq.message}</p>
        </div>
      )}

      <p className="font-mono text-[10px] uppercase tracking-widest text-stone mb-6">
        {user?.role === 'manufacturer'
          ? `From ${rfq.designerId?.name}`
          : `Sent to ${rfq.manufacturerId?.name}`}
      </p>

      {user?.role === 'manufacturer' && rfq.status === 'pending' && (
        <button
          onClick={handleMarkReviewed}
          className="bg-ink text-paper font-mono text-[11px] uppercase tracking-widest2 px-6 py-3 hover:bg-oxblood transition-colors"
        >
          Mark as reviewed
        </button>
      )}

    {user?.role === 'manufacturer' && (rfq.status === 'reviewed' || rfq.status === 'quoted') && (
  <QuotationForm rfqId={rfq._id} alreadyQuoted={rfq.status === 'quoted'} />
)}
<Link
  to={user?.role === 'manufacturer' ? `/manufacturer/chat/${rfq._id}` : `/designer/chat/${rfq._id}`}
  className="inline-block mt-6 font-mono text-[11px] uppercase tracking-widest border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
>
  Open chat
</Link>
    </Shell>
  );
}

function QuotationForm({ rfqId, alreadyQuoted }) {
  const [price, setPrice] = useState('');
  const [productionDays, setProductionDays] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState(alreadyQuoted ? 'already' : 'form'); // 'form' | 'submitted' | 'already'

  if (status === 'already') {
    return <p className="font-serif italic text-stone2">Quotation already submitted.</p>;
  }

  if (status === 'submitted') {
    return (
      <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2">
        Quotation submitted successfully.
      </p>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback('');
    try {
      await createQuotationApi({
        rfqId,
        price: Number(price),
        productionDays: Number(productionDays),
        message,
      });
      setStatus('submitted');
    } catch (err) {
      setFeedback(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 bg-paper border border-ink/10 p-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-stone mb-2">
        Submit a quotation
      </p>

      {feedback && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2">
          {feedback}
        </p>
      )}

      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-stone">
          Quoted price 
        </label>
        <input
          required
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood"
        />
      </div>

      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-stone">
          Production time (days)
        </label>
        <input
          required
          type="number"
          min="1"
          value={productionDays}
          onChange={(e) => setProductionDays(e.target.value)}
          className="w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood"
        />
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
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-ink text-paper font-mono text-[11px] uppercase tracking-widest2 px-6 py-3 hover:bg-oxblood transition-colors disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit quotation'}
      </button>
    </form>
  );
}