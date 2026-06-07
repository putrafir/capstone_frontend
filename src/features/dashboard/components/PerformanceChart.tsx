"use client";
// ============================================================
// FILE: src/components/PerformanceChart.tsx
// ============================================================

import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ── Types ─────────────────────────────────────────────────────

export type Period     = "7 Days" | "30 Days" | "3 Months";
export type MetricType = "campaigns" | "reach" | "audience" | "engagement" | "budget";

interface DataPoint {
  day: string;
  value: number;
}

interface MetricOption {
  value: MetricType;
  label: string;
  unit: string;
}

// ── Konfigurasi Metric ─────────────────────────────────────────

const metricOptions: MetricOption[] = [
  { value: "campaigns",  label: "Total Campaigns", unit: ""  },
  { value: "reach",      label: "Total Reach",     unit: "M" },
  { value: "audience",   label: "Audience",        unit: "M" },
  { value: "engagement", label: "Engagement Rate", unit: "%" },
  { value: "budget",     label: "Budget Used",     unit: "K" },
];

const PERIODS: Period[] = ["7 Days", "30 Days", "3 Months"];


const chartDataMap: Record<MetricType, Record<Period, DataPoint[]>> = {
  // ── campaigns ──────────────────────────────────────────────
  campaigns: {
    "7 Days": [
      { day: "Mon", value: 8  }, { day: "Tue", value: 10 },
      { day: "Wed", value: 12 }, { day: "Thu", value: 11 },
      { day: "Fri", value: 14 }, { day: "Sat", value: 13 },
      { day: "Sun", value: 9  },
    ],
    "30 Days": [
      { day: "W1", value: 32 }, { day: "W2", value: 41 },
      { day: "W3", value: 38 }, { day: "W4", value: 47 },
    ],
    "3 Months": [
      { day: "Jan", value: 110 }, { day: "Feb", value: 145 },
      { day: "Mar", value: 162 },
    ],
  },

  // ── reach ──────────────────────────────────────────────────
  reach: {
    "7 Days": [
      { day: "Mon", value: 2.1 }, { day: "Tue", value: 2.8 },
      { day: "Wed", value: 4.0 }, { day: "Thu", value: 4.5 },
      { day: "Fri", value: 5.2 }, { day: "Sat", value: 4.8 },
      { day: "Sun", value: 3.9 },
    ],
    "30 Days": [
      { day: "W1", value: 12.4 }, { day: "W2", value: 16.8 },
      { day: "W3", value: 21.3 }, { day: "W4", value: 19.0 },
    ],
    "3 Months": [
      { day: "Jan", value: 58.2 }, { day: "Feb", value: 74.5 },
      { day: "Mar", value: 91.0 },
    ],
  },

  // ── audience ───────────────────────────────────────────────
  audience: {
    "7 Days": [
      { day: "Mon", value: 5.5 }, { day: "Tue", value: 6.1 },
      { day: "Wed", value: 6.8 }, { day: "Thu", value: 7.2 },
      { day: "Fri", value: 7.0 }, { day: "Sat", value: 6.4 },
      { day: "Sun", value: 5.8 },
    ],
    "30 Days": [
      { day: "W1", value: 24.2 }, { day: "W2", value: 27.8 },
      { day: "W3", value: 30.1 }, { day: "W4", value: 33.5 },
    ],
    "3 Months": [
      { day: "Jan", value: 95.0 }, { day: "Feb", value: 118.3 },
      { day: "Mar", value: 140.7 },
    ],
  },

  // ── engagement ─────────────────────────────────────────────
  engagement: {
    "7 Days": [
      { day: "Mon", value: 6.2 }, { day: "Tue", value: 7.1 },
      { day: "Wed", value: 8.4 }, { day: "Thu", value: 9.0 },
      { day: "Fri", value: 8.7 }, { day: "Sat", value: 7.8 },
      { day: "Sun", value: 4.0 },
    ],
    "30 Days": [
      { day: "W1", value: 5.8 }, { day: "W2", value: 7.3 },
      { day: "W3", value: 8.9 }, { day: "W4", value: 6.4 },
    ],
    "3 Months": [
      { day: "Jan", value: 5.1 }, { day: "Feb", value: 7.6 },
      { day: "Mar", value: 8.2 },
    ],
  },

  // ── budget ─────────────────────────────────────────────────
  budget: {
    "7 Days": [
      { day: "Mon", value: 10 }, { day: "Tue", value: 15 },
      { day: "Wed", value: 20 }, { day: "Thu", value: 25 },
      { day: "Fri", value: 30 }, { day: "Sat", value: 28 },
      { day: "Sun", value: 18 },
    ],
    "30 Days": [
      { day: "W1", value: 62 }, { day: "W2", value: 85 },
      { day: "W3", value: 110 }, { day: "W4", value: 97 },
    ],
    "3 Months": [
      { day: "Jan", value: 280 }, { day: "Feb", value: 340 },
      { day: "Mar", value: 415 },
    ],
  },
};

// ── Abstraction Layer ──────────────────────────────────────────
// Semua akses data melalui fungsi ini.
// Untuk migrasi backend, HANYA fungsi ini yang perlu diubah:
//
//   async function getAnalyticsData(metric, period) {
//     const res = await fetch(
//       `/api/dashboard/analytics?metric=${metric}&period=${encodeURIComponent(period)}`
//     );
//     return res.json() as Promise<DataPoint[]>;
//   }

async function getAnalyticsData(
  metric: MetricType,
  period: Period,
): Promise<DataPoint[]> {
  // Simulasi async agar arsitektur identik dengan versi API nyata
  return Promise.resolve(chartDataMap[metric][period]);
}

// ── Komponen Utama ─────────────────────────────────────────────

export default function PerformanceChart() {
  const [activePeriod,    setActivePeriod]    = useState<Period>("7 Days");
  const [selectedMetric,  setSelectedMetric]  = useState<MetricType>("engagement");
  const [isDropdownOpen,  setIsDropdownOpen]  = useState(false);
  const [chartData,       setChartData]       = useState<DataPoint[]>(
    chartDataMap["engagement"]["7 Days"],   // initial data — tidak kosong saat render pertama
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── Load data setiap kali metric atau periode berubah ──────
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      const data = await getAnalyticsData(selectedMetric, activePeriod);
      if (!cancelled) setChartData(data);
    }

    loadData();

    // Cleanup: abaikan response jika komponen sudah unmount
    // atau effect dijalankan ulang sebelum response tiba
    return () => { cancelled = true; };
  }, [selectedMetric, activePeriod]);

  // ── Tutup dropdown saat klik di luar ──────────────────────
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeMetric = metricOptions.find((m) => m.value === selectedMetric)!;

  return (
    <div className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-gray-100">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800">Performance Analytics</h3>
          <div className="mt-1 flex items-center">
            <div className="w-7 h-0.5 bg-cyan-400" />
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>

        {/* ── Metric Dropdown ───────────────────────────── */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 text-gray-500 text-xs hover:text-gray-700 transition-colors"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span>{activeMetric.label}</span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <ul
              role="listbox"
              className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-10
                         animate-[fadeIn_0.15s_ease-out]"
            >
              {metricOptions.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === selectedMetric}
                  onClick={() => {
                    setSelectedMetric(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-3 py-2 text-xs cursor-pointer transition-colors
                    ${option.value === selectedMetric
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                    }
                    first:rounded-t-xl last:rounded-b-xl`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Period Tabs ───────────────────────────────────── */}
      <div className="flex gap-1.5 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setActivePeriod(p)}
            className={`px-2 py-[3px] rounded text-[10px] transition-colors ${
              activePeriod === p
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ── Area Chart ────────────────────────────────────── */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v: number) => `${v}${activeMetric.unit}`}
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(v: number) => [`${v}${activeMetric.unit}`, activeMetric.label]}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2563EB"
            strokeWidth={2}
            fill="url(#metricGrad)"
            dot={{ r: 4, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
            animationDuration={500}
            animationBegin={0}
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}