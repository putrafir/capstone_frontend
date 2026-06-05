import type { PaymentStatus } from "@/types";

interface StatusBadgeProps {
  status: PaymentStatus;
}

const CONFIG: Record<PaymentStatus, { label: string; dot: string; text: string; bg: string }> = {
  pending:   { label: "Pending",   dot: "bg-orange-400", text: "text-orange-600", bg: "bg-orange-50" },
  paid:      { label: "Paid",      dot: "bg-blue-500",   text: "text-blue-600",   bg: "bg-blue-50"   },
  overdue:   { label: "Overdue",   dot: "bg-red-500",    text: "text-red-600",    bg: "bg-red-50"    },
  cancelled: { label: "Cancelled", dot: "bg-gray-400",   text: "text-gray-600",   bg: "bg-gray-100"  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = CONFIG[status] ?? CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
