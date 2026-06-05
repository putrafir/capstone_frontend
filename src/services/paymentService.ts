import axiosInstance from "@/lib/axios";
import API_CONFIG from "@/config/api";
import type { Campaign } from "@/types";

export async function fetchPayments(): Promise<Campaign[]> {
  const res = await axiosInstance.get<Campaign[]>(API_CONFIG.ENDPOINTS.PAYMENTS);
  return res.data;
}
