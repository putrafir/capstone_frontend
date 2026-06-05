

import type { Notification } from "@/types/notification";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    type: "campaign_created",
    title: "Campaign Berhasil Dibuat",
    message: "Campaign \"Yoga 2026\" berhasil dibuat dan sedang menunggu persetujuan creator.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 menit lalu
    read: false,
    href: "/campaigns",
    avatarUrl: undefined,
  },
  {
    id: "notif-2",
    type: "creator_reply",
    title: "Creator Membalas Pesan",
    message: "Windah Basudara membalas pesanmu: \"Baik, saya tertarik untuk berkolaborasi. Bisa kita diskusikan lebih lanjut?\"",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 menit lalu
    read: false,
    href: "/campaigns/1",
    avatarUrl: "https://i.pravatar.cc/60?img=14",
  },
  {
    id: "notif-3",
    type: "payment_success",
    title: "Pembayaran Berhasil",
    message: "Pembayaran sebesar Rp 300.000 untuk campaign \"Yoga 2026\" kepada Windah Basudara telah berhasil diproses.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 jam lalu
    read: false,
    href: "/payment",
    avatarUrl: undefined,
  },
  {
    id: "notif-4",
    type: "content_revision",
    title: "Creator Mengirim Revisi Konten",
    message: "Raditya Dika telah mengirim revisi konten untuk campaign \"Summer Vibes\". Silakan review dan berikan feedback.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 jam lalu
    read: true,
    href: "/campaigns/2",
    avatarUrl: "https://i.pravatar.cc/60?img=11",
  },
  {
    id: "notif-5",
    type: "campaign_completed",
    title: "Campaign Selesai",
    message: "Campaign \"Beauty Glow Q4\" telah selesai. Total reach: 8.4M audience, engagement rate: 5.8%.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 hari lalu
    read: true,
    href: "/campaigns",
    avatarUrl: undefined,
  },
  {
    id: "notif-6",
    type: "creator_negotiation",
    title: "Negosiasi Rate Card",
    message: "Ria Ricis mengajukan counter-offer untuk rate card: Rp 25.000.000 per Reel. Silakan tinjau penawaran ini.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 hari lalu
    read: true,
    href: "/campaigns/3",
    avatarUrl: "https://i.pravatar.cc/60?img=16",
  },
  {
    id: "notif-7",
    type: "campaign_started",
    title: "Campaign Mulai Berjalan",
    message: "Campaign \"TechFest 2026\" sudah mulai berjalan. 5 creator telah dikonfirmasi dan siap membuat konten.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 hari lalu
    read: true,
    href: "/campaigns",
    avatarUrl: undefined,
  },
];