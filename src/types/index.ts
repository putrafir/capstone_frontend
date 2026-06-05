

export interface DashboardStats {
  totalCampaigns: string;
  totalReach: string;
  engagementRate: string;
  budgetUsed: string;
  roi: string;
}

export interface Creator {
  id: number;
  name: string;
  handle: string;
  location: string;
  category: string;
  followers: string;
  engagement: string;
  avgViews: string;
  avatar: string;
  platformIcons: string[];
  recentContent: ContentPost[];
  saved?: boolean;
}

export interface ContentPost {
  id: number;
  imageUrl: string;
  type: "video" | "image";
}

export interface Message {
  id: number;
  name: string;
  avatar: string;
  preview: string;
  creatorId: number; 
}

export interface SavedCreatorsResponse {
  id: number;
  name: string;
  handle: string;
  location: string;
  category: string;
  followers: string;
  avatar: string;
}

export interface ApiError {
  message: string;
}

// ── Payment Types ────────────────────────────────────────────

export type PaymentStatus = "pending" | "paid" | "overdue" | "cancelled";
export type PaymentMethod =
  | "hybrid"
  | "bank_transfer"
  | "e-wallet"
  | "credit_card"
  | "qris";

export interface PaymentInfluencer {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  method: string;
  amount: number;
  status: PaymentStatus;
}

export interface Campaign {
  id: number;
  title: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  totalInfluencers: number;
  paidInfluencers: number;
  influencers: PaymentInfluencer[];
}

export interface InvoiceBreakdownItem {
  label: string;
  amount: number;
  children?: { label: string; amount: number }[];
}

export interface Invoice {
  id: string;
  campaignId: number;
  campaignTitle: string;
  influencerId: number;
  influencerName: string;
  influencerHandle: string;
  influencerAvatar: string;
  paymentMethod: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  nextDueAmount: number;
  status: PaymentStatus;
  dueDate: string;
  breakdown: InvoiceBreakdownItem[];
  adminFee: number;
}

export interface PaymentMethodOption {
  id: string;
  label: string;
  icon: string;
  brands: string[];
  children?: PaymentMethodOption[];
}

// ── Budget Optimization Types ────────────────────────────────

export type InfluencerTier = "Mega" | "Mikro" | "Nano";

export interface CampaignFormData {
  namaCampaign: string;
  industryNiche: string;
  deskripsiProduk: string;
  usiaDari: number | "";
  usiaHingga: number | "";
  lokasiTarget: string;
  jenisKelamin: string;
  tujuanCampaign: string;
  totalAnggaran: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  platform: {
    instagram: boolean;
    tiktok: boolean;
  };
}

export interface CampaignFormErrors {
  namaCampaign?: string;
  industryNiche?: string;
  deskripsiProduk?: string;
  usiaDari?: string;
  usiaHingga?: string;
  usiaRange?: string;
  lokasiTarget?: string;
  jenisKelamin?: string;
  tujuanCampaign?: string;
  totalAnggaran?: string;
  tanggalMulai?: string;
  tanggalSelesai?: string;
  tanggalRange?: string;
  platform?: string;
}

export interface ContentCount {
  video: number;
  story: number;
}

export interface Strategy {
  id: string;
  name: string;
  tagline: string;
  daftarBelanja: {
    instagram: ContentCount;
    tiktok: ContentCount;
    boostCodeAds: number;
    owningContent: number | null;
    yellowCart: boolean;
  };
  yangDiDapat: {
    alokasi: string;
    feeInfluencer: number;
    boostCode: number;
    owningContent: number | null;
    yellowCart: number | null;
  };
  prediksiHasil: {
    reach: string;
    estSales: string;
    roiProyeksi: string;
  };
}

export interface Influencer {
  id: number;
  name: string;
  handle: string;
  location: string;
  category: string;
  tier: InfluencerTier;
  followers: string;
  followersRaw: number;
  engagement: string;
  avgViews: string;
  avatar: string;
  akurasi: number;
  verified: boolean;
}

export interface BriefingTemplate {
  id: string;
  namaBrand: string;
  namaTemplate: string;
  hashtags: string;
  tagAccount: string;
  linkYellowCart: string;
  draftSubmission: string;
  draftPost: string;
  dos: string;
  donts: string;
  platform: {
    instagram?: { video: number; story: number };
    tiktok?: { video: number; story: number };
  };
}

// Search types
export interface SearchMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CompareInfluencer {
  followers: string;
  engagement: string;
  avgViews: string;
  niche: string;
  audienceGender: string;
  location: string;
  authenticity: string;
  estPrice: string;
  roiScore: string;
}

// ── Fake Followers Detection ─────────────────────────────────
export type RiskLevel = "Low" | "Medium" | "High";

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
  authenticityScore: number; // 0–100
  riskLevel: RiskLevel;
  fakeFollowersPct: number;
  suspiciousFollowersPct: number;
  realFollowersPct: number;
  engagementRate: string;
  avgLikes: string;
  avgComments: string;
}
