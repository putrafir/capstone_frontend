

import axiosInstance from "@/shared/lib/axios";
import API_CONFIG from "@/shared/config/api";
import type { Creator } from "@/shared/types";

export interface SearchParams {
  q?: string;
  platform?: "instagram" | "tiktok";
  followers?: "nano" | "micro" | "macro" | "mega" | "";
  engagement?: "low" | "medium" | "high" | "";
  niche?: string;
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  data: Creator[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}


export async function fetchCreators(
  params: SearchParams = {}
): Promise<SearchResponse> {
  const res = await axiosInstance.get<SearchResponse>(
    API_CONFIG.ENDPOINTS.SEARCH_CREATORS,
    { params }
  );
  return res.data;
}
