"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Heart, Share2, Search, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { fetchCampaigns } from "@/services/campaignService";
import { useManagedCampaigns } from "@/hooks/useManagedCampaigns";
import type { Campaign, CampaignStatus } from "@/types/campaign";

// ── Status badge ────────────────────────────────────────────
const STATUS_MAP: Record<CampaignStatus, { dot: string; label: string }> = {
  Pending:  { dot: "bg-gray-400",  label: "Pending" },
  Berjalan: { dot: "bg-blue-500",  label: "Berjalan" },
  Selesai:  { dot: "bg-green-500", label: "Selesai" },
};

function StatusBadge({ status }: { status: CampaignStatus }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP["Pending"];
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-sm text-gray-700">
      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ── Skeleton ────────────────────────────────────────────────
function CampaignSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center gap-4 animate-pulse">
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-40" />
        <div className="h-3 bg-gray-200 rounded w-28" />
      </div>
      <div className="h-9 bg-gray-200 rounded-full w-28" />
    </div>
  );
}

// ── Unified row shape ────────────────────────────────────────
interface CampaignRow {
  id: string;
  title: string;
  status: CampaignStatus;
  startDate: string;
  creators: { id: number; avatar: string }[];
  views: number;
  likes: number;
  shares: number;
  
  isManaged: boolean;
}

export default function CampaignsPage() {
  const router = useRouter();

  // Mock API campaigns
  const [apiCampaigns, setApiCampaigns] = useState<Campaign[]>([]);
  const [apiLoading, setApiLoading]     = useState(true);
  const [apiError, setApiError]         = useState<string | null>(null);

  
  const {
    campaigns: managed,
    loading: managedLoading,
  } = useManagedCampaigns();

  const [search, setSearch] = useState("");
  const [tab, setTab]       = useState<"active" | "finished">("active");

  const loadApi = async () => {
    setApiLoading(true);
    setApiError(null);
    try {
      const data = await fetchCampaigns();
      setApiCampaigns(data);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Gagal memuat campaign");
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => { loadApi(); }, []);

  
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  
  const managedRows: CampaignRow[] = managed.map((m) => ({
    id: m.id,
    title: m.campaignName,
    status: m.status,
    startDate: m.startDate,
    creators: m.influencers,
    views: m.views,
    likes: m.likes,
    shares: m.shares,
    isManaged: true,
  }));

  const apiRows: CampaignRow[] = apiCampaigns.map((c) => ({
    id: c.id,
    title: c.title,
    status: c.status,
    startDate: c.startDate,
    creators: c.creators,
    views: c.views,
    likes: c.likes,
    shares: c.shares,
    isManaged: false,
  }));

  
  const allRows: CampaignRow[] = [...managedRows, ...apiRows];

  // Filter tab & search
  const filtered = allRows.filter((c) => {
    const matchTab    = tab === "active" ? c.status !== "Selesai" : c.status === "Selesai";
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const activeCount   = allRows.filter((c) => c.status !== "Selesai").length;
  const finishedCount = allRows.filter((c) => c.status === "Selesai").length;

  const isLoading = apiLoading || managedLoading;

  return (
    <div className="flex min-h-screen bg-gray-50 font-['Inter']">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Campaign List</h1>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-5">
            {(["active", "finished"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  tab === t
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {t === "active" ? `Active (${activeCount})` : `Finished (${finishedCount})`}
              </button>
            ))}
          </div>

          {/* Search + New Campaign */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaign by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => router.push("/budget")}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              New Campaign
            </button>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm mb-4">
              <span>⚠️ {apiError}</span>
              <button
                onClick={loadApi}
                className="ml-auto px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* List */}
          <div className="flex flex-col gap-3">
            {isLoading
              ? [1, 2, 3, 4].map((i) => <CampaignSkeleton key={i} />)
              : filtered.length === 0
              ? (
                <div className="text-center py-20 text-gray-400 text-sm">
                  Tidak ada campaign ditemukan.{" "}
                  <button
                    onClick={() => router.push("/budget")}
                    className="text-blue-600 hover:underline"
                  >
                    Buat campaign baru?
                  </button>
                </div>
              )
              : filtered.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex flex-wrap items-center gap-4"
                >
                  {/* Title + status + date */}
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-gray-900">{c.title}</span>
                      <StatusBadge status={c.status} />
                      {c.isManaged && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                          Managed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-gray-500">
                        Started {fmt(c.startDate)}
                      </span>
                      {/* Avatar stack */}
                      <div className="flex -space-x-2">
                        {c.creators.slice(0, 3).map((cr) => (
                          <img
                            key={cr.id}
                            src={cr.avatar}
                            alt=""
                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                        {c.creators.length > 3 && (
                          <span className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                            +{c.creators.length - 3}
                          </span>
                        )}
                      </div>
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-600 ml-2">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> {c.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" /> {c.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3.5 h-3.5" /> {c.shares.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                
                  <Link
                    href={`/campaigns/${c.id}`}
                    className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Lihat detail →
                  </Link>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}