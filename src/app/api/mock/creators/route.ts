
import { NextRequest, NextResponse } from "next/server";
import data from "@/data/search.json";
import type { Creator } from "@/types";

export async function GET(req: NextRequest): Promise<NextResponse> {
  
  await new Promise((r) => setTimeout(r, 700));

  const { searchParams } = req.nextUrl;
  const q          = searchParams.get("q")?.toLowerCase() ?? "";
  const platform   = searchParams.get("platform") ?? "instagram"; // instagram | tiktok
  const followers  = searchParams.get("followers") ?? "";         // nano|micro|macro|mega
  const engagement = searchParams.get("engagement") ?? "";         // low|medium|high
  const niche      = searchParams.get("niche") ?? "";
  const page       = parseInt(searchParams.get("page") ?? "1", 10);
  const limit      = parseInt(searchParams.get("limit") ?? "6", 10);

  let results: Creator[] = data.creators;

  // --- Filter: keyword ---
  if (q) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }

  // --- Filter: platform (yt = TikTok alias, ig = Instagram) ---
  if (platform === "tiktok") {
    results = results.filter((c) => c.platformIcons.includes("tt"));
  } else {
    results = results.filter((c) => c.platformIcons.includes("ig"));
  }

  // --- Filter: niche / category ---
  if (niche) {
    results = results.filter((c) =>
      c.category.toLowerCase().includes(niche.toLowerCase())
    );
  }

  // --- Filter: followers tier ---
  const parseFollowers = (f: string): number => {
    const n = parseFloat(f.replace(/[^0-9.]/g, ""));
    if (f.includes("JT") || f.includes("M")) return n * 1_000_000;
    if (f.includes("K")) return n * 1_000;
    return n;
  };

  if (followers === "nano")  results = results.filter((c) => parseFollowers(c.followers) < 10_000);
  if (followers === "micro") results = results.filter((c) => { const n = parseFollowers(c.followers); return n >= 10_000 && n < 100_000; });
  if (followers === "macro") results = results.filter((c) => { const n = parseFollowers(c.followers); return n >= 100_000 && n < 1_000_000; });
  if (followers === "mega")  results = results.filter((c) => parseFollowers(c.followers) >= 1_000_000);

  // --- Filter: engagement rate ---
  const parseEng = (e: string): number => parseFloat(e.replace("%", ""));
  if (engagement === "low")    results = results.filter((c) => parseEng(c.engagement) < 1);
  if (engagement === "medium") results = results.filter((c) => { const n = parseEng(c.engagement); return n >= 1 && n < 3; });
  if (engagement === "high")   results = results.filter((c) => parseEng(c.engagement) >= 3);

  // --- Pagination ---
  const total = results.length;
  const start = (page - 1) * limit;
  const paged = results.slice(start, start + limit);

  return NextResponse.json({
    data: paged,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}