"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import PaymentRow from "./PaymentRow";
import CampaignTabs from "./CampaignTabs";
import type { Campaign, PaymentInfluencer } from "@/shared/types";

interface PaymentCardProps {
  campaign: Campaign;
  defaultOpen?: boolean;
}

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function PaymentCard({
  campaign,
  defaultOpen = false,
}: PaymentCardProps) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [activeTab, setActiveTab] = useState<string>("all");

  const percent =
    campaign.totalAmount > 0
      ? Math.round((campaign.paidAmount / campaign.totalAmount) * 100)
      : 0;

  const filtered = campaign.influencers.filter(
    (inf: PaymentInfluencer) => {
      if (activeTab === "paid") {
        return inf.status === "paid";
      }

      if (activeTab === "unpaid") {
        return (
          inf.status === "pending" ||
          inf.status === "overdue"
        );
      }

      return true;
    }
  );

  const unpaidCount = campaign.influencers.filter(
    (i) =>
      i.status === "pending" ||
      i.status === "overdue"
  ).length;

  const paidCount = campaign.influencers.filter(
    (i) => i.status === "paid"
  ).length;

  return (
    <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-white text-xl font-bold">
            {campaign.title}
          </h2>

          <div className="flex -space-x-2">
            {campaign.influencers
              .slice(0, 3)
              .map((inf) => (
                <img
                  key={inf.id}
                  src={inf.avatar}
                  alt={inf.name}
                  className="w-8 h-8 rounded-full border-2 border-blue-600 object-cover"
                />
              ))}

            {campaign.influencers.length > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-800 flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">
                  +{campaign.influencers.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-white/90 text-sm">
          <div>
            <p className="text-white/70 text-xs">
              Total seluruh tagihan
            </p>
            <p className="font-semibold">
              {formatRupiah(campaign.totalAmount)}
            </p>
          </div>

          <div>
            <p className="text-white/70 text-xs">
              Tagihan yang sudah dibayar
            </p>
            <p className="font-semibold">
              {campaign.paidInfluencers} dari{" "}
              {campaign.totalInfluencers} tagihan
            </p>
          </div>

          <div>
            <p className="text-white/70 text-xs">
              Sisa tagihan yang belum dibayar
            </p>
            <p className="font-semibold">
              {formatRupiah(campaign.remainingAmount)}
            </p>
          </div>
        </div>

        <ProgressBar
          percent={percent}
          label={`${percent}% Pembayaran selesai`}
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-full hover:bg-blue-50 transition-colors"
          >
            {open ? "Sembunyikan ∨" : "Lihat Detail ›"}
          </button>

          <button
            onClick={() =>
              router.push(
                `/payment/invoice/${campaign.id}`
              )
            }
            className="px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-full hover:bg-blue-900 transition-colors"
          >
            Invoice »
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {open && (
        <div className="bg-white mx-3 mb-3 rounded-2xl overflow-hidden">
          <div className="px-4 pt-4">
            <CampaignTabs
              active={activeTab}
              counts={{
                all: campaign.influencers.length,
                unpaid: unpaidCount,
                paid: paidCount,
              }}
              onChange={setActiveTab}
            />
          </div>

          <div className="px-4 pb-2">
            {filtered.length === 0 ? (
              <p className="text-center py-6 text-gray-400 text-sm">
                Tidak ada data
              </p>
            ) : (
              filtered.map((inf) => (
                <PaymentRow
                  key={inf.id}
                  influencer={inf}
                  invoiceId={`INV-${campaign.id}-${inf.id}`}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}