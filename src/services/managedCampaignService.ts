

import { LocalCampaignRepository } from "@/repositories/LocalCampaignRepository";
import type {
  ManagedCampaign,
  CreateManagedCampaignPayload,
} from "@/types/managedCampaign";
import type { CampaignFormData, Strategy, Influencer } from "@/types";

// Singleton repository — ganti ke ApiCampaignRepository saat backend siap
const repo = new LocalCampaignRepository();

// ── Public API ──────────────────────────────────────────────

export async function getAllManagedCampaigns(): Promise<ManagedCampaign[]> {
  return repo.getAll();
}

export async function getManagedCampaignById(
  id: string
): Promise<ManagedCampaign | null> {
  return repo.getById(id);
}

export async function createManagedCampaign(
  payload: CreateManagedCampaignPayload
): Promise<ManagedCampaign> {
  return repo.create(payload);
}

export async function updateManagedCampaign(
  id: string,
  patch: Partial<ManagedCampaign>
): Promise<ManagedCampaign | null> {
  return repo.update(id, patch);
}

export async function deleteManagedCampaign(id: string): Promise<void> {
  return repo.delete(id);
}


function generateDummyMetrics() {
  const base = Math.floor(Math.random() * 300) + 100;
  return {
    views: base + Math.floor(Math.random() * 200),
    likes: base + Math.floor(Math.random() * 100),
    shares: base + Math.floor(Math.random() * 50),
  };
}

export async function createCampaignFromBudgetForm(params: {
  form: CampaignFormData;
  selectedStrategy: Strategy | null;
  selectedInfluencers: Influencer[];
  briefingText: string;
}): Promise<ManagedCampaign> {
  const { form, selectedStrategy, selectedInfluencers, briefingText } = params;

  const budget = Number(form.totalAnggaran.replace(/[^0-9]/g, "")) || 0;

  const payload: CreateManagedCampaignPayload = {
    campaignName: form.namaCampaign,
    campaignType: selectedStrategy?.name ?? "Standard",
    objective: form.tujuanCampaign,
    budget,
    targetAudience: `${form.lokasiTarget} | ${form.jenisKelamin} | ${form.usiaDari}–${form.usiaHingga} tahun`,
    influencerCategory: form.industryNiche,
    influencers: selectedInfluencers.map((inf) => ({
      id: inf.id,
      avatar: inf.avatar,
    })),
    briefing: briefingText,
    status: "Pending",
    startDate: form.tanggalMulai
      ? new Date(form.tanggalMulai).toISOString()
      : new Date().toISOString(),
    endDate: form.tanggalSelesai
      ? new Date(form.tanggalSelesai).toISOString()
      : new Date().toISOString(),
    platforms: {
      instagram: form.platform.instagram,
      tiktok: form.platform.tiktok,
    },
    ...generateDummyMetrics(),
  };

  return repo.create(payload);
}