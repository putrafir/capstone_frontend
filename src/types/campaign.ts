// ============================================================
// FILE: src/types/campaign.ts
// ============================================================

export type CampaignStatus = "Pending" | "Berjalan" | "Selesai";
export type CreatorStatus  = "Negosiasi" | "Butuh direview" | "Posting" | "Selesai";
export type ContentStatus  = "Revisi" | "Perlu direview" | "Disetujui";
export type Platform       = "ig" | "tt" | "yt";

// ── Campaign List ──────────────────────────────────────────
export interface CampaignCreatorSnippet {
  id: number;
  avatar: string;
}
export interface Campaign {
  id: string;
  title: string;
  status: CampaignStatus;
  startDate: string;
  creators: CampaignCreatorSnippet[];
  views: number;
  likes: number;
  shares: number;
}

// ── Campaign Detail – Creators tab ────────────────────────
export interface CampaignCreator {
  id: number;
  name: string;
  handle: string;
  platform: Platform;
  location: string;
  followers: string;
  status: CreatorStatus;
  hasUnread: boolean;
  avatar: string;
}

// ── Campaign Detail – Content Review tab ──────────────────
export interface ContentItem {
  id: number;
  creatorId: number;
  thumbnailUrl: string;
  status: ContentStatus;
  date: string;
  caption: string;
}
export interface ContentGroupCreator {
  id: number;
  name: string;
  handle: string;
  location: string;
  category: string;
  followers: string;
  engagement: string;
  avgViews: string;
  avatar: string;
  verified: boolean;
}
export interface ContentGroup {
  creator: ContentGroupCreator;
  items: ContentItem[];
}

// ── Campaign Detail – Tracking tab ────────────────────────
export interface TrackingStats {
  creatorsPosted: number;
  creatorsTotal: number;
  contentToday: number;
  totalContent: number;
  eventModeContent: string;
  totalEngagement: string;
  avgER: string;
  estImpressions: string;
  estReach: string;
  totalLikes: string;
  totalComments: string;
  views: string;
}
export interface PostedContent {
  id: number;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  verified: boolean;
  thumbnailUrl: string;
  timeAgo: string;
  views: string;
  likes: string;
  comments: string;
}
export interface CampaignTracking {
  stats: TrackingStats;
  postedContent: PostedContent[];
}

// ── Full Campaign Detail ───────────────────────────────────
export interface CampaignDetail {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  creators: CampaignCreator[];
  contentGroups: ContentGroup[];
  tracking: CampaignTracking;
}

// ── Chat Message ───────────────────────────────────────────
export interface ChatMessage {
  id: number;
  role: "brand" | "creator";
  text: string;
  time: string;
  date: string;
}
