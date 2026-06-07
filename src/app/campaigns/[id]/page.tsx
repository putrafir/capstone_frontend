"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreHorizontal,
  Pencil,
  X,
  Send,
  Eye,
  Heart,
  MessageSquare,
} from "lucide-react";

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

import Sidebar from "@/shared/components/layout/Sidebar";
import Topbar from "@/shared/components/layout/Topbar";
import ChatModal from "@/features/dashboard/components/ChatModal";
import { fetchCampaignDetail } from "@/features/campaigns/services/campaignService";
import type {
  CampaignDetail,
  CampaignCreator,
  ContentGroup,
  ContentItem,
  ContentStatus,
  CreatorStatus,
} from "@/features/campaigns/types/campaign";

// ── Helpers ──────────────────────────────────────────────────
type Tab = "creators" | "strategi" | "content" | "tracking";

const CREATOR_STATUS_MAP: Record<
  CreatorStatus,
  { bg: string; dot: string }
> = {
  Negosiasi: {
    bg: "bg-orange-100 text-orange-600 border-orange-200",
    dot: "bg-orange-500",
  },
  "Butuh direview": {
    bg: "bg-pink-100 text-pink-600 border-pink-200",
    dot: "bg-pink-500",
  },
  Posting: {
    bg: "bg-indigo-100 text-indigo-600 border-indigo-200",
    dot: "bg-indigo-500",
  },
  Selesai: {
    bg: "bg-green-100 text-green-600 border-green-200",
    dot: "bg-green-500",
  },
};

const CONTENT_STATUS_MAP: Record<
  ContentStatus,
  { bg: string; text: string }
> = {
  Revisi: { bg: "bg-red-500", text: "text-white" },
  "Perlu direview": { bg: "bg-blue-500", text: "text-white" },
  Disetujui: { bg: "bg-green-500", text: "text-white" },
};

function fmtRange() {
  const opts: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return `${new Date().toLocaleDateString(
    "en-US",
    opts
  )} - Today`;
}

// ── Skeleton ─────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 rounded-xl animate-pulse ${className ?? ""}`}
    />
  );
}

// ── Creators Tab ─────────────────────────────────────────────
function CreatorsTab({
  creators,
}: {
  creators: CampaignCreator[];
  campaignId: string;
}) {
  const [chatCreator, setChatCreator] = useState<CampaignCreator | null>(null);

  return (
    <>
      <div className="flex flex-col gap-3">
        {creators.map((c) => {
          const s = CREATOR_STATUS_MAP[c.status];
          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-gray-200 px-6 py-4 flex flex-wrap items-center gap-4"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {c.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <Instagram className="w-3 h-3" /> {c.handle}
                  </div>
                </div>
              </div>
              {/* Meta */}
              <div className="flex items-center gap-8 text-xs">
                <div>
                  <p className="font-semibold text-gray-700">Lokasi</p>
                  <p className="text-gray-500 mt-0.5">{c.location}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Followers</p>
                  <p className="text-gray-500 mt-0.5">{c.followers}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Status</p>
                  <span
                    className={`mt-0.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${s.bg}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${s.dot}`}
                    />
                    {c.status}
                  </span>
                </div>
              </div>
              {/* Chat button */}
              <button
                onClick={() => setChatCreator(c)}
                className="relative flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                {c.hasUnread && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                )}
                Chat →
              </button>
            </div>
          );
        })}
      </div>

      {/* Chat Modal — reuse shared component */}
      {chatCreator && (
        <ChatModal
          creatorId={chatCreator.id}
          creatorName={chatCreator.name}
          creatorAvatar={chatCreator.avatar}
          creatorSub="Kreator | Gaming"
          onClose={() => setChatCreator(null)}
        />
      )}
    </>
  );
}

// ── Content Review Tab ───────────────────────────────────────
function ContentReviewTab({ groups }: { groups: ContentGroup[] }) {
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const [showRevisi, setShowRevisi] = useState<boolean>(false);
  const [revisiText, setRevisiText] = useState<string>("");

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <div
            key={group.creator.id}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            {/* Creator header */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <div className="flex items-center gap-3">
                <img
                  src={group.creator.avatar}
                  alt={group.creator.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-900 text-sm">
                      {group.creator.name}
                    </span>
                    {group.creator.verified && (
                      <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {group.creator.handle}
                  </p>
                  <p className="text-xs text-gray-400">
                    {group.creator.location} · {group.creator.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 ml-auto text-xs text-center">
                <div>
                  <p className="text-gray-400">Followers</p>
                  <p className="font-bold text-gray-900">
                    {group.creator.followers}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Engagement</p>
                  <p className="font-bold text-gray-900">
                    {group.creator.engagement}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Avg Views</p>
                  <p className="font-bold text-gray-900">
                    {group.creator.avgViews}
                  </p>
                </div>
              </div>
            </div>

            {/* Group items by date */}
            {Object.entries(
              group.items.reduce<Record<string, ContentItem[]>>(
                (acc, item) => {
                  (acc[item.date] ??= []).push(item);
                  return acc;
                },
                {}
              )
            ).map(([date, items]) => (
              <div key={date} className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-3">
                  {fmt(date)}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {items.map((item) => {
                    const st = CONTENT_STATUS_MAP[item.status];
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelected(item)}
                        className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={item.thumbnailUrl}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${st.bg} ${st.text}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selected && !showRevisi && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Review Content</h3>
              <button
                onClick={() => setSelected(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 p-5">
              <div className="flex-1 aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={selected.thumbnailUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {selected.caption}
              </div>
            </div>
            <div className="flex justify-end gap-3 px-5 pb-5">
              <button
                onClick={() => setShowRevisi(true)}
                className="px-5 py-2 bg-yellow-400 text-white text-sm font-semibold rounded-xl hover:bg-yellow-500 transition-colors"
              >
                Ajukan Revisi
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Setujui
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revisi Modal */}
      {showRevisi && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Review Content</h3>
              <button
                onClick={() => {
                  setShowRevisi(false);
                  setSelected(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5">
              <textarea
                rows={8}
                placeholder="Masukkan detail revisi di sini"
                value={revisiText}
                onChange={(e) => setRevisiText(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => {
                    setShowRevisi(false);
                    setSelected(null);
                    setRevisiText("");
                  }}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Kirim <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Tracking Tab ─────────────────────────────────────────────
function TrackingTab({
  tracking,
}: {
  tracking: CampaignDetail["tracking"];
}) {
  const { stats, postedContent } = tracking;

  const StatBox = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  }) => (
    <div className="bg-blue-600 rounded-2xl p-5 text-white flex flex-col gap-1 min-w-[140px]">
      {icon && <div className="mb-1 text-white/80">{icon}</div>}
      <p className="text-white/80 text-xs font-medium">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Content stats */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Content</p>
        <div className="flex flex-wrap gap-3">
          <StatBox
            label="Creators posted"
            value={`${stats.creatorsPosted} out of ${stats.creatorsTotal}`}
          />
          <StatBox label="Content today" value={stats.contentToday} />
          <StatBox label="Total content" value={stats.totalContent} />
          <StatBox
            label="Event mode content"
            value={stats.eventModeContent}
          />
        </div>
      </div>

      {/* Awareness & Engagement */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Awareness & Engagement
        </p>
        <div className="flex flex-wrap gap-3">
          <StatBox
            label="Total engagement"
            value={stats.totalEngagement}
          />
          <StatBox label="Avg. ER%" value={stats.avgER} />
          <StatBox
            label="Est. Impressions"
            value={stats.estImpressions}
          />
          <StatBox label="Est. reach" value={stats.estReach} />
          <StatBox label="Total likes" value={stats.totalLikes} />
          <StatBox
            label="Total comments"
            value={stats.totalComments}
          />
          <StatBox label="Views" value={stats.views} />
        </div>
      </div>

      {/* Posted Content */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Content Posted
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {postedContent.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 pt-3">
                <img
                  src={post.creatorAvatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-gray-900">
                      {post.creatorName}
                    </span>
                    {post.verified && (
                      <span className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2 h-2 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400">
                    {post.creatorHandle}
                  </p>
                </div>
                <span className="ml-auto text-[10px] text-gray-400">
                  {post.timeAgo}
                </span>
              </div>
              <div className="relative mt-2 mx-2 mb-2 aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={post.thumbnailUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent flex items-center gap-3 text-white text-[10px]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [detail, setDetail] = useState<CampaignDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("creators");
  const [platform, setPlatform] = useState<"all" | "ig" | "tt">("all");

  const load = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCampaignDetail(id);
      setDetail(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat detail campaign"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    
  }, [id]);

  const filteredCreators =
    detail?.creators.filter(
      (c) => platform === "all" || c.platform === platform
    ) ?? [];

  const TABS: { key: Tab; label: string }[] = [
    {
      key: "creators",
      label: `Creators (${detail?.creators.length ?? 0})`,
    },
    { key: "strategi", label: "Strategi" },
    {
      key: "content",
      label: `Content Review (${detail?.contentGroups.flatMap((g) => g.items).length ?? 0
        })`,
    },
    { key: "tracking", label: "Tracking" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-['Inter']">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Page header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              {loading ? (
                <Skeleton className="h-7 w-52" />
              ) : (
                <h1 className="text-xl font-bold text-gray-900">
                  {detail?.title}
                </h1>
              )}
            </div>
            {!loading && detail && (
              <span className="text-sm text-gray-500">
                {fmtRange(detail.startDate, detail.endDate)}
              </span>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm mb-6">
              <span>⚠️ {error}</span>
              <button
                onClick={load}
                className="ml-auto px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Tab bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-gray-200">
            <div className="flex gap-1">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.key
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pb-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>

              <button className="p-1 hover:bg-gray-100 rounded">
                <Pencil className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Platform filter */}
          {(tab === "creators" || tab === "content") && (
            <div className="flex items-center gap-2 mb-5">
              {(["all", "ig", "tt"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${platform === p
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {p === "all" ? "All" : p === "ig" ? "📷" : "🎵"}
                </button>
              ))}
            </div>
          )}

          {/* Tab content */}
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : detail ? (
            <>
              {tab === "creators" && (
                <CreatorsTab
                  creators={filteredCreators}
                  campaignId={id}
                />
              )}
              {tab === "strategi" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 text-sm">
                  Strategi campaign akan ditampilkan di sini.
                </div>
              )}
              {tab === "content" && (
                <ContentReviewTab groups={detail.contentGroups} />
              )}
              {tab === "tracking" && (
                <TrackingTab tracking={detail.tracking} />
              )}
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
