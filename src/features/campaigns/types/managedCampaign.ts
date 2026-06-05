

import type { CampaignStatus } from "@/features/campaigns/types/campaign";

export interface ManagedCampaignInfluencer {
  id: number;
  avatar: string;
}


export interface ManagedCampaign {
  id: string;
  campaignName: string;
  campaignType: string;
  objective: string;
  budget: number;
  targetAudience: string;
  influencerCategory: string;
  influencers: ManagedCampaignInfluencer[];
  briefing: string;
  status: CampaignStatus;
  createdAt: string; 
  startDate: string;  — dipakai untuk tampil di list
  endDate: string;   


  views: number;
  likes: number;
  shares: number;

  // Platform yang digunakan
  platforms: {
    instagram: boolean;
    tiktok: boolean;
  };
}


export type CreateManagedCampaignPayload = Omit<
  ManagedCampaign,
  "id" | "createdAt"
>;