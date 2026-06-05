"use client";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/shared/components/layout/Sidebar";
import Topbar from "@/shared/components/layout/Topbar";
import StatusBadge from "@/features/payment/components/StatusBadge";
import InvoiceSummary from "@/features/payment/components/InvoiceSummary";
import { InvoiceDetailSkeleton } from "@/features/payment/components/LoadingSkeleton";
import ErrorState from "@/features/payment/components/ErrorState";
import { useInvoice } from "@/features/payment/hooks/useInvoice";
import { ArrowLeft } from "lucide-react";

function formatRupiah(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function PaymentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: invoice, loading, error, refetch } = useInvoice(id);

  return (
    <div className="flex min-h-screen bg-[#dde8f0] font-['Inter']">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.back()}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Rincian Pembayaran</h1>
          </div>

          {loading ? (
            <InvoiceDetailSkeleton />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : invoice ? (
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Influencer Hero */}
              <div className="bg-blue-600 rounded-2xl p-8">
                <div className="flex flex-col items-center gap-2 mb-6">
                  <img
                    src={invoice.influencerAvatar}
                    alt={invoice.influencerName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />
                  <h2 className="text-white text-xl font-bold">{invoice.influencerName}</h2>
                  <p className="text-white/70 text-sm">{invoice.influencerHandle}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-white">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Metode Pembayaran</p>
                    <p className="text-sm font-semibold">{invoice.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Total yang harus dibayar</p>
                    <p className="text-sm font-semibold">{formatRupiah(invoice.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Jumlah yang sudah dibayar</p>
                    <p className="text-sm font-semibold">{formatRupiah(invoice.paidAmount)}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Status Pembayaran</p>
                    <StatusBadge status={invoice.status} />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Jumlah yang harus dibayar</p>
                    <p className="text-sm font-semibold">{formatRupiah(invoice.nextDueAmount)}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Sisa yang harus dibayar</p>
                    <p className="text-sm font-semibold">{formatRupiah(invoice.remainingAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Breakdown */}
              <InvoiceSummary
                breakdown={invoice.breakdown}
                adminFee={invoice.adminFee}
              />

              {/* CTA */}
              <div className="flex justify-center pb-4">
                <button
                  onClick={() => router.push(`/payment/process/${invoice.id}`)}
                  className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
