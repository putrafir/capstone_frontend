"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PaymentMethodOption } from "@/shared/types";

interface PaymentMethodAccordionProps {
  methods: PaymentMethodOption[];
  selected: string | null;
  onSelect: (id: string) => void;
}

const BRAND_COLORS: Record<string, string> = {
  BNI: "bg-orange-500",
  BCA: "bg-blue-600",
  BSI: "bg-green-600",
  VISA: "bg-blue-700",
  Mastercard: "bg-red-600",
  JCO: "bg-orange-600",
  Dana: "bg-blue-500",
  GoPay: "bg-green-500",
  OVO: "bg-purple-600",
  ShopeePay: "bg-orange-500",
  Indomaret: "bg-red-500",
  Alfamart: "bg-red-600",
};

const METHOD_ICONS: Record<string, React.ReactNode> = {
  bank:   <span className="text-gray-600">🏦</span>,
  card:   <span className="text-gray-600">💳</span>,
  retail: <span className="text-gray-600">🏪</span>,
  wallet: <span className="text-gray-600">👝</span>,
  qr:     <span className="text-gray-600">⊞</span>,
};

function BrandChip({ label }: { label: string }) {
  const bg = BRAND_COLORS[label] ?? "bg-gray-400";
  return (
    <span className={`${bg} text-white text-[9px] font-bold px-2 py-0.5 rounded`}>
      {label}
    </span>
  );
}

export default function PaymentMethodAccordion({
  methods,
  selected,
  onSelect,
}: PaymentMethodAccordionProps) {
  const [openId, setOpenId] = useState<string | null>("qris");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    onSelect(id);
  };

  return (
    <div className="space-y-0 border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200">
      {methods.map((method) => {
        const isOpen = openId === method.id;
        const isSelected = selected === method.id;

        return (
          <div key={method.id} className={`${isSelected ? "bg-blue-50" : "bg-white"}`}>
            <button
              onClick={() => toggle(method.id)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{METHOD_ICONS[method.icon] ?? "💰"}</span>
                <span className="text-sm font-medium text-gray-800">{method.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {method.brands.slice(0, 4).map((brand) => (
                  <BrandChip key={brand} label={brand} />
                ))}
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {isOpen && method.id === "qris" && (
              <div className="px-4 pb-5">
                {/* Fraud warning */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Lindungi Diri Anda dari Penipuan
                  </p>
                  <p className="text-xs text-gray-600">
                    Pastikan nama merchant, jumlah pembayaran, dan detail lainnya sudah benar.
                    Selalu periksa sebelum melanjutkan pembayaran.
                  </p>
                </div>
                {/* QR Limit notice */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 mb-4 flex items-center gap-2">
                  <span className="text-red-500 text-sm">⚠</span>
                  <p className="text-xs text-red-600">
                    Limit Transaksi Pembayaran menggunakan QR Per Transaksi Rp. 10.000.000
                  </p>
                </div>
                <p className="text-xs text-gray-500 text-center mb-3">
                  Kami menerima pembayaran QR via semua bank dan e-wallet ternama
                </p>
                {/* Mock QR */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-blue-600 rounded-xl flex items-center justify-center">
                    <div className="w-40 h-40 bg-white rounded-lg p-2">
                      <div className="w-full h-full bg-gray-900 rounded grid grid-cols-5 gap-0.5 p-1.5">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-sm ${
                              [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 6, 12, 18].includes(i)
                                ? "bg-gray-900"
                                : "bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isOpen && method.id === "bank_transfer" && (
              <div className="px-4 pb-4 space-y-2">
                {["BNI", "BCA", "BSI", "Mandiri", "BRI", "CIMB", "BTN", "Permata"].map((bank) => (
                  <div key={bank} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <BrandChip label={bank} />
                    <span className="text-sm text-gray-700">{bank}</span>
                  </div>
                ))}
              </div>
            )}

            {isOpen && method.id === "e_wallet" && (
              <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                {["Dana", "GoPay", "OVO", "ShopeePay", "LinkAja"].map((wallet) => (
                  <div key={wallet} className="flex items-center gap-2 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <BrandChip label={wallet} />
                    <span className="text-sm text-gray-700">{wallet}</span>
                  </div>
                ))}
              </div>
            )}

            {isOpen && !["qris", "bank_transfer", "e_wallet"].includes(method.id) && (
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-500">Pilih metode {method.label} untuk melanjutkan.</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
