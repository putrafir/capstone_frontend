
import { NextResponse } from "next/server";
import type { BriefingTemplate } from "@/shared/types";

const templates: BriefingTemplate[] = [
  {
    id: "tpl-001",
    namaBrand: "Brand A",
    namaTemplate: "Campaign Lebaran 2025",
    hashtags: "#LebaranBrandA #RamadhanSale",
    tagAccount: "@BrandA_Official",
    linkYellowCart: "https://shopee.co.id/brandA",
    draftSubmission: "2025-06-01",
    draftPost: "2025-06-10",
    dos: "Tampilkan produk dengan pencahayaan terang, gunakan musik trending",
    donts: "Jangan sebut kompetitor, jangan ada watermark lain",
    platform: {
      instagram: { video: 1, story: 1 },
      tiktok: { video: 1, story: 1 },
    },
  },
  {
    id: "tpl-002",
    namaBrand: "Brand B",
    namaTemplate: "Product Launch Juni",
    hashtags: "#BrandBLaunch",
    tagAccount: "@BrandB_ID",
    linkYellowCart: "",
    draftSubmission: "2025-06-05",
    draftPost: "2025-06-15",
    dos: "Review jujur, tampilkan packaging",
    donts: "Jangan edit berlebihan",
    platform: {
      tiktok: { video: 1, story: 0 },
    },
  },
  {
    id: "tpl-003",
    namaBrand: "Brand C",
    namaTemplate: "Awareness Campaign",
    hashtags: "#BrandCAwareness #GayaHidupSehat",
    tagAccount: "@BrandC",
    linkYellowCart: "",
    draftSubmission: "2025-07-01",
    draftPost: "2025-07-10",
    dos: "Fokus pada lifestyle, natural look",
    donts: "Jangan over-promote",
    platform: {
      instagram: { video: 1, story: 1 },
    },
  },
];

export async function GET() {
  await new Promise((r) => setTimeout(r, 600));
  return NextResponse.json(templates);
}

export async function POST(request: Request) {
  await new Promise((r) => setTimeout(r, 500));
  const body = await request.json();
  const newTemplate: BriefingTemplate = { ...body, id: `tpl-${Date.now()}` };
  return NextResponse.json(newTemplate, { status: 201 });
}
