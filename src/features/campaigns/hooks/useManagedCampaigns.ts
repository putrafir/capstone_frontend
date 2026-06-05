

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAllManagedCampaigns,
  deleteManagedCampaign,
  updateManagedCampaign,
} from "@/features/campaigns/services/managedCampaignService";
import type { ManagedCampaign } from "@/features/campaigns/types/managedCampaign";


export const MANAGED_CAMPAIGNS_UPDATED = "managed-campaigns-updated";


export function notifyManagedCampaignsUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(MANAGED_CAMPAIGNS_UPDATED));
  }
}

export function useManagedCampaigns() {
  const [campaigns, setCampaigns] = useState<ManagedCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllManagedCampaigns();
      setCampaigns(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat campaign");
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    reload();
  }, [reload]);

  
  useEffect(() => {
    window.addEventListener(MANAGED_CAMPAIGNS_UPDATED, reload);
    return () => window.removeEventListener(MANAGED_CAMPAIGNS_UPDATED, reload);
  }, [reload]);

  const remove = useCallback(async (id: string) => {
    await deleteManagedCampaign(id);
    notifyManagedCampaignsUpdated();
  }, []);

  const update = useCallback(
    async (id: string, patch: Partial<ManagedCampaign>) => {
      const updated = await updateManagedCampaign(id, patch);
      notifyManagedCampaignsUpdated();
      return updated;
    },
    []
  );

  return { campaigns, loading, error, reload, remove, update };
}