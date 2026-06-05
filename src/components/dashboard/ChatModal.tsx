// ============================================================
// FILE: src/components/ChatModal.tsx
// Shared modal chat yang digunakan oleh:
//   - src/components/MessagesSection.tsx (Dashboard)
//   - src/app/campaigns/[id]/page.tsx (Manage Campaign)
// ============================================================

"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Paperclip } from "lucide-react";
import {
  fetchCampaignMessages,
  sendCampaignMessage,
} from "@/services/campaignService";
import type { ChatMessage } from "@/types/campaign";

// ── Props ────────────────────────────────────────────────────
export interface ChatModalProps {
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
  creatorSub?: string; // subtitle opsional, e.g. "Kreator | Gaming"
  onClose: () => void;
}

// ── Skeleton helper ──────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-gray-200 rounded-xl animate-pulse ${className ?? ""}`} />
  );
}

// ── ChatModal ────────────────────────────────────────────────
export default function ChatModal({
  creatorId,
  creatorName,
  creatorAvatar,
  creatorSub = "Kreator",
  onClose,
}: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Load messages ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCampaignMessages(creatorId);
        if (!cancelled) setMessages(data);
      } catch {
        if (!cancelled) setError("Gagal memuat pesan. Coba lagi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [creatorId]);

  // ── Auto-scroll ke pesan terbaru ───────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Kirim pesan ────────────────────────────────────────────
  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput("");
    try {
      const sent = await sendCampaignMessage(creatorId, text);
      setMessages((prev) => [...prev, sent]);
    } catch {
      // Optimistic fallback jika API gagal
      const now = new Date();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "brand",
          text,
          time: now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: now.toLocaleDateString("id-ID", {
            month: "long",
            day: "numeric",
          }),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  // ── Group messages by date ─────────────────────────────────
  const grouped = messages.reduce<Record<string, ChatMessage[]>>((acc, m) => {
    (acc[m.date] ??= []).push(m);
    return acc;
  }, {});

  // ── Tutup modal saat klik backdrop ────────────────────────
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "85vh" }}
      >
        {/* ── Header ──────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <img
            src={creatorAvatar}
            alt={creatorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{creatorName}</p>
            <p className="text-xs text-gray-400">{creatorSub}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Tutup chat"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* ── Messages area ───────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gray-50">
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className={`h-12 w-2/3 ${i % 2 === 0 ? "ml-auto" : ""}`}
                />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-3 py-8">
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  fetchCampaignMessages(creatorId)
                    .then(setMessages)
                    .catch(() => setError("Gagal memuat pesan. Coba lagi."))
                    .finally(() => setLoading(false));
                }}
                className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-gray-400">Belum ada pesan.</p>
            </div>
          ) : (
            Object.entries(grouped).map(([date, msgs]) => (
              <div key={date}>
                <div className="text-center text-xs text-gray-400 my-3">
                  {date}
                </div>
                {msgs.map((m) => (
                  <div
                    key={m.id}
                    className={`flex mb-3 ${
                      m.role === "brand" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.role === "creator" && (
                      <img
                        src={creatorAvatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover mr-2 mt-1 shrink-0"
                      />
                    )}
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === "brand"
                          ? "bg-gray-100 text-gray-800 rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      {m.text}
                      <p className="text-[10px] text-gray-400 mt-1 text-right">
                        {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Input area ──────────────────────────────────── */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-3">
          <button
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Lampirkan file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Write a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 text-sm outline-none placeholder:text-gray-400"
            disabled={sending}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            aria-label="Kirim pesan"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
