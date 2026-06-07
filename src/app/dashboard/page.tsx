"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/shared/components/layout/Sidebar";
import Topbar from "@/shared/components/layout/Topbar";
import StatCard from "@/shared/components/common/StatCard";
import PerformanceChart from "@/features/dashboard/components/PerformanceChart";
import SavedCreators from "@/features/dashboard/components/SavedCreators";
import MessagesSection from "@/features/dashboard/components/MessagesSection";
import {
  fetchDashboardStats,
  fetchSavedCreators,
  fetchMessages,
} from "@/features/dashboard/services/dashboardService";
import type { DashboardStats, Creator, Message } from "@/shared/types";


import {
  Megaphone,
  Users,
  BarChart3,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface StatMeta {
  key: keyof DashboardStats;
  label: string;
  icon: "Megaphone" | "Users" | "BarChart3" | "CircleDollarSign" | "TrendingUp";
}

const STAT_META: StatMeta[] = [
  { key: "totalCampaigns", label: "Total Campaigns",  icon: "Megaphone"         },
  { key: "totalReach",     label: "Total Reach",      icon: "Users"             },
  { key: "engagementRate", label: "Engagement Rate",  icon: "BarChart3"         },
  { key: "budgetUsed",     label: "Budget Used",      icon: "CircleDollarSign"  },
  { key: "roi",            label: "ROI",              icon: "TrendingUp"        },
];

const IconMapper = {
  Megaphone:        <Megaphone        className="w-5 h-5 stroke-[1.5]" />,
  Users:            <Users            className="w-5 h-5 stroke-[1.5]" />,
  BarChart3:        <BarChart3        className="w-5 h-5 stroke-[1.5]" />,
  CircleDollarSign: <CircleDollarSign className="w-5 h-5 stroke-[1.5]" />,
  TrendingUp:       <TrendingUp       className="w-5 h-5 stroke-[1.5]" />,
};

function StatsSkeleton() {
  return (
    <>
      {STAT_META.map((_, i) => (
        <div
          key={i}
          className="flex-1 min-w-[140px] h-24 bg-blue-100 rounded-2xl animate-pulse"
        />
      ))}
    </>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [stats,    setStats]    = useState<DashboardStats | null>(null);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [statsLoading,    setStatsLoading]    = useState<boolean>(true);
  const [creatorsLoading, setCreatorsLoading] = useState<boolean>(true);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(true);

  const [statsError,    setStatsError]    = useState<string | null>(null);
  const [creatorsError, setCreatorsError] = useState<string | null>(null);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  const loadStats = async (): Promise<void> => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err: unknown) {
      setStatsError(
        err instanceof Error ? err.message : "Gagal memuat statistik"
      );
    } finally {
      setStatsLoading(false);
    }
  };

  const loadCreators = async (): Promise<void> => {
    setCreatorsLoading(true);
    setCreatorsError(null);
    try {
      const data = await fetchSavedCreators();
      setCreators(data);
    } catch (err: unknown) {
      setCreatorsError(
        err instanceof Error ? err.message : "Gagal memuat kreator"
      );
    } finally {
      setCreatorsLoading(false);
    }
  };

  const loadMessages = async (): Promise<void> => {
    setMessagesLoading(true);
    setMessagesError(null);
    try {
      const data = await fetchMessages();
      setMessages(data);
    } catch (err: unknown) {
      setMessagesError(
        err instanceof Error ? err.message : "Gagal memuat pesan"
      );
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadCreators();
    loadMessages();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 font-['Inter']">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-auto">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Nike Indonesia
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Track your campaigns, discover creators, and grow ROI today.
            </p>
            <div className="flex gap-3 mt-4">
              
              <button
                onClick={() => router.push("/search")}
                className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Find Influencer
              </button>
              
              <button
                onClick={() => router.push("/budget")}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                New Campaign
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            {statsLoading ? (
              <StatsSkeleton />
            ) : statsError ? (
              <div className="w-full p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{statsError}</span>
                <button
                  onClick={loadStats}
                  className="ml-auto px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            ) : stats ? (
              STAT_META.map(({ key, label, icon }) => (
                <StatCard
                  key={key}
                  icon={IconMapper[icon]}
                  label={label}
                  value={stats[key]}
                />
              ))
            ) : null}
          </div>

          <h2 className="text-base font-bold text-gray-900">
            Your Performance Analytics
          </h2>

          {/* Chart + Saved Creators */}
          <div className="flex flex-col lg:flex-row gap-5">
            <PerformanceChart />
            <SavedCreators
              creators={creators}
              loading={creatorsLoading}
              error={creatorsError}
            />
          </div>

          {/* Messages */}
          <MessagesSection
            messages={messages}
            loading={messagesLoading}
            error={messagesError}
          />
        </main>
      </div>
    </div>
  );
}