import { useState } from 'react';
import { callClaude } from '../services/claude';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ClaudeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await callClaude([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 rounded-lg p-4 text-white">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Chat Claude</h2>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 bg-neutral-800 rounded p-3">
        {messages.length === 0 && (
          <p className="text-slate-400 text-center py-8">Commence une conversation avec Claude...</p>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-slate-700 text-slate-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <p className="text-slate-400 text-sm italic">Claude réfléchit...</p>}
      </div>

      {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pose ta question..."
          disabled={loading}
          className="flex-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-400 outline-none disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded font-medium disabled:opacity-50 transition"
        >
          {loading ? '...' : 'Envoyer'}
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-2">
        💰 Crédits Claude API consommés en direct (facturés à Anthropic)
      </p>
    </div>
  );
}
