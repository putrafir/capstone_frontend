

export interface RateCardItem {
  platform: string;
  contentType: string;
  price: string;
  priceRaw: number;
}

export interface RateCardData {
  tier: string;
  tierColor: string;
  items: RateCardItem[];
  note: string;
}


export function getRateCardByFollowers(followersStr: string): RateCardData {
  // Parse followers string ke angka
  const raw = followersStr.toUpperCase().trim();
  let followers = 0;
  if (raw.endsWith("M")) {
    followers = parseFloat(raw) * 1_000_000;
  } else if (raw.endsWith("K")) {
    followers = parseFloat(raw) * 1_000;
  } else {
    followers = parseInt(raw.replace(/\D/g, ""), 10) || 0;
  }

  
  if (followers >= 1_000_000) {
    return {
      tier: "Mega",
      tierColor: "bg-purple-100 text-purple-700",
      items: [
        { platform: "Instagram", contentType: "Feed Post", price: "Rp 15jt–30jt", priceRaw: 15_000_000 },
        { platform: "Instagram", contentType: "Reels (60s)", price: "Rp 25jt–50jt", priceRaw: 25_000_000 },
        { platform: "Instagram", contentType: "Story (3 frame)", price: "Rp 8jt–15jt", priceRaw: 8_000_000 },
        { platform: "TikTok", contentType: "Video (60s)", price: "Rp 20jt–45jt", priceRaw: 20_000_000 },
        { platform: "YouTube", contentType: "Dedicated Video", price: "Rp 50jt–120jt", priceRaw: 50_000_000 },
      ],
      note: "* Harga estimasi. Negosiasi langsung dengan kreator untuk paket bundling.",
    };
  }

  
  if (followers >= 100_000) {
    return {
      tier: "Makro",
      tierColor: "bg-blue-100 text-blue-700",
      items: [
        { platform: "Instagram", contentType: "Feed Post", price: "Rp 3jt–10jt", priceRaw: 3_000_000 },
        { platform: "Instagram", contentType: "Reels (60s)", price: "Rp 5jt–15jt", priceRaw: 5_000_000 },
        { platform: "Instagram", contentType: "Story (3 frame)", price: "Rp 1.5jt–4jt", priceRaw: 1_500_000 },
        { platform: "TikTok", contentType: "Video (60s)", price: "Rp 4jt–12jt", priceRaw: 4_000_000 },
        { platform: "YouTube", contentType: "Dedicated Video", price: "Rp 10jt–35jt", priceRaw: 10_000_000 },
      ],
      note: "* Harga estimasi. Negosiasi langsung dengan kreator untuk paket bundling.",
    };
  }

  
  if (followers >= 10_000) {
    return {
      tier: "Mikro",
      tierColor: "bg-green-100 text-green-700",
      items: [
        { platform: "Instagram", contentType: "Feed Post", price: "Rp 500rb–2jt", priceRaw: 500_000 },
        { platform: "Instagram", contentType: "Reels (60s)", price: "Rp 800rb–3jt", priceRaw: 800_000 },
        { platform: "Instagram", contentType: "Story (3 frame)", price: "Rp 300rb–800rb", priceRaw: 300_000 },
        { platform: "TikTok", contentType: "Video (60s)", price: "Rp 600rb–2.5jt", priceRaw: 600_000 },
        { platform: "YouTube", contentType: "Dedicated Video", price: "Rp 1.5jt–5jt", priceRaw: 1_500_000 },
      ],
      note: "* Harga estimasi. Negosiasi langsung dengan kreator untuk paket bundling.",
    };
  }

  
  return {
    tier: "Nano",
    tierColor: "bg-yellow-100 text-yellow-700",
    items: [
      { platform: "Instagram", contentType: "Feed Post", price: "Rp 100rb–500rb", priceRaw: 100_000 },
      { platform: "Instagram", contentType: "Reels (60s)", price: "Rp 150rb–600rb", priceRaw: 150_000 },
      { platform: "Instagram", contentType: "Story (3 frame)", price: "Rp 75rb–200rb", priceRaw: 75_000 },
      { platform: "TikTok", contentType: "Video (60s)", price: "Rp 100rb–400rb", priceRaw: 100_000 },
    ],
    note: "* Harga estimasi. Negosiasi langsung dengan kreator untuk paket bundling.",
  };
}