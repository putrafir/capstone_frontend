"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/shared/components/layout/Sidebar";
import Topbar from "@/shared/components/layout/Topbar";
import PaymentRow from "@/features/payment/components/PaymentRow";
import CampaignTabs from "@/features/payment/components/CampaignTabs";
import { CampaignCardSkeleton } from "@/features/payment/components/LoadingSkeleton";
import ErrorState from "@/features/payment/components/ErrorState";
import EmptyState from "@/features/payment/components/EmptyState";
import { usePayments } from "@/features/payment/hooks/usePayments";
import { useState, useMemo } from "react";
import type { PaymentInfluencer } from "@/shared/types";

export default function CampaignInvoicePage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const router = useRouter();
  const { data: campaigns, loading, error, refetch } = usePayments();
  const [activeTab, setActiveTab] = useState<string>("all");

  const campaign = useMemo(
    () => campaigns.find((c) => String(c.id) === campaignId),
    [campaigns, campaignId]
  );

  const filtered = useMemo<PaymentInfluencer[]>(() => {
    if (!campaign) return [];
    if (activeTab === "paid")   return campaign.influencers.filter((i) => i.status === "paid");
    if (activeTab === "unpaid") return campaign.influencers.filter((i) => i.status !== "paid");
    return campaign.influencers;
  }, [campaign, activeTab]);

  const unpaidCount = campaign?.influencers.filter((i) => i.status !== "paid").length ?? 0;
  const paidCount   = campaign?.influencers.filter((i) => i.status === "paid").length ?? 0;

  return (
    <div className="flex min-h-screen bg-[#dde8f0] font-['Inter']">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.back()}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {campaign?.title ?? "Invoice Campaign"}
            </h1>
          </div>

          {loading ? (
            <CampaignCardSkeleton />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : !campaign ? (
            <EmptyState title="Campaign tidak ditemukan" description="Data campaign tidak tersedia." />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 pt-4">
                <CampaignTabs
                  active={activeTab}
                  counts={{ all: campaign.influencers.length, unpaid: unpaidCount, paid: paidCount }}
                  onChange={setActiveTab}
                />
              </div>
              <div className="px-5 pb-4">
                {filtered.length === 0 ? (
                  <EmptyState title="Tidak ada data" description="Tidak ada influencer di tab ini." />
                ) : (
                  filtered.map((inf) => (
                    <PaymentRow
                      key={inf.id}
                      influencer={inf}
                      invoiceId="Yoga2026-WindahBasudara-4c14-b6bc"
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
