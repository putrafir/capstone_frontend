import axiosInstance from "@/lib/axios";
import API_CONFIG from "@/config/api";
import type { Invoice } from "@/types";

export async function fetchInvoice(id: string): Promise<Invoice> {
  const res = await axiosInstance.get<Invoice>(API_CONFIG.ENDPOINTS.INVOICE(id));
  return res.data;
}
