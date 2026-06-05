import { NextRequest, NextResponse } from "next/server";

export interface FakeFollowersResult {
  name: string;
  handle: string;
  location: string;
  category: string;
  avatar: string;
  verified: boolean;
  platform: "instagram" | "tiktok" | "youtube";
  followers: string;
  following: string;
  posts: string;
  authenticityScore: number;
  riskLevel: "Low" | "Medium" | "High";
  fakeFollowersPct: number;
  suspiciousFollowersPct: number;
  realFollowersPct: number;
  engagementRate: string;
  avgLikes: string;
  avgComments: string;
}

const MOCK_DB: Record<string, FakeFollowersResult> = {
  default: {
    name: "Arifah Machi",
    handle: "@arifahmachi",
    location: "Indonesia",
    category: "Gaming",
    avatar: "https://i.pravatar.cc/120?img=47",
    verified: true,
    platform: "instagram",
    followers: "1.2JT",
    following: "842",
    posts: "394",
    authenticityScore: 92,
    riskLevel: "Low",
    fakeFollowersPct: 4,
    suspiciousFollowersPct: 4,
    realFollowersPct: 92,
    engagementRate: "5.8%",
    avgLikes: "62K",
    avgComments: "1.4K",
  },
  windah: {
    name: "Windah Basudara",
    handle: "@windahbasudara",
    location: "Bekasi, Indonesia",
    category: "Gaming",
    avatar: "https://i.pravatar.cc/120?img=12",
    verified: true,
    platform: "youtube",
    followers: "4JT",
    following: "210",
    posts: "1.2K",
    authenticityScore: 88,
    riskLevel: "Low",
    fakeFollowersPct: 7,
    suspiciousFollowersPct: 5,
    realFollowersPct: 88,
    engagementRate: "5.1%",
    avgLikes: "120K",
    avgComments: "8.3K",
  },
  raditya: {
    name: "Raditya Dika",
    handle: "@radityad",
    location: "Jakarta, Indonesia",
    category: "Entertainment",
    avatar: "https://i.pravatar.cc/120?img=11",
    verified: true,
    platform: "instagram",
    followers: "22.3JT",
    following: "1.1K",
    posts: "2.8K",
    authenticityScore: 61,
    riskLevel: "Medium",
    fakeFollowersPct: 24,
    suspiciousFollowersPct: 15,
    realFollowersPct: 61,
    engagementRate: "1.2%",
    avgLikes: "280K",
    avgComments: "4.5K",
  },
  suspicious: {
    name: "FakeInfluencer99",
    handle: "@fakeinfl99",
    location: "Unknown",
    category: "Lifestyle",
    avatar: "https://i.pravatar.cc/120?img=33",
    verified: false,
    platform: "tiktok",
    followers: "800K",
    following: "12.4K",
    posts: "42",
    authenticityScore: 28,
    riskLevel: "High",
    fakeFollowersPct: 55,
    suspiciousFollowersPct: 17,
    realFollowersPct: 28,
    engagementRate: "0.2%",
    avgLikes: "1.2K",
    avgComments: "48",
  },
};

function resolveProfile(url: string): FakeFollowersResult {
  const lower = url.toLowerCase();
  if (lower.includes("windah")) return MOCK_DB.windah;
  if (lower.includes("raditya")) return MOCK_DB.raditya;
  if (lower.includes("fake") || lower.includes("suspicious")) return MOCK_DB.suspicious;
  return MOCK_DB.default;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") ?? "";

  if (!url.trim()) {
    return NextResponse.json(
      { message: "Parameter `url` wajib diisi." },
      { status: 400 }
    );
  }

  
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

  const result = resolveProfile(url);
  return NextResponse.json(result, { status: 200 });
}
