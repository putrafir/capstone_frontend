import axiosInstance from "@/lib/axios";
import API_CONFIG from "@/config/api";
import type { PaymentMethodOption } from "@/types";

export async function fetchPaymentMethods(): Promise<PaymentMethodOption[]> {
  const res = await axiosInstance.get<PaymentMethodOption[]>(
    API_CONFIG.ENDPOINTS.PAYMENT_METHODS
  );
  return res.data;
}

