

import axiosInstance from "@/lib/axios";
import API_CONFIG from "@/config/api";
import type { Strategy, Influencer, BriefingTemplate } from "@/types";

export async function fetchStrategies(): Promise<Strategy[]> {
  const res = await axiosInstance.get<Strategy[]>(API_CONFIG.ENDPOINTS.STRATEGIES);
  return res.data;
}

export async function fetchInfluencers(): Promise<Influencer[]> {
  const res = await axiosInstance.get<Influencer[]>(API_CONFIG.ENDPOINTS.INFLUENCERS);
  return res.data;
}

export async function fetchBriefingTemplates(): Promise<BriefingTemplate[]> {
  const res = await axiosInstance.get<BriefingTemplate[]>(
    API_CONFIG.ENDPOINTS.BRIEFING_TEMPLATES
  );
  return res.data;
}

export async function createBriefingTemplate(
  data: Omit<BriefingTemplate, "id">
): Promise<BriefingTemplate> {
  const res = await axiosInstance.post<BriefingTemplate>(
    API_CONFIG.ENDPOINTS.BRIEFING_TEMPLATES,
    data
  );
  return res.data;
}
