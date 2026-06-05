interface CampaignTabsProps {
  active: string;
  counts: { all: number; unpaid: number; paid: number };
  onChange: (tab: string) => void;
}

const TABS = [
  { key: "all",    label: "Semua" },
  { key: "unpaid", label: "Belum dibayar" },
  { key: "paid",   label: "Sudah dibayar" },
];

export default function CampaignTabs({ active, counts, onChange }: CampaignTabsProps) {
  const countMap: Record<string, number> = {
    all: counts.all,
    unpaid: counts.unpaid,
    paid: counts.paid,
  };

  return (
    <div className="flex gap-1 border-b border-gray-200">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap ${
            active === tab.key
              ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
          {countMap[tab.key] > 0 && tab.key !== "all" && (
            <span className="ml-1.5 text-xs text-gray-400">({countMap[tab.key]})</span>
          )}
        </button>
      ))}
    </div>
  );
}
