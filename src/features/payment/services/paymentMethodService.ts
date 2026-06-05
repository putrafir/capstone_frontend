import axiosInstance from "@/shared/lib/axios";
import API_CONFIG from "@/shared/config/api";
import type { PaymentMethodOption } from "@/shared/types";

export async function fetchPaymentMethods(): Promise<PaymentMethodOption[]> {
  const res = await axiosInstance.get<PaymentMethodOption[]>(
    API_CONFIG.ENDPOINTS.PAYMENT_METHODS
  );
  return res.data;
}

