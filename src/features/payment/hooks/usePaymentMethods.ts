"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchPaymentMethods } from "@/features/payment/services/paymentMethodService";
import type { PaymentMethodOption } from "@/shared/types";

export function usePaymentMethods() {
  const [data, setData] = useState<PaymentMethodOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPaymentMethods();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal memuat metode pembayaran");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
