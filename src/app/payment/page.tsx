"use client";
import { useState, useMemo } from "react";
import { Download } from "lucide-react";
import Sidebar from "@/shared/components/layout/Sidebar";
import Topbar from "@/shared/components/layout/Topbar";
import PaymentCard from "@/features/payment/components/PaymentCard";
import SearchBar from "@/features/payment/components/SearchBar";
import LoadingSkeleton from "@/features/payment/components/LoadingSkeleton";
import ErrorState from "@/features/payment/components/ErrorState";
import EmptyState from "@/features/payment/components/EmptyState";
import { usePayments } from "@/features/payment/hooks/usePayments";
import type { Campaign } from "@/shared/types";

export default function PaymentPage() {
  const { data: campaigns, loading, error, refetch } = usePayments();
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo<Campaign[]>(() => {
    if (!search.trim()) return campaigns;
    return campaigns.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [campaigns, search]);

  return (
    <div className="flex min-h-screen bg-[#dde8f0] font-['Inter']">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-auto">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">Payment Tracking</h1>

          {/* Search + Export */}
          <div className="flex flex-wrap items-center gap-3">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search campaign by title"
            />
            <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
              Export Report
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <LoadingSkeleton rows={2} />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Tidak ada campaign ditemukan"
              description={search ? `Tidak ada hasil untuk "${search}"` : "Belum ada data pembayaran."}
            />
          ) : (
            <div className="space-y-5">
              {filtered.map((campaign, idx) => (
                <PaymentCard
                  key={campaign.id}
                  campaign={campaign}
                  defaultOpen={idx === 0}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
