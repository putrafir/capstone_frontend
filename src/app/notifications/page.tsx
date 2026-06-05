"use client";

import Sidebar from "@/shared/components/layout/Sidebar";
import Topbar from "@/shared/components/layout/Topbar";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useRouter } from "next/navigation";
import type { Notification, NotificationType } from "@/features/notifications/types/notification";
import {
  Bell,
  CheckCheck,
  Megaphone,
  MessageSquare,
  CreditCard,
  FileEdit,
  Trophy,
  Rocket,
  HandCoins,
} from "lucide-react";

// ── Config per tipe notifikasi ─────────────────────────────────
const TYPE_CONFIG: Record<
  NotificationType,
  { icon: React.ElementType; bg: string; color: string; label: string }
> = {
  campaign_created:    { icon: Megaphone,     bg: "bg-blue-50",    color: "text-blue-600",    label: "Campaign" },
  creator_reply:       { icon: MessageSquare, bg: "bg-green-50",   color: "text-green-600",   label: "Pesan" },
  payment_success:     { icon: CreditCard,    bg: "bg-emerald-50", color: "text-emerald-600", label: "Pembayaran" },
  content_revision:    { icon: FileEdit,      bg: "bg-orange-50",  color: "text-orange-600",  label: "Konten" },
  campaign_completed:  { icon: Trophy,        bg: "bg-purple-50",  color: "text-purple-600",  label: "Campaign" },
  campaign_started:    { icon: Rocket,        bg: "bg-sky-50",     color: "text-sky-600",     label: "Campaign" },
  creator_negotiation: { icon: HandCoins,     bg: "bg-amber-50",   color: "text-amber-600",   label: "Negosiasi" },
};

function formatTimestamp(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins < 1)   return "Baru saja";
  if (mins < 60)  return `${mins} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7)   return `${days} hari lalu`;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
}

// ── Notification Row ──────────────────────────────────────────
function NotifRow({
  notif,
  onRead,
  onClick,
}: {
  notif: Notification;
  onRead: (id: string) => void;
  onClick: (n: Notification) => void;
}) {
  const cfg = TYPE_CONFIG[notif.type];
  const Icon = cfg.icon;

  return (
    <div
      className={`relative flex items-start gap-4 px-5 py-4 rounded-2xl border transition-all cursor-pointer group ${
        notif.read
          ? "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
          : "bg-blue-50/60 border-blue-100 hover:border-blue-200 hover:shadow-sm"
      }`}
      onClick={() => onClick(notif)}
    >
      {/* Unread dot */}
      {!notif.read && (
        <span className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />
      )}

      {/* Icon / Avatar */}
      {notif.avatarUrl ? (
        <img
          src={notif.avatarUrl}
          alt=""
          className="w-11 h-11 rounded-full object-cover shrink-0 mt-0.5"
        />
      ) : (
        <div
          className={`w-11 h-11 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}
        >
          <Icon className={`w-5 h-5 ${cfg.color}`} />
        </div>
      )}

      {/* Text content */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-sm font-semibold ${notif.read ? "text-gray-700" : "text-gray-900"}`}>
            {notif.title}
          </p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
            {cfg.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
          {notif.message}
        </p>
        <p className="text-[11px] text-gray-400 mt-1.5 font-medium">
          {formatTimestamp(notif.timestamp)}
        </p>
      </div>

      {/* Mark as Read (hover) */}
      {!notif.read && (
        <button
          onClick={(e) => { e.stopPropagation(); onRead(notif.id); }}
          className="hidden group-hover:flex items-center gap-1 px-2.5 py-1 bg-blue-600 text-white text-[10px] font-semibold rounded-lg whitespace-nowrap shrink-0 mt-0.5"
        >
          Tandai dibaca
        </button>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const router = useRouter();

  const handleClick = (notif: Notification) => {
    if (!notif.read) markAsRead(notif.id);
    if (notif.href) router.push(notif.href);
  };

  const readList   = notifications.filter((n) => n.read);
  const unreadList = notifications.filter((n) => !n.read);

  return (
    <div className="flex min-h-screen bg-[#dde8f0] font-['Inter']">
      <Sidebar />

      {/* flex-1 w-full min-w-0 — mengisi sisa lebar setelah sidebar */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
                Tandai Semua Dibaca
              </button>
            )}
          </div>

          {/* ── Konten: w-full, max-w-7xl — tidak ada pembatas yang mengunci di 672px ── */}
          <div className="w-full max-w-7xl flex flex-col gap-6">

            {/* Unread section */}
            {unreadList.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Belum Dibaca · {unreadList.length}
                </h2>
                <div className="flex flex-col gap-2">
                  {unreadList.map((n) => (
                    <NotifRow key={n.id} notif={n} onRead={markAsRead} onClick={handleClick} />
                  ))}
                </div>
              </section>
            )}

            {/* Read section */}
            {readList.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Sudah Dibaca · {readList.length}
                </h2>
                <div className="flex flex-col gap-2">
                  {readList.map((n) => (
                    <NotifRow key={n.id} notif={n} onRead={markAsRead} onClick={handleClick} />
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-3xl border border-gray-100">
                <Bell className="w-12 h-12 text-gray-300" />
                <p className="text-gray-400 text-sm">Tidak ada notifikasi</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}