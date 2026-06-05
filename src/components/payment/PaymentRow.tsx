import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import type { PaymentInfluencer } from "@/types";

interface PaymentRowProps {
  influencer: PaymentInfluencer;
  invoiceId?: string;
}

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function PaymentRow({ influencer, invoiceId }: PaymentRowProps) {
  const router = useRouter();

  const handlePay = () => {
    const id = invoiceId ?? `invoice-${influencer.id}`;
    router.push(`/payment/detail/${id}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 flex-1 min-w-[160px]">
        <img
          src={influencer.avatar}
          alt={influencer.name}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{influencer.name}</p>
          <p className="text-xs text-gray-500">{influencer.handle}</p>
        </div>
      </div>

      {/* Method */}
      <div className="flex flex-col min-w-[80px]">
        <span className="text-[10px] text-gray-500 font-medium">Metode</span>
        <span className="text-sm text-gray-800">{influencer.method}</span>
      </div>

      {/* Amount */}
      <div className="flex flex-col min-w-[100px]">
        <span className="text-[10px] text-gray-500 font-medium">Tagihan</span>
        <span className="text-sm font-semibold text-gray-900">{formatRupiah(influencer.amount)}</span>
      </div>

      {/* Status */}
      <div className="flex flex-col min-w-[80px]">
        <span className="text-[10px] text-gray-500 font-medium">Status</span>
        <StatusBadge status={influencer.status} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
          bukti
        </button>
        <button
          onClick={handlePay}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Bayar →
        </button>
      </div>
    </div>
  );
}
