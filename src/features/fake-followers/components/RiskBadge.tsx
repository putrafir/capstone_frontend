import type { RiskLevel } from "@/shared/types";

const CONFIG: Record<RiskLevel, { bg: string; text: string; dot: string; label: string }> = {
  Low:    { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", label: "Low Risk" },
  Medium: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500", label: "Medium Risk" },
  High:   { bg: "bg-red-100",   text: "text-red-700",   dot: "bg-red-500",   label: "High Risk" },
};

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const c = CONFIG[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
