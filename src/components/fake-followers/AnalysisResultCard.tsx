


"use client";


import type { FakeFollowersResult } from "@/types";
import AuthenticityScoreRing from "./AuthenticityScoreRing";
import RiskBadge from "./RiskBadge";
import FollowerBreakdownBar from "./FollowerBreakdownBar";

const PLATFORM_BADGE: Record<string, { bg: string; label: string }> = {
  instagram: { bg: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400", label: "IG" },
  tiktok:    { bg: "bg-gray-900", label: "TT" },
  youtube:   { bg: "bg-red-600",  label: "YT" },
};

export default function AnalysisResultCard({ data }: { data: FakeFollowersResult }) {
  const badge = PLATFORM_BADGE[data.platform] ?? { bg: "bg-gray-400", label: "?" };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Profile */}
      <div className="flex flex-col md:flex-row gap-6 p-6 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative shrink-0">
            {/* ✅ DIUBAH: Menggunakan tag <img> standar untuk menghindari error domain Next.js */}
            <img 
              src={data.avatar} 
              alt={data.name} 
              className="w-18 h-18 rounded-full object-cover border-2 border-white shadow" 
            />
            <span className={`absolute -bottom-1 -right-1 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${badge.bg}`}>
              {badge.label}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-lg font-bold text-gray-900 truncate">{data.name}</h2>
              {data.verified && (
                <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-sm text-blue-600 font-medium">{data.handle}</p>
            <p className="text-xs text-gray-500 mt-0.5">{data.location} · {data.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 md:gap-8 flex-wrap">
          {[
            { label: "Followers", value: data.followers },
            { label: "Following", value: data.following },
            { label: "Posts",     value: data.posts },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-lg font-bold text-gray-900">{s.value}</span>
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Score + Risk + Breakdown */}
      <div className="flex flex-col md:flex-row gap-6 p-6 border-b border-gray-100">
        <div className="flex flex-col items-center justify-center md:w-44 shrink-0">
          <AuthenticityScoreRing score={data.authenticityScore} />
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-700">Risk Collaboration:</span>
            <RiskBadge level={data.riskLevel} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Audience Breakdown
            </p>
            <FollowerBreakdownBar
              real={data.realFollowersPct}
              suspicious={data.suspiciousFollowersPct}
              fake={data.fakeFollowersPct}
            />
          </div>
        </div>
      </div>

      {/* Engagement stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-100">
        {[
          { label: "Engagement Rate", value: data.engagementRate },
          { label: "Avg Likes",       value: data.avgLikes },
          { label: "Avg Comments",    value: data.avgComments },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-4 px-3 gap-0.5">
            <span className="text-base font-bold text-gray-900">{s.value}</span>
            <span className="text-xs text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
