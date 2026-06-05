"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchInvoice } from "@/features/payment/services/invoiceService";
import type { Invoice } from "@/shared/types";

export function useInvoice(id: string) {
  const [data, setData] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchInvoice(id);
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal memuat invoice");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
