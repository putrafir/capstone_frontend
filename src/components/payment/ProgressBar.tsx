interface ProgressBarProps {
  percent: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({ percent, label, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-end mb-1">
          <span className="text-white/90 text-xs">{label}</span>
        </div>
      )}
      <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
