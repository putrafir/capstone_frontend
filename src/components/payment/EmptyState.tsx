interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "Tidak ada data",
  description = "Belum ada item yang tersedia saat ini.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="text-5xl">📭</div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm text-center max-w-xs">{description}</p>
    </div>
  );
}
