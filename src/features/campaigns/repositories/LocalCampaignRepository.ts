

import type { ICampaignRepository } from "@/features/campaigns/repositories/CampaignRepository";
import type {
  ManagedCampaign,
  CreateManagedCampaignPayload,
} from "@/features/campaigns/types/managedCampaign";

const STORAGE_KEY = "fluensy_managed_campaigns_v1";


function generateId(): string {
  return `campaign-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}


function readStorage(): ManagedCampaign[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}


function writeStorage(campaigns: ManagedCampaign[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
  } catch {
    // localStorage mungkin penuh atau diblokir — abaikan
  }
}

export class LocalCampaignRepository implements ICampaignRepository {
  async getAll(): Promise<ManagedCampaign[]> {
    return readStorage();
  }

  async getById(id: string): Promise<ManagedCampaign | null> {
    const all = readStorage();
    return all.find((c) => c.id === id) ?? null;
  }

  async create(payload: CreateManagedCampaignPayload): Promise<ManagedCampaign> {
    const all = readStorage();
    const newCampaign: ManagedCampaign = {
      ...payload,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    writeStorage([newCampaign, ...all]); // prepend agar muncul paling atas
    return newCampaign;
  }

  async update(
    id: string,
    patch: Partial<ManagedCampaign>
  ): Promise<ManagedCampaign | null> {
    const all = readStorage();
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    const updated = { ...all[idx], ...patch };
    all[idx] = updated;
    writeStorage(all);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const all = readStorage();
    writeStorage(all.filter((c) => c.id !== id));
  }
}