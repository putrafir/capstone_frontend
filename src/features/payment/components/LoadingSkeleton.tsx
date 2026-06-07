interface LoadingSkeletonProps {
  rows?: number;
}

export function CampaignCardSkeleton() {
  return (
    <div className="bg-blue-500/60 rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-white/30 rounded w-48 mb-4" />
      <div className="flex gap-8 mb-4">
        <div className="h-4 bg-white/30 rounded w-32" />
        <div className="h-4 bg-white/30 rounded w-32" />
        <div className="h-4 bg-white/30 rounded w-32" />
      </div>
      <div className="h-2 bg-white/30 rounded-full mb-6" />
      <div className="bg-white rounded-2xl p-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-8 bg-gray-200 rounded-lg" />
            <div className="w-24 h-8 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function InvoiceDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-blue-500/60 rounded-2xl p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-white/30 rounded-full" />
          <div className="h-5 bg-white/30 rounded w-40" />
          <div className="h-4 bg-white/30 rounded w-28" />
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ rows = 3 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <CampaignCardSkeleton key={i} />
      ))}
    </div>
  );
}
