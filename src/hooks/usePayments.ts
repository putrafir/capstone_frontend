"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchPayments } from "@/services/paymentService";
import type { Campaign } from "@/types";

export function usePayments() {
  const [data, setData] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPayments();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal memuat data pembayaran");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
