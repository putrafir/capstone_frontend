"use client";


import type { Strategy, CampaignFormData } from "@/shared/types";

interface StrategyCardProps {
  strategy: Strategy;
  onPilih: () => void;
  localContent: { ig: { video: number; story: number }; tt: { video: number; story: number } };
  onContentChange: (
    platform: "ig" | "tt",
    field: "video" | "story",
    value: number
  ) => void;
  checkedItems: { boost: boolean; owning: boolean; yellowCart: boolean };
  onCheckChange: (field: "boost" | "owning" | "yellowCart") => void;
}

function StrategyCard({
  strategy,
  onPilih,
  localContent,
  onContentChange,
  checkedItems,
  onCheckChange,
}: StrategyCardProps) {
  const formatRp = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "decimal" }).format(n);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900">{strategy.name}</h3>
        <p className="text-sm text-gray-500">{strategy.tagline}</p>
      </div>

      {/* Daftar Belanja */}
      <div>
        <h4 className="text-sm font-bold text-gray-800 mb-3">Daftar Belanja</h4>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Jumlah Konten Instagram</p>
            <div className="flex gap-2">
              {(["video", "story"] as const).map((f) => (
                <input
                  key={f}
                  type="number"
                  min={0}
                  value={localContent.ig[f]}
                  onChange={(e) => onContentChange("ig", f, Number(e.target.value))}
                  placeholder={`Jumlah ${f}`}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Jumlah Konten TikTok</p>
            <div className="flex gap-2">
              {(["video", "story"] as const).map((f) => (
                <input
                  key={f}
                  type="number"
                  min={0}
                  value={localContent.tt[f]}
                  onChange={(e) => onContentChange("tt", f, Number(e.target.value))}
                  placeholder={`Jumlah ${f}`}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Checkbox items */}
        <div className="mt-3 space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={checkedItems.boost}
              onChange={() => onCheckChange("boost")}
              className="w-4 h-4 rounded accent-blue-600"
            />
            <span className="text-sm text-gray-700">
              Boost Code Ads: {formatRp(strategy.daftarBelanja.boostCodeAds)}
            </span>
          </label>
          {strategy.daftarBelanja.owningContent !== null && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.owning}
                onChange={() => onCheckChange("owning")}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm text-gray-700">
                Owning Content: Rp {formatRp(strategy.daftarBelanja.owningContent!)}
              </span>
            </label>
          )}
          {strategy.daftarBelanja.yellowCart && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.yellowCart}
                onChange={() => onCheckChange("yellowCart")}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm text-gray-700">Yellow Cart</span>
            </label>
          )}
        </div>
      </div>

      {/* Yang di Dapat */}
      <div>
        <h4 className="text-sm font-bold text-gray-800 mb-2">Yang di Dapat</h4>
        <ul className="space-y-1">
          <li className="text-sm text-gray-700">• Alokasi: {strategy.yangDiDapat.alokasi}</li>
          <li className="text-sm text-gray-700">• Fee Influencer: Rp {formatRp(strategy.yangDiDapat.feeInfluencer)}</li>
          <li className="text-sm text-gray-700">• Bost Code: Ads: {formatRp(strategy.yangDiDapat.boostCode)}</li>
          {strategy.yangDiDapat.owningContent && (
            <li className="text-sm text-gray-700">• Owning Content:</li>
          )}
          {strategy.yangDiDapat.yellowCart && (
            <li className="text-sm text-gray-700">• Yellow Cart: {formatRp(strategy.yangDiDapat.yellowCart!)}</li>
          )}
        </ul>
      </div>

      {/* Prediksi Hasil */}
      <div>
        <h4 className="text-sm font-bold text-gray-800 mb-2">Prediksi Hasil</h4>
        <ul className="space-y-1">
          <li className="text-sm text-gray-700">• Reach: {strategy.prediksiHasil.reach}</li>
          <li className="text-sm text-gray-700">• Est. Sales: {strategy.prediksiHasil.estSales}</li>
          <li className="text-sm text-gray-700">• ROI Proyeksi: {strategy.prediksiHasil.roiProyeksi}</li>
        </ul>
      </div>

      <button
        onClick={onPilih}
        className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors mt-auto"
      >
        Pilih
      </button>
    </div>
  );
}

interface Step2Props {
  strategies: Strategy[];
  loading: boolean;
  error: string | null;
  form: CampaignFormData;
  onPilih: (strategyId: string) => void;
}

interface ContentState {
  ig: { video: number; story: number };
  tt: { video: number; story: number };
}

interface CheckState {
  boost: boolean;
  owning: boolean;
  yellowCart: boolean;
}

import { useState } from "react";

export default function Step2Strategy({ strategies, loading, error, form, onPilih }: Step2Props) {
  const [contentStates, setContentStates] = useState<Record<string, ContentState>>({});
  const [checkStates, setCheckStates] = useState<Record<string, CheckState>>({});

  const getContent = (id: string): ContentState =>
    contentStates[id] ?? { ig: { video: 1, story: 1 }, tt: { video: 1, story: 0 } };

  const getChecks = (id: string, s: Strategy): CheckState =>
    checkStates[id] ?? {
      boost: true,
      owning: s.daftarBelanja.owningContent !== null,
      yellowCart: s.daftarBelanja.yellowCart,
    };

  const handleContentChange = (
    id: string,
    platform: "ig" | "tt",
    field: "video" | "story",
    value: number
  ) => {
    setContentStates((prev) => ({
      ...prev,
      [id]: {
        ...getContent(id),
        [platform]: { ...getContent(id)[platform], [field]: value },
      },
    }));
  };

  const handleCheckChange = (id: string, s: Strategy, field: "boost" | "owning" | "yellowCart") => {
    const prev = getChecks(id, s);
    setCheckStates((cs) => ({ ...cs, [id]: { ...prev, [field]: !prev[field] } }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse h-96" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <p className="text-sm text-red-400 mt-1">Coba refresh halaman</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Rekomendasi Strategi Kampanye</h2>
        <p className="text-sm text-gray-500 mt-1">
          Berdasarkan budget Rp {form.totalAnggaran} dan target audiens.
          <br />Kamu akan dapat:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((s) => (
          <StrategyCard
            key={s.id}
            strategy={s}
            onPilih={() => onPilih(s.id)}
            localContent={getContent(s.id)}
            onContentChange={(p, f, v) => handleContentChange(s.id, p, f, v)}
            checkedItems={getChecks(s.id, s)}
            onCheckChange={(f) => handleCheckChange(s.id, s, f)}
          />
        ))}
      </div>
    </div>
  );
}
