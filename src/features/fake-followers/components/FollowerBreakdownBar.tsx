interface Props { real: number; suspicious: number; fake: number }

export default function FollowerBreakdownBar({ real, suspicious, fake }: Props) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex h-4 w-full rounded-full overflow-hidden gap-0.5">
        <div className="bg-green-500 transition-all duration-700" style={{ width: `${real}%` }} />
        <div className="bg-amber-400 transition-all duration-700" style={{ width: `${suspicious}%` }} />
        <div className="bg-red-500 transition-all duration-700" style={{ width: `${fake}%` }} />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" />
          <span>Real <strong className="text-gray-900">{real}%</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
          <span>Suspicious <strong className="text-gray-900">{suspicious}%</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" />
          <span>Fake <strong className="text-gray-900">{fake}%</strong></span>
        </div>
      </div>
    </div>
  );
}
