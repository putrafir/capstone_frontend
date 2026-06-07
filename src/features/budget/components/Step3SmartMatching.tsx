"use client";

import { useState } from "react";
import type { Influencer, InfluencerTier, Strategy } from "@/shared/types";
import { CheckCircle } from "lucide-react";

interface InfluencerCardProps {
  inf: Influencer;
}

function InfluencerCard({ inf }: InfluencerCardProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
      <div className="flex items-center gap-3">
        <img
          src={inf.avatar}
          alt={inf.name}
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-gray-900">{inf.name}</span>
            {inf.verified && (
              <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" />
            )}
          </div>
          <p className="text-xs text-gray-500">{inf.handle}</p>
          <p className="text-xs text-gray-400">{inf.location} · {inf.category}</p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full">
            Akurasi {inf.akurasi}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden sm:flex flex-col items-center">
          <span className="text-[10px] text-gray-400">Followers</span>
          <span className="text-sm font-bold text-gray-900">{inf.followers}</span>
        </div>
        <div className="hidden sm:flex flex-col items-center">
          <span className="text-[10px] text-gray-400">Engagement</span>
          <span className="text-sm font-bold text-gray-900">{inf.engagement}</span>
        </div>
        <div className="hidden sm:flex flex-col items-center">
          <span className="text-[10px] text-gray-400">Avg Views</span>
          <span className="text-sm font-bold text-gray-900">{inf.avgViews}</span>
        </div>
        <div className="flex flex-col gap-1.5 shrink-0">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap">
            Lihat Rate Card
          </button>
          <button className="px-4 py-1.5 border border-gray-300 text-gray-600 text-xs font-medium rounded-full hover:border-blue-400 transition-colors">
            Ubah
          </button>
        </div>
      </div>
    </div>
  );
}

const TABS: InfluencerTier[] = ["Mega", "Mikro", "Nano"];

interface Step3Props {
  strategy: Strategy;
  influencers: Influencer[];
  loading: boolean;
  error: string | null;
  onBack: () => void;
  onNext: () => void;
}

export default function Step3SmartMatching({
  strategy,
  influencers,
  loading,
  error,
  onBack,
  onNext,
}: Step3Props) {
  const [activeTab, setActiveTab] = useState<InfluencerTier>("Mikro");

  const filtered = influencers.filter((i) => i.tier === activeTab);
  const countByTier = (tier: InfluencerTier) => influencers.filter((i) => i.tier === tier).length;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Strategy Summary */}
      <div className="lg:w-80 xl:w-96 shrink-0">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
          <h3 className="text-base font-bold text-gray-900">{strategy.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{strategy.tagline}</p>

          <h4 className="text-sm font-bold text-gray-800 mb-3">Daftar Belanja</h4>
          <div className="space-y-2.5">
            <div>
              <p className="text-xs text-gray-500 mb-1">Jumlah Konten Instagram</p>
              <div className="flex gap-2">
                <input type="number" defaultValue={strategy.daftarBelanja.instagram.video}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jumlah video" />
                <input type="number" defaultValue={strategy.daftarBelanja.instagram.story}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jumlah story" />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Jumlah Konten TikTok</p>
              <div className="flex gap-2">
                <input type="number" defaultValue={strategy.daftarBelanja.tiktok.video}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jumlah video" />
                <input type="number" defaultValue={strategy.daftarBelanja.tiktok.story}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jumlah story" />
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-3 space-y-1.5">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="accent-blue-600" />
              <span className="text-sm text-gray-700">Boost Code Ads: 5.000.000</span>
            </label>
            {strategy.daftarBelanja.owningContent && (
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                <span className="text-sm text-gray-700">Owning Content: Rp {new Intl.NumberFormat("id-ID").format(strategy.daftarBelanja.owningContent)}</span>
              </label>
            )}
            {strategy.daftarBelanja.yellowCart && (
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                <span className="text-sm text-gray-700">Yellow Cart</span>
              </label>
            )}
          </div>

          {/* Yang di Dapat */}
          <div className="mt-4">
            <h4 className="text-sm font-bold text-gray-800 mb-2">Yang di Dapat</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Alokasi: {strategy.yangDiDapat.alokasi}</li>
              <li>• Fee Influencer: Rp {new Intl.NumberFormat("id-ID").format(strategy.yangDiDapat.feeInfluencer)}</li>
              <li>• Bost Code: Ads: {new Intl.NumberFormat("id-ID").format(strategy.yangDiDapat.boostCode)}</li>
            </ul>
          </div>

          {/* Prediksi */}
          <div className="mt-4">
            <h4 className="text-sm font-bold text-gray-800 mb-2">Prediksi Hasil</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Reach: {strategy.prediksiHasil.reach}</li>
              <li>• Est. Sales: {strategy.prediksiHasil.estSales}</li>
              <li>• ROI Proyeksi: {strategy.prediksiHasil.roiProyeksi}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right: Influencer List */}
      <div className="flex-1 min-w-0">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab} ({countByTier(tab)})
            </button>
          ))}
        </div>

        {/* Influencer Cards */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-500 text-sm">Tidak ada influencer {activeTab} yang tersedia</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {filtered.map((inf) => (
              <InfluencerCard key={inf.id} inf={inf} />
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            « Kembali
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Lanjutkan »
          </button>
        </div>
      </div>
    </div>
  );
}
