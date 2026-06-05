

import axiosInstance from "@/lib/axios";
import API_CONFIG from "@/config/api";
import type { Campaign, CampaignDetail, ChatMessage } from "@/types/campaign";

export async function fetchCampaigns(): Promise<Campaign[]> {
  const res = await axiosInstance.get<Campaign[]>(API_CONFIG.ENDPOINTS.CAMPAIGNS);
  return res.data;
}

export async function fetchCampaignDetail(id: string): Promise<CampaignDetail> {
  const res = await axiosInstance.get<CampaignDetail>(
    API_CONFIG.ENDPOINTS.CAMPAIGN_DETAIL(id)
  );
  return res.data;
}

export async function fetchCampaignMessages(creatorId: number): Promise<ChatMessage[]> {
  const res = await axiosInstance.get<ChatMessage[]>(
    API_CONFIG.ENDPOINTS.CAMPAIGN_MESSAGES(creatorId)
  );
  return res.data;
}

export async function sendCampaignMessage(
  creatorId: number,
  text: string
): Promise<ChatMessage> {
  const res = await axiosInstance.post<ChatMessage>(
    API_CONFIG.ENDPOINTS.CAMPAIGN_SEND_MESSAGE(creatorId),
    { text }
  );
  return res.data;
}
