

import { NextResponse } from "next/server";
import type { Strategy } from "@/types";

const strategies: Strategy[] = [
  {
    id: "micro-power",
    name: "Strategy Micro-Power",
    tagline: "Efisiensi Tinggi",
    daftarBelanja: {
      instagram: { video: 1, story: 1 },
      tiktok: { video: 1, story: 0 },
      boostCodeAds: 5000000,
      owningContent: null,
      yellowCart: false,
    },
    yangDiDapat: {
      alokasi: "50 Micro Influencers (10rb - 50rb followers).",
      feeInfluencer: 160000000,
      boostCode: 5000000,
      owningContent: null,
      yellowCart: null,
    },
    prediksiHasil: {
      reach: "3.500.000 orang",
      estSales: "4.500 Unit",
      roiProyeksi: "3.8",
    },
  },
  {
    id: "big-bang",
    name: "Strategy The Big Bang",
    tagline: "Viralitas Tinggi",
    daftarBelanja: {
      instagram: { video: 1, story: 1 },
      tiktok: { video: 1, story: 1 },
      boostCodeAds: 5000000,
      owningContent: 20000000,
      yellowCart: true,
    },
    yangDiDapat: {
      alokasi: "2 Mega + 8 Nano-Influencers",
      feeInfluencer: 180000000,
      boostCode: 5000000,
      owningContent: 20000000,
      yellowCart: 10000000,
    },
    prediksiHasil: {
      reach: "7.000.000 orang",
      estSales: "2000 - 5.500 Unit",
      roiProyeksi: "1.5 - 3.5",
    },
  },
];

export async function GET() {
  await new Promise((r) => setTimeout(r, 800));
  return NextResponse.json(strategies);
}
