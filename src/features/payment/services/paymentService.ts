import axiosInstance from "@/shared/lib/axios";
import API_CONFIG from "@/shared/config/api";
import type { Campaign } from "@/shared/types";

export async function fetchPayments(): Promise<Campaign[]> {
  const res = await axiosInstance.get<Campaign[]>(API_CONFIG.ENDPOINTS.PAYMENTS);
  return res.data;
}
