import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Trash2, Bot, User, Sparkles } from 'lucide-react';
import type { ChatMessage, ChatResponse, HistoryMessage } from '../types/chat';

const SESSION_KEY = 'portfolio_chat_session_id';
const API_BASE = import.meta.env.VITE_API_URL ?? '';

const SUGGESTED_QUESTIONS = [
  'What are your top skills?',
  'Tell me about EducadorAI',
  'Are you available for work?',
  "What's your experience?",
];

function makeWelcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    role: 'assistant',
    content:
      "Hi there! 👋 I'm Anshuman's AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch!",
    timestamp: new Date(),
  };
}

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingIndicator: React.FC = () => (
  <div className="flex gap-2.5">
    <div
      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
      style={{
        background: 'rgba(32,178,166,0.15)',
        border: '1px solid rgba(32,178,166,0.4)',
      }}
    >
      <Bot className="w-3.5 h-3.5 text-teal-400" />
    </div>
    <div
      className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-teal-400/60 animate-bounce"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  </div>
);

// ── Single message bubble ─────────────────────────────────────────────────────
const MessageBubble: React.FC<{ msg: ChatMessage }> = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
          isUser ? '' : ''
        }`}
        style={
          isUser
            ? { background: 'rgba(255,255,255,0.1)' }
            : {
                background: 'rgba(32,178,166,0.15)',
                border: '1px solid rgba(32,178,166,0.4)',
              }
        }
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white/70" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-teal-400" />
        )}
      </div>

      <div
        className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'text-white rounded-2xl rounded-tr-sm'
            : 'text-gray-200 rounded-2xl rounded-tl-sm'
        }`}
        style={
          isUser
            ? {
                background: 'rgba(32,178,166,0.25)',
                border: '1px solid rgba(32,178,166,0.35)',
              }
            : {
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }
        }
      >
        {msg.content}
      </div>
    </div>
  );
};

// ── Main widget ───────────────────────────────────────────────────────────────
export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([makeWelcomeMessage()]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);
  const [error, setError] = useState<'network' | 'ai' | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Init: restore session + history ────────────────────────────────────────
  useEffect(() => {
    const storedSid = localStorage.getItem(SESSION_KEY);
    if (storedSid) {
      setSessionId(storedSid);
      loadHistory(storedSid);
    }
    // Pulse the button after 3 s to draw attention
    const timer = setTimeout(() => setHasUnread(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const loadHistory = useCallback(async (sid: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/history/${sid}`);
      if (!res.ok) return;
      const data: HistoryMessage[] = await res.json();
      if (data.length > 0) {
        setMessages(
          data.map((m, i) => ({
            id: String(i),
            role: m.role,
            content: m.content,
            timestamp: new Date(m.created_at),
          }))
        );
      }
    } catch {
      // silently fall back to welcome message
    }
  }, []);

  // ── Auto-scroll ─────────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ── Focus input when chat opens ─────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isLoading) return;

      setInput('');
      setError(null);

      const userMsg: ChatMessage = {
        id: `u_${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content, session_id: sessionId }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error((errData as { detail?: string }).detail ?? `Server error ${res.status}`);
        }

        const data: ChatResponse = await res.json();

        if (!sessionId) {
          setSessionId(data.session_id);
          localStorage.setItem(SESSION_KEY, data.session_id);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}`,
            role: 'assistant',
            content: data.response,
            timestamp: new Date(),
          },
        ]);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        const isNetworkError = message === 'Failed to fetch' || message.includes('NetworkError') || message.includes('ECONNREFUSED');
        setError(isNetworkError ? 'network' : 'ai');
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: 'assistant',
            content: isNetworkError
              ? '⚠️ Cannot reach the backend. Make sure the Python server is running on port 8000.'
              : `⚠️ ${message}`,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, sessionId]
  );

  // ── Clear history ───────────────────────────────────────────────────────────
  const clearChat = useCallback(async () => {
    if (sessionId) {
      await fetch(`${API_BASE}/api/chat/history/${sessionId}`, { method: 'DELETE' }).catch(
        () => {}
      );
      localStorage.removeItem(SESSION_KEY);
      setSessionId(null);
    }
    setMessages([makeWelcomeMessage()]);
    setError(null);
  }, [sessionId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showSuggestions = messages.length === 1;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #20B2A6, #1a9e93)',
          boxShadow: `0 0 ${hasUnread ? '30px' : '20px'} rgba(32,178,166,${hasUnread ? '0.7' : '0.4'})`,
        }}
        aria-label="Toggle AI chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full border-2 border-background animate-bounce" />
            )}
          </>
        )}
      </button>

      {/* ── Chat panel ── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: 'min(380px, calc(100vw - 24px))',
            height: 'min(560px, calc(100vh - 120px))',
            background: '#141a1f',
            border: '1px solid rgba(32,178,166,0.25)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(32,178,166,0.12)',
            animation: 'chat-slide-up 0.25s ease-out both',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
            style={{
              background: '#1a2329',
              borderBottom: '1px solid rgba(32,178,166,0.18)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center relative"
                style={{
                  background: 'rgba(32,178,166,0.15)',
                  border: '1px solid rgba(32,178,166,0.4)',
                }}
              >
                <Bot className="w-5 h-5 text-teal-400" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1a2329]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none mb-0.5">Portfolio AI</p>
                <p className="text-xs leading-none" style={{ color: '#7a8491' }}>
                  Ask about Anshuman
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-2 rounded-lg transition-colors hover:bg-red-500/10 hover:text-red-400"
                style={{ color: '#7a8491' }}
                title="Clear chat"
                aria-label="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: '#7a8491' }}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(32,178,166,0.3) transparent',
            }}
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions — shown only when only welcome message visible */}
          {showSuggestions && (
            <div className="px-4 pb-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3 h-3 text-teal-400/60" />
                <span className="text-xs" style={{ color: '#7a8491' }}>
                  Try asking:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: 'rgba(32,178,166,0.1)',
                      border: '1px solid rgba(32,178,166,0.3)',
                      color: '#20B2A6',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div
              className="mx-4 mb-2 px-3 py-2 rounded-lg text-xs flex-shrink-0"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#fca5a5',
              }}
            >
              {error === 'network'
                ? 'Cannot reach backend. Run the Python server on port 8000.'
                : 'AI models are busy / rate-limited. Please try again in a moment.'}
            </div>
          )}

          {/* Input bar */}
          <div
            className="p-3.5 flex-shrink-0"
            style={{
              borderTop: '1px solid rgba(32,178,166,0.15)',
              background: '#1a2329',
            }}
          >
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Anshuman…"
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500/60 transition-all disabled:opacity-50"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  maxHeight: '96px',
                  lineHeight: '1.5',
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40 hover:scale-105 active:scale-95"
                style={{ background: '#20B2A6' }}
                aria-label="Send"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-center mt-2 text-xs" style={{ color: '#4a5568' }}>
              Powered by{' '}
              <span style={{ color: '#20B2A6' }}>OpenRouter AI</span>
            </p>
          </div>
        </div>
      )}

      {/* Slide-up animation injected as a <style> tag */}
      <style>{`
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1); }
        }
      `}</style>
    </>
  );
};
