"use client";
// ============================================================
// FILE: src/components/EditProfileModal.tsx
// Modal edit profil — validasi, loading, toast, update realtime.
// Menggunakan updateUser() dari useCurrentUser agar perubahan
// langsung muncul di Topbar, Profile, dan semua komponen lain.
// ============================================================

import { useState, useEffect, useRef } from "react";
import { X, Check, AlertCircle, User, Mail, Building2, Shield, Camera } from "lucide-react";
import { useCurrentUser, updateUser } from "@/features/profile/hooks/useCurrentUser";

// ── Validasi ─────────────────────────────────────────────────
interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
}

function validate(data: {
  name: string;
  email: string;
  company: string;
  role: string;
}): FormErrors {
  const errors: FormErrors = {};
  if (data.name.trim().length < 3)
    errors.name = "Nama minimal 3 karakter.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Format email tidak valid.";
  if (!data.company.trim())
    errors.company = "Nama perusahaan tidak boleh kosong.";
  if (!data.role.trim())
    errors.role = "Role / jabatan tidak boleh kosong.";
  return errors;
}

// ── Field component ───────────────────────────────────────────
function Field({
  icon: Icon,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm outline-none transition-all ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────
function Toast({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium animate-in slide-in-from-bottom-4 duration-300 ${
        type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      {type === "success" ? (
        <Check className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      {message}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────
interface EditProfileModalProps {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const user = useCurrentUser();

  // Form state — inisialisasi dari data user saat ini
  const [name, setName]       = useState(user.name);
  const [email, setEmail]     = useState(user.email);
  const [company, setCompany] = useState(user.company);
  const [role, setRole]       = useState(user.role);
  const [avatar, setAvatar]   = useState(user.avatar ?? "");

  const [errors, setErrors]   = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tutup toast otomatis setelah 3 detik
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Tutup modal dengan ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Avatar upload (client-side preview saja)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const formData = { name, email, company, role };
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      // Simulasi API call — ganti dengan axiosInstance.put("/api/profile", ...) saat integrasi
      await new Promise((r) => setTimeout(r, 700));

      // Update singleton state → semua komponen (Topbar, Profile) re-render
      updateUser({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        role: role.trim(),
        avatar: avatar || undefined,
      });

      setToast({ type: "success", message: "Profil berhasil diperbarui!" });
      setTimeout(() => onClose(), 1200);
    } catch {
      setToast({ type: "error", message: "Gagal menyimpan. Coba lagi." });
    } finally {
      setLoading(false);
    }
  };

  // Inisial dari nama yang sedang diketik (live preview)
  const previewInitials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Edit Profil</h2>
              <p className="text-xs text-gray-400 mt-0.5">Perubahan langsung tersimpan</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">

            {/* Avatar preview + upload */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center border-4 border-blue-100">
                    <span className="text-white text-2xl font-bold">
                      {previewInitials || "?"}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-400">Klik ikon kamera untuk ganti foto</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              {avatar && (
                <button
                  onClick={() => setAvatar("")}
                  className="text-xs text-red-500 hover:text-red-600 underline"
                >
                  Hapus foto
                </button>
              )}
            </div>

            {/* Form grid: 2 kolom desktop, 1 kolom mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                icon={User}
                label="Nama Lengkap"
                value={name}
                onChange={setName}
                error={errors.name}
                placeholder="Nama lengkap Anda"
              />
              <Field
                icon={Mail}
                label="Email"
                value={email}
                onChange={setEmail}
                error={errors.email}
                type="email"
                placeholder="email@perusahaan.com"
              />
              <Field
                icon={Building2}
                label="Nama Perusahaan"
                value={company}
                onChange={setCompany}
                error={errors.company}
                placeholder="Nama perusahaan Anda"
              />
              <Field
                icon={Shield}
                label="Role / Jabatan"
                value={role}
                onChange={setRole}
                error={errors.role}
                placeholder="Contoh: Brand Manager"
              />
            </div>

            {/* Read-only info */}
            <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 font-medium mb-2">Tidak dapat diubah</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                <span>ID: <strong className="text-gray-700">{user.id}</strong></span>
                <span>Coins: <strong className="text-gray-700">{user.coins.toLocaleString("id-ID")}</strong></span>
                <span>Bergabung: <strong className="text-gray-700">{new Date(user.joinedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</strong></span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 py-5 border-t border-gray-100 shrink-0">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </>
  );
}