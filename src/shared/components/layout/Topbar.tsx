"use client";


import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useCurrentUser } from "@/features/profile/hooks/useCurrentUser";

export default function Topbar() {
  const router = useRouter();
  const { unreadCount } = useNotifications();
  const user = useCurrentUser();

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-16 px-6 bg-white flex items-center justify-end gap-3 border-b border-gray-100 shrink-0 w-full">
      {}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
        <div className="w-4 h-4 rounded-full bg-sky-950 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">$</span>
        </div>
        <span className="text-sky-950 text-sm font-medium">
          {user.coins.toLocaleString("id-ID")} Coins
        </span>
      </div>

      {/* Bell */}
      <button
        onClick={() => router.push("/notifications")}
        aria-label="Lihat Notifikasi"
        className="relative w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/15 transition-colors"
      >
        <Bell className="w-5 h-5 text-sky-950" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[9px] font-bold leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* User Avatar */}
      <button
        onClick={() => router.push("/profile")}
        aria-label="Lihat Profil"
        className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">{initials}</span>
          </div>
        )}
        <span className="text-sky-950 text-xs truncate max-w-[80px]">
          {user.name.split(" ")[0]}
        </span>
      </button>
    </header>
  );
}