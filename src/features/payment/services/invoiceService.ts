import axiosInstance from "@/shared/lib/axios";
import API_CONFIG from "@/shared/config/api";
import type { Invoice } from "@/shared/types";

export async function fetchInvoice(id: string): Promise<Invoice> {
  const res = await axiosInstance.get<Invoice>(API_CONFIG.ENDPOINTS.INVOICE(id));
  return res.data;
}
