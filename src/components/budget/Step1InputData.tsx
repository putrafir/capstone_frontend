"use client";


import type { CampaignFormData, CampaignFormErrors } from "@/types";
import { Coins } from "lucide-react";

const INDUSTRY_OPTIONS = [
  "Beauty & Skincare", "Fashion & Apparel", "Food & Beverage",
  "Technology", "Health & Wellness", "Gaming", "Travel",
  "Finance", "Education", "Lifestyle",
];

const LOKASI_OPTIONS = [
  "Seluruh Indonesia", "Jakarta", "Bandung", "Surabaya",
  "Medan", "Makassar", "Yogyakarta", "Bali",
];

const JENIS_KELAMIN_OPTIONS = [
  { value: "semua", label: "Semua" },
  { value: "pria", label: "Pria" },
  { value: "wanita", label: "Wanita" },
];

const TUJUAN_OPTIONS = [
  "Brand Awareness", "Meningkatkan Penjualan", "Engagement",
  "Product Launch", "Follower Growth",
];

interface Step1Props {
  form: CampaignFormData;
  errors: CampaignFormErrors;
  onChange: (updated: Partial<CampaignFormData>) => void;
  onNext: () => void;
  loading?: boolean;
}

/** Helper: class untuk input yang error */
function inputCls(hasError: boolean) {
  return `w-full px-3.5 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? "border-red-400 focus:ring-red-400 bg-red-50"
      : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
  }`;
}

/** Helper: pesan error */
function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-500 font-medium">{msg}</p>;
}

export default function Step1InputData({ form, errors, onChange, onNext, loading }: Step1Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Informasi Bisnis */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-800 mb-5">Informasi Bisnis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nama Kampanye <span className="text-red-500">*</span>
            </label>
            <input
              id="field-namaCampaign"
              type="text"
              placeholder="Masukkan nama kampanye"
              value={form.namaCampaign}
              onChange={(e) => onChange({ namaCampaign: e.target.value })}
              className={inputCls(!!errors.namaCampaign)}
            />
            <ErrorMsg msg={errors.namaCampaign} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Industry/Niche <span className="text-red-500">*</span>
            </label>
            <select
              id="field-industryNiche"
              value={form.industryNiche}
              onChange={(e) => onChange({ industryNiche: e.target.value })}
              className={inputCls(!!errors.industryNiche)}
            >
              <option value="">Masukkan industry/niche</option>
              {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <ErrorMsg msg={errors.industryNiche} />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Deskripsi Produk <span className="text-red-500">*</span>
          </label>
          <textarea
            id="field-deskripsiProduk"
            placeholder="Jelaskan produk Anda secara detail, bahan utama, atau siapa yang paling cocok menggunakannya (minimal 20 karakter)"
            value={form.deskripsiProduk}
            onChange={(e) => onChange({ deskripsiProduk: e.target.value })}
            rows={4}
            className={`${inputCls(!!errors.deskripsiProduk)} resize-none`}
          />
          <div className="flex items-center justify-between mt-1">
            <ErrorMsg msg={errors.deskripsiProduk} />
            <span className={`text-xs ml-auto ${form.deskripsiProduk.length < 20 ? "text-gray-400" : "text-green-500"}`}>
              {form.deskripsiProduk.length}/20 min
            </span>
          </div>
        </div>
      </div>

      {/* Sasaran Pasar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-800 mb-5">Sasaran Pasar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Usia Pelanggan <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  id="field-usiaDari"
                  type="number"
                  placeholder="Dari usia"
                  value={form.usiaDari}
                  onChange={(e) => onChange({ usiaDari: e.target.value ? Number(e.target.value) : "" })}
                  min={13}
                  max={80}
                  className={inputCls(!!errors.usiaDari || !!errors.usiaRange)}
                />
              </div>
              <span className="text-gray-400 shrink-0">–</span>
              <div className="flex-1">
                <input
                  id="field-usiaHingga"
                  type="number"
                  placeholder="Hingga usia"
                  value={form.usiaHingga}
                  onChange={(e) => onChange({ usiaHingga: e.target.value ? Number(e.target.value) : "" })}
                  min={13}
                  max={80}
                  className={inputCls(!!errors.usiaHingga || !!errors.usiaRange)}
                />
              </div>
            </div>
            <ErrorMsg msg={errors.usiaDari || errors.usiaHingga || errors.usiaRange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Lokasi Target <span className="text-red-500">*</span>
            </label>
            <select
              id="field-lokasiTarget"
              value={form.lokasiTarget}
              onChange={(e) => onChange({ lokasiTarget: e.target.value })}
              className={inputCls(!!errors.lokasiTarget)}
            >
              <option value="">Pilih lokasi target</option>
              {LOKASI_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <ErrorMsg msg={errors.lokasiTarget} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Jenis Kelamin Pelanggan <span className="text-red-500">*</span>
            </label>
            <select
              id="field-jenisKelamin"
              value={form.jenisKelamin}
              onChange={(e) => onChange({ jenisKelamin: e.target.value })}
              className={inputCls(!!errors.jenisKelamin)}
            >
              <option value="">Pilih jenis kelamin pelanggan</option>
              {JENIS_KELAMIN_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ErrorMsg msg={errors.jenisKelamin} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tujuan Kampanye <span className="text-red-500">*</span>
            </label>
            <select
              id="field-tujuanCampaign"
              value={form.tujuanCampaign}
              onChange={(e) => onChange({ tujuanCampaign: e.target.value })}
              className={inputCls(!!errors.tujuanCampaign)}
            >
              <option value="">Pilih tujuan kampanye</option>
              {TUJUAN_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <ErrorMsg msg={errors.tujuanCampaign} />
          </div>
        </div>
      </div>

      {/* Anggaran & Platform */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-800 mb-5">Anggaran &amp; Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Total Anggaran (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              id="field-totalAnggaran"
              type="text"
              placeholder="Masukkan total anggaran"
              value={form.totalAnggaran}
              onChange={(e) => onChange({ totalAnggaran: e.target.value })}
              className={inputCls(!!errors.totalAnggaran)}
            />
            <ErrorMsg msg={errors.totalAnggaran} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Durasi Kampanye <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  id="field-tanggalMulai"
                  type="date"
                  value={form.tanggalMulai}
                  onChange={(e) => onChange({ tanggalMulai: e.target.value })}
                  className={inputCls(!!errors.tanggalMulai || !!errors.tanggalRange)}
                />
              </div>
              <span className="text-gray-400 shrink-0 text-sm">to</span>
              <div className="flex-1">
                <input
                  id="field-tanggalSelesai"
                  type="date"
                  value={form.tanggalSelesai}
                  onChange={(e) => onChange({ tanggalSelesai: e.target.value })}
                  className={inputCls(!!errors.tanggalSelesai || !!errors.tanggalRange)}
                />
              </div>
            </div>
            <ErrorMsg msg={errors.tanggalMulai || errors.tanggalSelesai || errors.tanggalRange} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            {(["instagram", "tiktok"] as const).map((p) => (
              <label key={p} className="flex items-center gap-2 cursor-pointer">
                <input
                  id={p === "instagram" ? "field-platform" : undefined}
                  type="checkbox"
                  checked={form.platform[p]}
                  onChange={(e) =>
                    onChange({ platform: { ...form.platform, [p]: e.target.checked } })
                  }
                  className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                />
                <span className="text-sm text-gray-700">
                  {p === "instagram" ? "Instagram" : "TikTok"}
                </span>
              </label>
            ))}
          </div>
          <ErrorMsg msg={errors.platform} />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Coins className="w-4 h-4" />
          )}
          Generate Strategy
          <span className="flex items-center gap-1 bg-blue-500 px-2 py-0.5 rounded-full text-xs">
            <span>✦</span> 40
          </span>
        </button>
      </div>
    </form>
  );
}