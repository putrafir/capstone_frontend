"use client";

import { useState } from "react";
import Sidebar from "@/shared/components/layout/Sidebar";
import Topbar from "@/shared/components/layout/Topbar";
import { useCurrentUser } from "@/features/profile/hooks/useCurrentUser";
import EditProfileModal from "@/features/dashboard/components/EditProfileModal";
import {
  User,
  Mail,
  Building2,
  Shield,
  Calendar,
  Pencil,
} from "lucide-react";

// ── Info Row ─────────────────────────────────────────────────
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-800 break-all">{value}</p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function ProfilePage() {
  const user = useCurrentUser();
  const [editOpen, setEditOpen] = useState(false);

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const joinedFormatted = new Date(user.joinedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-[#dde8f0] font-['Inter']">
      <Sidebar />

      {/* Main area: flex-1 w-full min-w-0 — mengisi sisa lebar setelah sidebar */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola informasi akun dan preferensi Anda
              </p>
            </div>
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit Profil
            </button>
          </div>

          {/* ── Konten: full width, max-w-7xl agar tidak terlalu lebar di ultrawide */}
          <div className="w-full max-w-7xl">

            {/* Avatar Hero Card — full width */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center border-4 border-blue-100">
                    <span className="text-white text-3xl font-bold">{initials}</span>
                  </div>
                )}
              </div>

              {/* Info singkat */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 mt-1">{user.role}</p>
                <p className="text-sm text-gray-400 mt-0.5">{user.company}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-xs font-semibold text-blue-700">
                    💰 {user.coins.toLocaleString("id-ID")} Coins
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full text-xs font-semibold text-green-700">
                    ✓ Akun Aktif
                  </span>
                </div>
              </div>

              {/* Edit shortcut di kanan */}
              <button
                onClick={() => setEditOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 transition-colors shrink-0"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            </div>

            {/* ── Info Grid: 2 kolom desktop, 1 kolom mobile ── */}
            <div>
              <h3 className="text-base font-bold text-gray-700 mb-4">
                Informasi Akun
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoRow icon={User}      label="Nama Lengkap" value={user.name} />
                <InfoRow icon={Mail}      label="Email"        value={user.email} />
                <InfoRow icon={Building2} label="Perusahaan"   value={user.company} />
                <InfoRow icon={Shield}    label="Role / Jabatan" value={user.role} />
                <InfoRow icon={Calendar}  label="Bergabung"    value={joinedFormatted} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {editOpen && <EditProfileModal onClose={() => setEditOpen(false)} />}
    </div>
  );
}