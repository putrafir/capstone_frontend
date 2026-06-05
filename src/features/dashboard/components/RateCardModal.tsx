

"use client";

import { X, TrendingUp, Eye, Users } from "lucide-react";
import { getRateCardByFollowers } from "@/shared/lib/rateCardHelper";
import type { Creator } from "@/shared/types";

export interface RateCardModalProps {
  creator: Creator;
  onClose: () => void;
  onContactCreator: () => void;
}


function Verified() {
  return (
    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function RateCardModal({ creator, onClose, onContactCreator }: RateCardModalProps) {
  const rateCard = getRateCardByFollowers(creator.followers);

  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-11 h-11 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-gray-900 text-sm truncate">{creator.name}</p>
              <Verified />
            </div>
            <p className="text-xs text-gray-400 truncate">{creator.handle}</p>
          </div>
          {/* Tier badge */}
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${rateCard.tierColor}`}>
            {rateCard.tier}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors ml-1"
            aria-label="Tutup Rate Card"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1">
          {/* Stats row */}
          <div className="flex items-center justify-around px-5 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-gray-400">
                <Users className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Followers</span>
              </div>
              <span className="text-base font-bold text-sky-950">{creator.followers}</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-gray-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Engagement</span>
              </div>
              <span className="text-base font-bold text-sky-950">{creator.engagement}</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-gray-400">
                <Eye className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Avg Views</span>
              </div>
              <span className="text-base font-bold text-sky-950">{creator.avgViews}</span>
            </div>
          </div>

          {/* Pricing table */}
          <div className="px-5 py-4">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Estimasi Harga Konten</h3>
            <div className="flex flex-col gap-2">
              {rateCard.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-gray-700">{item.contentType}</span>
                    <span className="text-xs text-gray-400">{item.platform}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">{rateCard.note}</p>
          </div>

          {/* Category info */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 rounded-xl">
              <span className="text-xs text-blue-700">
                <strong>Niche:</strong> {creator.category} · <strong>Lokasi:</strong> {creator.location}
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={onContactCreator}
            className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            Hubungi Kreator
          </button>
        </div>
      </div>
    </div>
  );
}