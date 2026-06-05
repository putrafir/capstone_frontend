"use client";


import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  ChevronDown,
  List,
  LayoutGrid,
  X,
  Play,
  Bookmark,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { fetchCreators } from "@/services/searchService";
import type { Creator } from "@/types";
import RateCardModal from "@/components/dashboard/RateCardModal";
import ChatModal from "@/components/dashboard/ChatModal";



// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function PlatformBadge({ platform }: { platform: string }) {
  const map: Record<string, { bg: string; label: string }> = {
    yt: { bg: "bg-red-500", label: "YT" },
    ig: { bg: "bg-pink-500", label: "IG" },
    tt: { bg: "bg-gray-900", label: "TT" },
  };
  const item = map[platform] ?? { bg: "bg-gray-400", label: platform.toUpperCase() };
  return (
    <span className={`${item.bg} text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full`}>
      {item.label}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

// Skeleton untuk list view — overflow-hidden aman: tidak ada dropdown child
function CreatorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="flex flex-wrap items-center gap-4 px-5 py-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0" />
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="h-4 bg-gray-200 rounded-full w-36" />
          <div className="h-3 bg-gray-200 rounded-full w-24" />
          <div className="h-3 bg-gray-200 rounded-full w-44" />
        </div>
        <div className="flex gap-8 ml-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-3 bg-gray-200 rounded-full w-16" />
              <div className="h-5 bg-gray-200 rounded-full w-12" />
            </div>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <div className="h-9 bg-gray-200 rounded-full w-32" />
          <div className="h-9 bg-gray-200 rounded-full w-20" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 px-1 pb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-video bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// Skeleton grid view — overflow-hidden aman: tidak ada dropdown child
function GridCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse p-4 flex flex-col gap-3">
      <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto" />
      <div className="flex flex-col items-center gap-2">
        <div className="h-4 bg-gray-200 rounded-full w-28" />
        <div className="h-3 bg-gray-200 rounded-full w-20" />
      </div>
      <div className="flex justify-between mt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="h-3 bg-gray-200 rounded-full w-14" />
            <div className="h-5 bg-gray-200 rounded-full w-10" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1 mt-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Dropdown Filter generic
function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-sm font-medium transition-colors ${value
          ? "border-blue-600 text-blue-600 bg-blue-50"
          : "border-gray-300 text-gray-600 bg-white hover:border-gray-400"
          }`}
      >
        {selected?.label ?? label}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        /*
          FIX: overflow-visible sudah benar di sini (sudah ada dari sebelumnya).
          Pastikan z-index = z-50 untuk konsistensi.
          Sebelumnya: z-20  → Sesudah: z-50
        */
        <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div
            className="px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer"
            onClick={() => { onChange(""); setOpen(false); }}
          >
            Semua
          </div>
          {options.map((o) => (
            <div
              key={o.value}
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 transition-colors ${value === o.value ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700"
                }`}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Simpan Dropdown (popup campaign list)
// ─────────────────────────────────────────────────────────────
const CAMPAIGN_LISTS = [
  "Yoga 2026", "Yoga Campaign", "Test Upload",
  "Estheticians", "Toy Influencers", "Mom Influencers",
];

function SaveDropdown({
  creatorId,
  savedIds,
  onSave,
}: {
  creatorId: number;
  savedIds: Set<number>;
  onSave: (id: number, campaign: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isSaved = savedIds.has(creatorId);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = CAMPAIGN_LISTS.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border transition-all whitespace-nowrap ${isSaved
          ? "bg-blue-50 border-blue-600 text-blue-600"
          : "bg-white border-gray-300 text-gray-600 hover:border-blue-400"
          }`}
      >
        {isSaved ? "Tersimpan" : "Simpan"}
      </button>

      {open && (

        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-50">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-lg">
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Temukan daftar kampanye"
                className="text-xs flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
              <button onClick={() => setOpen(false)}>
                <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
          {/* Actions */}
          <div className="py-1">
            <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-blue-600 font-medium hover:bg-blue-50 transition-colors">
              <span className="text-base leading-none">+</span> Add to creators list
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-blue-600 font-medium hover:bg-blue-50 transition-colors">
              <span className="text-base leading-none">+</span> New Campaign List
            </button>
          </div>
          {/* Campaign list — overflow-y-auto di sini aman (bukan wrapper dropdown) */}
          <div className="border-t border-gray-100 max-h-48 overflow-y-auto rounded-b-2xl">
            {filtered.map((c) => (
              <button
                key={c}
                onClick={() => { onSave(creatorId, c); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Compare Modal
// ─────────────────────────────────────────────────────────────
const COMPARE_DATA = [
  {
    followers: "150K", engagement: "4.8%", avgViews: "32K",
    niche: "Food", audienceGender: "70% Female",
    location: "Jakarta", authenticity: "92%",
    estPrice: "Rp 2.5jt", roiScore: "8.7/10",
  },
  {
    followers: "210K", engagement: "3.2%", avgViews: "55K",
    niche: "Lifestyle", audienceGender: "55% Female",
    location: "Bandung", authenticity: "76%",
    estPrice: "Rp 4jt", roiScore: "6.5/10",
  },
];

function CompareModal({ onClose }: { onClose: () => void }) {
  const labels: Array<keyof typeof COMPARE_DATA[0]> = [
    "followers", "engagement", "avgViews", "niche",
    "audienceGender", "location", "authenticity", "estPrice", "roiScore",
  ];
  const labelMap: Record<string, string> = {
    followers: "Followers", engagement: "Engagement", avgViews: "Avg. Views",
    niche: "Niche", audienceGender: "Audience Gender", location: "Location",
    authenticity: "Authenticity", estPrice: "Est. Price", roiScore: "ROI Score",
  };

  return (
    // z-[100] untuk modal agar selalu di atas semua overlay lain
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Compare 2 Influencers</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-2 gap-4 p-8">
          {COMPARE_DATA.map((d, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-5 flex flex-col gap-3">
              <h3 className="text-base font-bold text-gray-800 text-center mb-2">
                Influencers {i === 0 ? "A" : "B"}
              </h3>
              {labels.map((key) => (
                <div key={key} className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-400">{labelMap[key]}</span>
                  <span className="text-sm font-semibold text-gray-800">{d[key]}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 bg-blue-600 text-white text-xs font-medium rounded-full hover:bg-blue-700">
                  Simpan
                </button>
                <button className="flex-1 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-50">
                  Lihat Profil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Creator Card — List View
// ─────────────────────────────────────────────────────────────
function CreatorCardList({
  creator,
  savedIds,
  checkedIds,
  onSave,
  onCheck,
}: {
  creator: Creator;
  savedIds: Set<number>;
  checkedIds: Set<number>;
  onSave: (id: number, campaign: string) => void;
  onCheck: (id: number) => void;
}) {
  const isChecked = checkedIds.has(creator.id);
  const [rateCardOpen, setRateCardOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleContactCreator = () => {
    setRateCardOpen(false);
    setChatOpen(true);
  };

  return (
    <>
      {/*
        FIX: Hapus `overflow-hidden` dari wrapper card.
        Sebelumnya: className={`bg-white rounded-2xl border overflow-hidden transition-colors ...`}
        Sesudah   : className={`bg-white rounded-2xl border transition-colors ...`}
        Alasan    : overflow-hidden menyebabkan SaveDropdown (absolute positioned child)
                    terpotong di tepi bawah card. Rounded corner tetap berfungsi tanpa overflow-hidden.
      */}
      <div className={`bg-white rounded-2xl border transition-colors ${isChecked ? "border-blue-400 bg-blue-50/30" : "border-gray-200"}`}>
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-4 px-5 py-4">
          {/* Avatar + Info */}
          <div className="flex items-center gap-3 min-w-0">
            <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-gray-900 whitespace-nowrap">{creator.name}</span>
                <VerifiedBadge />
              </div>
              <span className="text-xs text-gray-500">{creator.handle}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{creator.location}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full inline-block" />
                <span className="text-xs text-gray-500">{creator.category}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {creator.platformIcons.map((p) => <PlatformBadge key={p} platform={p} />)}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 ml-4">
            {[
              { label: "Followers", val: creator.followers },
              { label: "Engagement", val: creator.engagement },
              { label: "Avg Views", val: creator.avgViews },
            ].map(({ label, val }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-xs text-gray-500 font-medium">{label}</span>
                <span className="text-lg font-bold text-sky-950">{val}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setRateCardOpen(true)}
              className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Lihat Rate Card
            </button>
            <SaveDropdown creatorId={creator.id} savedIds={savedIds} onSave={onSave} />
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onCheck(creator.id)}
              className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-4 gap-1 px-1 pb-1">
          {creator.recentContent.map((post) => (
            <div key={post.id} className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group">
              <img src={post.imageUrl} alt="konten" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {post.type === "video" && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-md flex items-center justify-center">
                  <Play className="w-3 h-3 text-gray-700 fill-gray-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rate Card Modal — di luar card, tidak ada clipping */}
      {rateCardOpen && (
        <RateCardModal
          creator={creator}
          onClose={() => setRateCardOpen(false)}
          onContactCreator={handleContactCreator}
        />
      )}

      {/* Chat Modal */}
      {chatOpen && (
        <ChatModal
          creatorId={creator.id}
          creatorName={creator.name}
          creatorAvatar={creator.avatar}
          creatorSub={creator.category}
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Creator Card — Grid View
// ─────────────────────────────────────────────────────────────
function CreatorCardGrid({
  creator,
  savedIds,
  checkedIds,
  onSave,
  onCheck,
}: {
  creator: Creator;
  savedIds: Set<number>;
  checkedIds: Set<number>;
  onSave: (id: number, campaign: string) => void;
  onCheck: (id: number) => void;
}) {
  const isChecked = checkedIds.has(creator.id);
  const [rateCardOpen, setRateCardOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleContactCreator = () => {
    setRateCardOpen(false);
    setChatOpen(true);
  };

  return (
    <>
      {/*
        FIX: Hapus `overflow-hidden` dari wrapper card (sama seperti CreatorCardList).
        Sebelumnya: className={`bg-white rounded-2xl border overflow-hidden transition-colors ...`}
        Sesudah   : className={`bg-white rounded-2xl border transition-colors ...`}
      */}
      <div className={`bg-white rounded-2xl border transition-colors ${isChecked ? "border-blue-400 bg-blue-50/30" : "border-gray-200"}`}>
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-4 px-5 py-4">
          {/* Avatar + Info */}
          <div className="flex items-center gap-3 min-w-0">
            <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-gray-900 whitespace-nowrap">{creator.name}</span>
                <VerifiedBadge />
              </div>
              <span className="text-xs text-gray-500">{creator.handle}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{creator.location}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full inline-block" />
                <span className="text-xs text-gray-500">{creator.category}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {creator.platformIcons.map((p) => <PlatformBadge key={p} platform={p} />)}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 ml-4">
            {[
              { label: "Followers", val: creator.followers },
              { label: "Engagement", val: creator.engagement },
              { label: "Avg Views", val: creator.avgViews },
            ].map(({ label, val }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-xs text-gray-500 font-medium">{label}</span>
                <span className="text-lg font-bold text-sky-950">{val}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setRateCardOpen(true)}
              className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Lihat Rate Card
            </button>
            <SaveDropdown creatorId={creator.id} savedIds={savedIds} onSave={onSave} />
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onCheck(creator.id)}
              className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-4 gap-1 px-1 pb-1">
          {creator.recentContent.map((post) => (
            <div key={post.id} className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group">
              <img src={post.imageUrl} alt="konten" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {post.type === "video" && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-md flex items-center justify-center">
                  <Play className="w-3 h-3 text-gray-700 fill-gray-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rate Card Modal */}
      {rateCardOpen && (
        <RateCardModal
          creator={creator}
          onClose={() => setRateCardOpen(false)}
          onContactCreator={handleContactCreator}
        />
      )}

      {/* Chat Modal */}
      {chatOpen && (
        <ChatModal
          creatorId={creator.id}
          creatorName={creator.name}
          creatorAvatar={creator.avatar}
          creatorSub={creator.category}
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  );
}



// ─────────────────────────────────────────────
// Smart Matching Tab
// ─────────────────────────────────────────────
function SmartMatchingTab() {
  const [form, setForm] = useState({
    campaignName: "",
    industry: "",
    criteria: "",
    ageFrom: "",
    ageTo: "",
    location: "",
    gender: "",
    instagram: false,
    tiktok: false,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Creator[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    setError(null);
    setSubmitted(false);
    try {
      // Simulasi Smart Matching: fetch creators biasa sebagai "hasil AI"
      const { fetchCreators } = await import("@/services/searchService");
      const res = await fetchCreators({ limit: 6 });
      setResults(res.data);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal melakukan matching");
    } finally {
      setLoading(false);
    }
  };

  const NICHE_OPTIONS = ["Fashion", "Food & Beverage", "Gaming", "Beauty", "Lifestyle", "Tech", "Finance", "Travel", "Sports", "Education"];
  const LOCATION_OPTIONS = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali", "Medan", "Makassar"];
  const GENDER_OPTIONS = ["Male", "Female", "All"];

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">
          Informasi Bisnis <span className="text-lg">🎯</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Campaign Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Nama Kampanye</label>
            <input
              value={form.campaignName}
              onChange={(e) => setForm({ ...form, campaignName: e.target.value })}
              placeholder="Masukkan nama kampanye"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          </div>
          {/* Industry */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Industry/Niche</label>
            <select
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-white"
            >
              <option value="">Masukkan Industry/niche</option>
              {NICHE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Criteria */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Kriteria Influencer</label>
          <textarea
            value={form.criteria}
            onChange={(e) => setForm({ ...form, criteria: e.target.value })}
            placeholder="Jelaskan produk Anda secara detail, bahan utama, atau siapa yang paling cocok menggunakannya"
            rows={3}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
          />
        </div>

        {/* Sasaran Pasar */}
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Sasaran Pasar</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Age */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Usia Pelanggan</label>
            <div className="flex gap-2 items-center">
              <input
                type="number" min={13} max={65}
                value={form.ageFrom}
                onChange={(e) => setForm({ ...form, ageFrom: e.target.value })}
                placeholder="Dari usia"
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-400"
              />
              <span className="text-gray-400 text-xs">–</span>
              <input
                type="number" min={13} max={65}
                value={form.ageTo}
                onChange={(e) => setForm({ ...form, ageTo: e.target.value })}
                placeholder="Hingga usia"
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Lokasi Target</label>
            <select
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-white"
            >
              <option value="">Pilih lokasi target</option>
              {LOCATION_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Jenis Kelamin Pelanggan</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-white"
            >
              <option value="">Pilih jenis kelamin pelanggan</option>
              {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* Platform */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-700 mb-2">Platform</label>
          <div className="flex gap-4">
            {(["Instagram", "TikTok"] as const).map((p) => {
              const key = p.toLowerCase() as "instagram" | "tiktok";
              return (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">{p}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            onClick={handleMatch}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Matching with AI
            <span className="flex items-center gap-1 bg-blue-500 rounded-full px-2 py-0.5 text-xs">
              <span>⚡</span> 10
            </span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Results */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <CreatorCardSkeleton key={i} />)}
        </div>
      )}

      {submitted && !loading && results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 font-medium">
            {results.length} kreator cocok ditemukan AI
          </p>
          {results.map((c) => (
            <CreatorCardList
              key={c.id}
              creator={c}
              savedIds={new Set()}
              checkedIds={new Set()}
              onSave={() => { }}
              onCheck={() => { }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

const FOLLOWER_OPTIONS = [
  { label: "Nano (< 10K)", value: "nano" },
  { label: "Micro (10K–100K)", value: "micro" },
  { label: "Macro (100K–1M)", value: "macro" },
  { label: "Mega (> 1M)", value: "mega" },
];

const ENGAGEMENT_OPTIONS = [
  { label: "Rendah (< 1%)", value: "low" },
  { label: "Sedang (1–3%)", value: "medium" },
  { label: "Tinggi (> 3%)", value: "high" },
];

const NICHE_OPTIONS = [
  { label: "Gaming", value: "gamer" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Beauty", value: "beauty" },
  { label: "Edukasi", value: "edukasi" },
  { label: "Entertainer", value: "entertainer" },
];

const GENDER_OPTIONS = [
  { label: "Pria", value: "male" },
  { label: "Wanita", value: "female" },
];

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<"search" | "smart">("search");
  const [platform, setPlatform] = useState<"instagram" | "tiktok">("instagram");
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Filters
  const [followers, setFollowers] = useState("");
  const [engagement, setEngagement] = useState("");
  const [niche, setNiche] = useState("");

  // Data state
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 6;

  // UI state
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [showCompare, setShowCompare] = useState(false);

  // ── Fetch ──────────────────────────────────
  const loadCreators = useCallback(async (p: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCreators({
        q: query,
        platform,
        followers: followers as "nano" | "micro" | "macro" | "mega" | "",
        engagement: engagement as "low" | "medium" | "high" | "",
        niche,
        page: p,
        limit: LIMIT,
      });
      setCreators(res.data);
      setTotal(res.meta.total);
      setPage(res.meta.page);
      setTotalPages(res.meta.totalPages);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal memuat data kreator");
    } finally {
      setLoading(false);
    }
  }, [query, platform, followers, engagement, niche]);

  useEffect(() => {
    if (activeTab === "search") {
      loadCreators(1);
    }
  }, [loadCreators, activeTab]);

  // ── Handlers ───────────────────────────────
  const handleSearch = () => {
    setQuery(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSave = (id: number, _campaign: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleCheck = (id: number) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 2) {
        next.add(id);
      }
      return next;
    });
  };

  const handlePlatform = (p: "instagram" | "tiktok") => {
    setPlatform(p);
    setPage(1);
  };

  // ── Render ─────────────────────────────────
  return (
    <div className="flex min-h-screen bg-[#EBF3FB]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 overflow-auto">
          {/* Tab header */}
          <div className="bg-white border-b border-gray-200 px-6 md:px-8">
            <div className="flex items-center gap-6">
              {(["search", "smart"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab === "search" ? "Search" : "Smart Matching"}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 md:px-8 py-6 space-y-5 max-w-screen-xl mx-auto w-full">

            {/* ── Smart Matching Tab ── */}
            {activeTab === "smart" && <SmartMatchingTab />}

            {/* ── Search Tab ── */}
            {activeTab === "search" && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Temukan Influencer</h1>

                {/* Platform toggle */}
                <div className="flex justify-center">
                  <div className="flex bg-gray-100 rounded-full p-1 gap-1">
                    {(["instagram", "tiktok"] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePlatform(p)}
                        className={`px-5 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${platform === p
                          ? "bg-sky-950 text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                          }`}
                      >
                        {p === "instagram" ? "Instagram" : "TikTok"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search bar */}
                <div className="bg-white rounded-2xl border border-gray-200 px-4 py-3 flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Cari berdasarkan nama, nama pengguna, atau kata kunci"
                    className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shrink-0"
                  >
                    Search
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <FilterDropdown label="Followers" options={FOLLOWER_OPTIONS} value={followers} onChange={setFollowers} />
                  <FilterDropdown label="Engagement" options={ENGAGEMENT_OPTIONS} value={engagement} onChange={setEngagement} />
                  <FilterDropdown label="Gender" options={GENDER_OPTIONS} value="" onChange={() => { }} />
                  <FilterDropdown label="Niche" options={NICHE_OPTIONS} value={niche} onChange={setNiche} />
                </div>

                {/* Sort + View toggle + Compare */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {!loading && !error && (
                      <span className="text-sm text-gray-500">
                        <span className="font-semibold text-gray-800">{total}</span> creators found
                      </span>
                    )}
                    <button className="flex items-center gap-1 text-sm text-gray-600 font-medium hover:text-gray-800">
                      Sort by <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* View toggle */}
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    {/* Compare button */}
                    <button
                      onClick={() => checkedIds.size === 2 && setShowCompare(true)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${checkedIds.size === 2
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      Compare ({checkedIds.size})
                    </button>
                  </div>
                </div>

                {/* ── Loading ── */}
                {loading && (
                  <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"}>
                    {Array.from({ length: LIMIT }).map((_, i) =>
                      viewMode === "grid" ? <GridCardSkeleton key={i} /> : <CreatorCardSkeleton key={i} />
                    )}
                  </div>
                )}

                {/* ── Error ── */}
                {!loading && error && (
                  <div className="flex flex-col items-center gap-4 py-16">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-base font-semibold text-gray-800 mb-1">Gagal Memuat Data</h3>
                      <p className="text-sm text-gray-500 mb-4">{error}</p>
                      <button
                        onClick={() => loadCreators(1)}
                        className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" /> Coba Lagi
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Empty ── */}
                {!loading && !error && creators.length === 0 && (
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl">🔍</div>
                    <h3 className="text-base font-semibold text-gray-800">Tidak Ada Hasil</h3>
                    <p className="text-sm text-gray-500">Coba ubah kata kunci atau filter pencarian</p>
                  </div>
                )}

                {/* ── Results ── */}
                {!loading && !error && creators.length > 0 && (
                  <>
                    {viewMode === "list" ? (
                      <div className="space-y-4">
                        {creators.map((c) => (
                          <CreatorCardList
                            key={c.id}
                            creator={c}
                            savedIds={savedIds}
                            checkedIds={checkedIds}
                            onSave={handleSave}
                            onCheck={handleCheck}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {creators.map((c) => (
                          <CreatorCardGrid
                            key={c.id}
                            creator={c}
                            savedIds={savedIds}
                            checkedIds={checkedIds}
                            onSave={handleSave}
                            onCheck={handleCheck}
                          />
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 pt-4">
                        <button
                          onClick={() => loadCreators(page - 1)}
                          disabled={page <= 1}
                          className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          ← Sebelumnya
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            onClick={() => loadCreators(p)}
                            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${p === page
                              ? "bg-blue-600 text-white"
                              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            {p}
                          </button>
                        ))}
                        <button
                          onClick={() => loadCreators(page + 1)}
                          disabled={page >= totalPages}
                          className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Berikutnya →
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Compare Modal */}
      {showCompare && <CompareModal onClose={() => setShowCompare(false)} />}
    </div>
  );
}