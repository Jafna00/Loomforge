import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useSocket } from '../../../context/SocketContext.jsx';
import DesignerDashboardShell from '../../../components/layout/DesignerDashboardShell.jsx';
import ManufacturerDashboardShell from '../../../components/layout/ManufacturerDashboardShell.jsx';
import { getOrCreateConversationForRfqApi, getMessagesApi } from '../../../api/conversationApi.js';

export default function ChatRoom() {
  const { rfqId } = useParams();
  const { user } = useAuth();
  const { socket, connected } = useSocket();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  const Shell = user?.role === 'manufacturer' ? ManufacturerDashboardShell : DesignerDashboardShell;

  useEffect(() => {
    getOrCreateConversationForRfqApi(rfqId)
      .then(async (conv) => {
        setConversation(conv);
        const history = await getMessagesApi(conv._id);
        setMessages(history);
      })
      .finally(() => setLoading(false));
  }, [rfqId]);

  useEffect(() => {
    if (!socket || !conversation) return;

    socket.emit('join_conversation', conversation._id);

    function handleNewMessage(msg) {
      if (msg.conversationId === conversation._id) {
        setMessages((prev) => [...prev, msg]);
      }
    }

    socket.on('new_message', handleNewMessage);

    return () => {
      socket.emit('leave_conversation', conversation._id);
      socket.off('new_message', handleNewMessage);
    };
  }, [socket, conversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    if (!text.trim() || !socket || !conversation) return;
    socket.emit('send_message', { conversationId: conversation._id, text });
    setText('');
  }

  if (loading) {
    return (
      <Shell>
        <p className="font-serif italic text-stone2">Loading…</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="font-display uppercase text-2xl tracking-tightest text-ink mb-1">
        Conversation
      </h1>
      <p className="font-mono text-[10px] uppercase tracking-widest text-stone mb-6">
        {connected ? 'Connected' : 'Connecting…'}
      </p>

      <div className="bg-paper border border-ink/10 h-[50vh] overflow-y-auto p-6 flex flex-col gap-3 mb-4">
        {messages.length === 0 ? (
          <p className="font-serif italic text-stone2">No messages yet. Say hello.</p>
        ) : (
          messages.map((m) => {
            const isMine = m.senderId === user?.id || m.senderId?._id === user?.id;
            return (
              <div
                key={m._id}
                className={`max-w-[70%] px-4 py-2 font-body text-sm ${
                  isMine
                    ? 'bg-ink text-paper self-end'
                    : 'bg-paper border border-ink/10 text-ink self-start'
                }`}
              >
                {m.text}
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood transition-colors"
        />
        <button
          type="submit"
          className="font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-6 hover:bg-oxblood transition-colors"
        >
          Send
        </button>
      </form>
    </Shell>
  );
}