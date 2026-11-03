import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import ManufacturerDashboardShell from '../../../components/layout/ManufacturerDashboardShell.jsx';
import { getMyConversationsApi } from '../../../api/conversationApi.js';

export default function ConversationList() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const Shell = user?.role === 'manufacturer' ? ManufacturerDashboardShell : DesignerDashboardShell;

  useEffect(() => {
    getMyConversationsApi()
      .then(setConversations)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Shell>
      <h1 className="font-display uppercase text-3xl tracking-tightest text-ink mb-8">
        Messages.
      </h1>

      {loading ? (
        <p className="font-serif italic text-stone2">Loading…</p>
      ) : conversations.length === 0 ? (
        <p className="font-serif italic text-stone2">
          No conversations yet. Chat opens once an RFQ connects you with someone.
        </p>
      ) : (
        <div className="grid gap-4">
          {conversations.map((c) => {
            const otherParty = user?.role === 'manufacturer' ? c.designerId : c.manufacturerId;
            return (
              <Link
                key={c._id}
                to={
                  user?.role === 'manufacturer'
                    ? `/manufacturer/chat/${c.rfqId?._id}`
                    : `/designer/chat/${c.rfqId?._id}`
                }
                className="bg-paper border border-ink/10 p-5 hover:border-ink/30 transition-colors flex items-center justify-between"
              >
                <p className="font-display text-lg tracking-tightest text-ink">
                  {otherParty?.name}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-widest text-stone">
                  {new Date(c.lastMessageAt).toLocaleDateString()}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </Shell>
  );
}