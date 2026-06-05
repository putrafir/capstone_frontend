

import type {
  ManagedCampaign,
  CreateManagedCampaignPayload,
} from "@/types/managedCampaign";

export interface ICampaignRepository {

  getAll(): Promise<ManagedCampaign[]>;


  getById(id: string): Promise<ManagedCampaign | null>;


  create(payload: CreateManagedCampaignPayload): Promise<ManagedCampaign>;


  update(
    id: string,
    patch: Partial<ManagedCampaign>
  ): Promise<ManagedCampaign | null>;


  delete(id: string): Promise<void>;
}