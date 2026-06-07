"use client";

interface Props { score: number }

export default function AuthenticityScoreRing({ score }: Props) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r={radius} stroke="#e5e7eb" strokeWidth="12" />
        <circle cx="64" cy="64" r={radius} stroke={color} strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{score}%</span>
        <span className="text-xs text-gray-500 font-medium">Authenticity</span>
      </div>
    </div>
  );
}
