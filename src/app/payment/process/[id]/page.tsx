"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PaymentMethodAccordion from "@/components/payment/PaymentMethodAccordion";
import ErrorState from "@/components/payment/ErrorState";
import { useInvoice } from "@/hooks/useInvoice";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { ArrowLeft } from "lucide-react";

function formatRupiah(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PaymentProcessPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: invoice, loading: invoiceLoading, error: invoiceError, refetch } = useInvoice(id);
  const { data: methods, loading: methodsLoading } = usePaymentMethods();

  const [selectedMethod, setSelectedMethod] = useState<string | null>("qris");
  const [countdown, setCountdown] = useState<number>(24 * 3600); // 24 hours mock

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (invoiceLoading || methodsLoading) {
    return (
      <div className="flex min-h-screen bg-[#dde8f0] font-['Inter']">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
              <div className="lg:col-span-2 bg-white rounded-2xl h-[500px]" />
              <div className="bg-white rounded-2xl h-64" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (invoiceError) {
    return (
      <div className="flex min-h-screen bg-[#dde8f0] font-['Inter']">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 p-8">
            <ErrorState message={invoiceError} onRetry={refetch} />
          </main>
        </div>
      </div>
    );
  }

  const amount = invoice?.nextDueAmount ?? 0;
  const dueLabel = invoice
    ? new Date(invoice.dueDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

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
            <h1 className="text-2xl font-bold text-gray-900">Proses Pembayaran</h1>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Payment Methods */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              {/* Countdown + Amount */}
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  BAYAR SEBELUM{" "}
                  {invoice
                    ? new Date(invoice.dueDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).toUpperCase()
                    : ""}{" "}
                  PUKUL 23.59 PM
                </p>
                <p className="text-4xl font-bold text-blue-600 mb-1">
                  {formatRupiah(amount)}
                </p>
                <p className="text-xs text-gray-400">
                  Sisa waktu: {formatCountdown(countdown)}
                </p>
              </div>

              <h2 className="text-sm font-semibold text-gray-700 mb-3">Metode Pembayaran</h2>
              <PaymentMethodAccordion
                methods={methods}
                selected={selectedMethod}
                onSelect={setSelectedMethod}
              />
            </div>

            {/* Right: Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
              <h2 className="text-base font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>

              {invoice && (
                <>
                  <p className="text-xs text-gray-500 mb-1">Transaksi #</p>
                  <p className="text-xs font-mono text-gray-700 mb-4 break-all">{invoice.id}</p>

                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-gray-500 text-sm mt-0.5">📋</span>
                    <div>
                      <p className="text-xs text-gray-500">Deskripsi</p>
                      <p className="text-sm font-medium text-gray-800">
                        Down Payment {invoice.campaignTitle} {invoice.influencerName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mb-6">
                    <span className="text-gray-500 text-sm mt-0.5">🕐</span>
                    <div>
                      <p className="text-xs text-gray-500">Bayar sebelum</p>
                      <p className="text-sm font-medium text-gray-800">
                        {dueLabel} pukul 23.59
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-6">
                    <span className="text-sm font-semibold text-gray-900">Jumlah Total</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatRupiah(amount)}
                    </span>
                  </div>
                </>
              )}

              <button
                onClick={() => alert("Pembayaran berhasil diproses!")}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
